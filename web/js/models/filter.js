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
    getFilterMeta: function(){
        return [
            {id:'orderStatus',msg:'orderStatus',type:'single', options:[
                {k:'0',v:'New'},{k:'1', v:'Accepted'}
                ,{k:'2', v:'Packed'},{k:'3', v:'Cancelled'}]},
            {id:'expectedDate', msg:'expectedDate', type:'date'},
            {id:'expectedTime', msg:'expectedTime', type:'time'},
            {id:'multiSingle',msg:'multiSingle',type:'single', options:[
                {k:'0',v:'Multi'},{k:'1', v:'Single'}
                ,{k:'2', v:'Both'}]},
            {id:'SIOC',msg:'sioc',type:'single', options:[
                {k:'0',v:'SIOC'},{k:'1', v:'Non-SIOC'}
                ,{k:'2', v:'Both'}]},
            {id:'fastTrack',msg:'fastTrack',type:'boolean'}
        ];
    },
    getBatchOnFilterMeta: function(){},
    getBatchOnAsinMeta: function(){}
});