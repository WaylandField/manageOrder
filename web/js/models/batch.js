/**
 * this Class is used to represent the data of the Filter Object
 * and the event dispatched on value change
 */
var app = app || {};

app.BatchModel = Backbone.Model.extend({
	defaults: {
		name:"default"
	},
    url:'/api/v1/batch',
    // this method overide the save method 
    //in order to used mock service 
    save: function(query){
        alert("Going to save it");
    }
});