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
     * get the basic filter object 
     */
    getBasicFilter: function(){
        var result = {};
        var filterMeta = this.get('filterMeta');
        for(var i=0;i<filterMeta.length;i++){
            var _item = filterMeta[i];
            var _value = this.get(_item.id);
            if(_value!==null){
                result[_item.id] = _value;
            }
        }
        return result;
    },
    /**
     * get the further refined filter object
     */
    getAdvFilter: function(){
        var result = this.getBasicFilter();
        this.get('giftWrap')&&(result["giftwrap"]=this.get('giftWrap'));
        this.get('hazmat')&&(result["hazmat"]=this.get('hazmat'));
        this.get('batchSize')&&(result['batchSize']=this.get('batchSize'));
        return result;
    },
    /**
     * get ASIN filter
     */
    getAsinFilter: function(){
        var result = {};
        this.get('asin') && (result["asin"]=this.get('asin'));
        this.get('batchSizeAsin')&& (result['batchSize']=this.get('batchSizeAsin'));
        return result;
    },
    /**
     * update Model field
     */
    updateField : function(id, value){
        if(id!==null&&value!==null){
            if(this.validate()){
                this.set(id, value, {silent:true});
            }
        }
    },
    /**
     * validate input value based on meta type
     */
    validate: function(fieldId, value){
        var valid = true;
        //todo get meta item by fieldId
        //todo validate value

        //dispatch event if input value is invalid
        //this event will be handle in the FilterView.
        valid||this.trigger("invalidValue", {id:fieldId});
        return true;
    },
    /**
     * this method is to override the ajax call to fetch REST resource
     * instead of make real ajax call, it will use mock data
     */
    fetch: function(){
        this.set(MockData.getMockFilter());
    }
});