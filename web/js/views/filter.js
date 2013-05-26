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
        //when input invalid filter value
        this.model.on('invalidValue', function(event){
            this.showError(event);
        });
    },

    /**
     * mapping user interaction to handler
     */
    events: {
        'click #filterOrderBtn': function() {
            this.trigger('filterOrder', this.model.getBasicFilter());
        },
        // any change on the input elements will be updated to model 
        'change input': function(event) {
            var obj = event.target;
            //@todo handle different input type here
            this.model.updateField(obj.name, obj.value);
        },
        // trigger a query when check/uncheck GiftWrap or hazmat
        'change .filterAdvItem': function() {
            this.trigger('filterOrder', this.model.getAdvFilter());
        },
        // trigger a query when change ASIN
        'change .filterAsinItem': function() {
            this.trigger('filterOrder', this.model.getAsinFilter());
        },
        // click the create a batch btn
        'click #filterBatchBtn': function() {
            var query = this.model.getAdvFilter();
            this.trigger('createBatch', query);
        },
        // click the create a batch btn
        'click #asinBatchBtn':   function() {
            var query = this.model.getAsinFilter();
            this.trigger('createBatch', query);
        }
    },
    /**
     * this method will update it's UI on the page.
     */
    render: function() {
        // this array will be used through this method to store all html code
        // for performance consideration 
        var h=[];
        var json = this.model.toJSON();
        h.push('<div class="row"><div class="span6 baseFilterArea">');
        h.push('<div class="arrow"></div>');
        this._appendFilterHtml(h, json);
        h.push('</div><div class="span5 form-horizontal batchArea">');
        this._appendFilterBatchHtml(h, json);
        this._appendAsinBatchHtml(h, json);
        h.push('</div></div>');
        this.$el.html(h.join(""));
        $(".datepicker" ).datepicker();
        return this;
    },
    /**
     * private method to create filter on the left size
     */
    _appendFilterHtml: function(h, json){
        h.push('<div>',
               '<h4>',messages.filterOrder,'</h4>',
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
            h.push('<input type="date" class="datepicker"  name="',input.id,'" id="',input.id,'" value="',value,'">');
            break;
            case 'time':
            h.push('<input type="time" id="',input.id,'" name="',input.id,'" value="',value,'">');
            h.push('<span class="help-inline">',messages.timeHelpTxt,'</span>');
            break;
            case 'boolean':
            h.push('<input type="checkbox" name="',input.id,'" id="',input.id,'" ',input.value?"checked":"",'>');
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
        h.push('<div class="form-inline">',
               '<h4>',messages.batchOnFilter,'</h4>',
               '<p>',messages.batchOnFilterDesc,'</p>',
               '<p><div><label class="checkbox inline"><input type="checkbox" name="giftWrap" id="giftWrap" ',json.hazmat?"check":"",' class="filterAdvItem">',
               messages.giftWrap,'</label></div>',
               '<div><label class="checkbox inline"><input type="checkbox" id="hazmat" name="hazmat" ',json.hazmat?"check":"",' class="filterAdvItem">',
               messages.hazmat,'</label></div></p>',
               '<p><div><label>',messages.batchSize,
               ' <input type="text" class="input-mini filterAdvItem" id="batchSize" name="batchSize" value="',
               json.batchSize,'"></label>',' <button id="filterBatchBtn" class="btn" type="button"><b>',messages.createBatch,'</b></button>','</div></p>',
               '</div>');
    },
    /**
     * private method
     * create html code for the "Create a batch on ASIN" UI
     */
    _appendAsinBatchHtml: function(h, json){
        h.push('<div class="batchOnAsin form-inline">',
               '<h4>',messages.batchOnAsin,'</h4>',
               '<p><div><label>',messages.asin,
               ' <input type="text" id="asin" name="asin" value="',
               json.asin,'" class="filterAsinItem"></label>',' <a href="">',messages.useTopAsin,'</a>','</div></p>',
               '<p><div><label>',messages.batchSize,
               ' <input type="text" class="input-mini filterAsinItem" id="batchSizeAsin" name="batchSizeAsin" value="',
               json.asinBatchSize,'"></label>',' <button id="asinBatchBtn" class="btn" type="button"><b>',messages.createBatch,'</b></button>','</div></p>',
               '</div>');
    },
    showError: function(event){
        //todo, handle error here
    }
});