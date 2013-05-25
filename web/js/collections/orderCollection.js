var app = app || {};

app.OrderCollection = Backbone.QueryCollection.extend({
	model: app.OrderModel,
	url: '/api/orders'
});