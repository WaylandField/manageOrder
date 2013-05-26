/**
 * this Class is used to represent the data of the Order object
 * and the event dispatched on value change 
 */

var app = app || {};

app.OrderModel = Backbone.Model.extend({
	defaults: {
		inBatch:false
	},
	idAttribute: '_id'
});