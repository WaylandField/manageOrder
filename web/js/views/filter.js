/**
 * this class is the View class for filter UI
 * Model change events will be handle here
 * User interaction will be handle here first before making any REST call in Model
 */

var app = app||{};

app.FilterView = Backbone.View.extend({
    /**
     * outer container type
     */
    tagName:  'div',

    /**
     * register model change event
     */
    initialize: function() {
        //when model changed, e.g. first time loaded
        //will call render method to update UI
        this.model.on('change', this.render, this);
    },

    /**
     * mapping user interaction to handler
     */
    events: {
        'click #filterOrderBtn': '_filterOrder',
        'click #filterBatchBtn': '_createBatchOnFilter',
        'click #asinBatchBtn':   '_createBatchOnAsin',
        'change .filterAdvItem': '_filterOrderAdv',
        'change .filterAsinItem': '_filterOrderAsin'
    },
    _filterOrder: function() {
        this.trigger('filterOrder');
    },
    
    _filterOrderAdv: function() {
        this.trigger('filterOrder',{query:1});
    },
    
    _filterOrderAsin: function() {
        this.trigger('filterOrder',{query:{
            batchSize:this.model.get("asinBatchSize"),
            asin:this.model.get("asin")
        }});
    },
    
    _createBatchOnFilter: function() {
        this.trigger('filterOrder',{});
    },

    _createBatchOnAsin: function( e ) {
        this.trigger('filterOrder',{});
    },

    /**
     * this method will update it's UI on the page.
     */
    render: function() {
        // this array will be used through this method to store all html code
        // for performance consideration 
        var h=[];
        var json = this.model.toJSON();
        h.push('<div class="row"><div class="span6">');
        this._appendFilterHtml(h, json);
        h.push('</div><div class="span6 form-horizontal">');
        this._appendFilterBatchHtml(h, json);
        this._appendAsinBatchHtml(h, json);
        h.push('</div></div>');
        this.$el.html(h.join(""));
//        this.$el.html( this.todoTpl( this.model.toJSON() ) );
        this.input = this.$('.edit');
        return this;
    },
    /**
     * private method to create filter on the left size
     */
    _appendFilterHtml: function(h, json){
        h.push('<div class="filter">',
               '<h3>',messages.filterOrder,'</h3>',
               '<div class="form-horizontal">');
        var filterMeta = json.filterMeta;
        for(var i=0;filterMeta&&i<filterMeta.length;i++){
            var _item = filterMeta[i];
            this._createInputHtml(h, _item, json[_item.id]);
        }
        h.push('<div class="controls"> <button class="btn btn-success" id="filterOrderBtn" type="button"><b>',
               messages.filterOrder,'</b></button></div>');
        h.push('</div></div>');
    },
    /**
     * private method to create input html for different input type
     */
    _createInputHtml: function(h, input, value){
        h.push('<div class="control-group">',
               '<label class="control-label" for="',input.id,'">',messages[input.msg],'</label>',
               '<div class="controls">');
        switch(input.type){
            case 'single':
            for(var i=0;input.options&&i<input.options.length;i++){
                var _option = input.options[i];
                h.push('<label class="radio inline"><input type="radio" name="',input.id,
                       '" value="',_option.k,value===_option.k?"checked":"",'">',
                       _option.v, '</label>');
            }
            break;
            case 'date':
            h.push('<input type="date" id="',input.id,'" value="',value,'">');
            break;
            case 'time':
            h.push('<input type="time" id="',input.id,'" value="',value,'">');
            h.push('<span class="help-inline">',messages.timeHelpTxt,'</span>');
            break;
            case 'boolean':
            h.push('<input type="checkbox" id="',input.id,'" ',input.value?"checked":"",'>');
            break;
        }
        h.push('</div>',
               '</div>');
        
    },
    /**
     * private method
     * create html code for the "Create a batch on filter" UI
     */
    _appendFilterBatchHtml: function(h, json){
        h.push('<div class="filterBatch form-inline">',
               '<h3>',messages.batchOnFilter,'</h3>',
               '<p>',messages.batchOnFilterDesc,'</p>',
               '<p><div><label class="checkbox inline"><input type="checkbox" id="giftWrap" ',json.hazmat?"check":"",' class="filterAdvItem">',
               messages.giftWrap,'</label></div>',
               '<div><label class="checkbox inline"><input type="checkbox" id="hazmat" ',json.hazmat?"check":"",' class="filterAdvItem">',
               messages.hazmat,'</label></div></p>',
               '<p><div><label>',messages.batchSize,
               ' <input type="text" class="input-mini filterAdvItem" id="batchSize" value="',
               json.batchSize,'"></label>',' <button id="filterBatchBtn" class="btn" type="button"><b>',messages.createBatch,'</b></button>','</div></p>',
               '</div>');
    },
    /**
     * private method
     * create html code for the "Create a batch on ASIN" UI
     */
    _appendAsinBatchHtml: function(h, json){
        h.push('<div class="filterBatch form-inline">',
               '<h3>',messages.batchOnAsin,'</h3>',
               '<p><div><label>',messages.asin,
               ' <input type="text" id="asin" value="',
               json.asin,'" class="filterAsinItem"></label>',' <a href="">',messages.useTopAsin,'</a>','</div></p>',
               '<p><div><label>',messages.batchSize,
               ' <input type="text" class="input-mini filterAsinItem" id="batchSizeAsin" value="',
               json.asinBatchSize,'"></label>',' <button id="asinBatchBtn" class="btn" type="button"><b>',messages.createBatch,'</b></button>','</div></p>',
               '</div>');
    }
});