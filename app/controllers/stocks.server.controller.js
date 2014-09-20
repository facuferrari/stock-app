'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Stock = mongoose.model('Stock'),
	StockItem = mongoose.model('StockItem'),
	_ = require('lodash');

/**
 * Create a Stock
 */
exports.create = function(req, res) {
	var stock = new Stock(req.body);

	stock.user = req.user;

	stock.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stock);
		}
	});
};

/**
 * Show the current Stock
 */
exports.read = function(req, res) {
	res.jsonp(req.stock);
};

/**
 * Update a Stock
 */
exports.update = function(req, res) {
	var stock = req.stock ;

	stock = _.extend(stock , req.body);

	stock.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stock);
		}
	});
};

/**
 * Delete an Stock
 */
exports.delete = function(req, res) {
	var stock = req.stock ;

	stock.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stock);
		}
	});
};

/**
 * List of Stocks
 */
exports.list = function(req, res) { Stock.find().sort('-created').populate('user', 'displayName').exec(function(err, stocks) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stocks);
		}
	});
};

/**
 * Stock middleware
 */
exports.stockByID = function(req, res, next, id) { Stock.findById(id).populate('user', 'displayName').exec(function(err, stock) {
		if (err) return next(err);
		if (! stock) return next(new Error('Failed to load Stock ' + id));
		req.stock = stock ;
		next();
	});
};

/**
 * Stock authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.stock.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};