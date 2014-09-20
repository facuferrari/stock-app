'use strict';

/**
 * Module dependencies.
 */

/**
 * StockItem Schema
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var StockItemSchema = new Schema({
	brand: {
		type: String
	},
	beerStyle: {
		type: String
	},
	amount: {
		type: Number
	},
	created: {
		type: Date,
		default: Date.now
	},
});

mongoose.model('StockItem', StockItemSchema);

/**
 * Stock Schema
 */
var StockSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Stock name',
		trim: true
	},
	details: {
		type: String,
		default: '',
		required: 'Please fill Stock details'
	},
	stockDate: Date,
	stockItems: [StockItemSchema],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Stock', StockSchema);