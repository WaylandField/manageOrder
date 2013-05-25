/**
 * this Class is used to represent the data of the Filter Object
 * and the event dispatched on value change
 */
var app = app || {};

app.FilterBatch = Backbone.Model.extend({
	defaults: {
		batchSize:30
	},
	idAttribute: '_id'
});