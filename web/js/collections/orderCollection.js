var app = app || {};

app.OrderCollection = Backbone.QueryCollection.extend({
	model: app.OrderModel,

    url:'/api/v1/orders',

    /**
     * this method was overided in order to use the mock service
     */
    fetch: function(query){
        this.reset(MockData.getMockOrders(query));
    }
});