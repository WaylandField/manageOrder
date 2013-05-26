/**
 * this Class is used to represent the data of the Filter Object
 * and the event dispatched on value change
 */
var app = app || {};

app.FilterModel = Backbone.Model.extend({
	defaults: {
		batchSize:30,
        giftWrap:false,
        hazmat:false,
        asinBatchSize:30,
        asin:""
	},
    /**
     * this attribute defines the REST url for this model.
     * but I will no
     */
    url: '/api/v1/orderFilter',
    /**
     * this method is to override the ajax call to fetch REST resource
     * instead of make real ajax call, it will use mock data
     */
    fetch: function(){
        this.set(MockData.getMockFilter());
    }
});