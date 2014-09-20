'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var stocks = require('../../app/controllers/stocks');

	// Stocks Routes
	app.route('/stocks')
		.get(stocks.list)
		.post(users.requiresLogin, stocks.create);

	app.route('/stocks/:stockId')
		.get(stocks.read)
		.put(users.requiresLogin, stocks.hasAuthorization, stocks.update)
		.delete(users.requiresLogin, stocks.hasAuthorization, stocks.delete);

	// Finish by binding the Stock middleware
	app.param('stockId', stocks.stockByID);
};