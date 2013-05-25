var app = app||{};

app.FilterView = Backbone.View.extend({

    tagName:  'div',

    // Cache the template function for a single item.
    todoTpl: _.template( "An example template" ),

    events: {
        'filter': 'edit',
        '.edit': 'updateOnEnter',
        'blur .edit':   'close'
    },

    // Rerender the titles of the todo item.
    render: function() {
        var h=[];
        var json = this.model.toJSON();
        this._appendFilterHtml(h, json);
        this._appendFilterBatchHtml(h, json);
        this._appendAsinBatchHtml(h, json);
        this.$el.html(h.join(""));
//        this.$el.html( this.todoTpl( this.model.toJSON() ) );
        this.input = this.$('.edit');
        return this;
    },
    _appendFilterHtml: function(h, json){
        h.push('<div class="filter">',
               '<h3>',messages.filterOrder,'</h3>',
               '<div class="form-horizontal">');
        var filterMeta = this.model.getFilterMeta();
        for(var i=0;filterMeta&&i<filterMeta.length;i++){
            var _item = filterMeta[i];
            this._createInputHtml(h, _item, this.model.get(_item.id));
        }
        h.push('</div></div>');
    },

    _createInputHtml: function(h, input, value){
        h.push('<div class="control-group">',
               '<label class="control-label" for="',input.id,'">',messages[input.msg],'</label>',
               '<div class="controls">');
        switch(input.type){
            case 'single':
            for(var i=0;input.options&&i<input.options.length;i++){
                var _option = input.options[i];
                h.push('<input type="radio" name="',input.id,
                       '" value="',_option.k,value===_option.k?"checked":"",'">',
                       ' ',_option.v, ' ');
            }
            break;
            case 'date':
            h.push('<input type="text" id="',input.id,'" value="',value,'">');
            break;
            case 'time':
            h.push('<input type="text" id="',input.id,'" value="',value,'">');
            break;
            case 'boolean':
            h.push('<input type="checkbox" id="',input.id,'" ',input.value?"checked":"",'>');
            break;
        }
        h.push('</div>',
               '</div>');
        
    },

    _appendFilterBatchHtml: function(h, json){
        h.push('<div class="filterBatch">',
               '<h3>',messages.batchOnFilter,'</h3>',
               '<p>',messages.batchOnFilterDesc,'</p>',
               '<div><input type="checkbox" id="giftWrap" ',json.hazmat?"check":"",'>',
               '<label for="giftWrap">',messages.giftWrap,'</label></div>',
               '<div><input type="checkbox" id="hazmat" ',json.hazmat?"check":"",'>',
               '<label for="giftWrap">',messages.hazmat,'</label></div>',
               '<div><label for="batchSize">',messages.batchSize,'</label>',
               '<input type="input" id="batchSize" value="',json.batchSize,'"></div>',
               '</div>');
    },

    _appendAsinBatchHtml: function(h, json){
        h.push('<div class="filterBatch">',
               '<h3>',messages.batchOnAsin,'</h3>',
               '<p>',messages.batchOnAsinDesc,'</p>',
               '<div><label for="asin">',messages.asin,'</label>',
               '<input type="input" id="asin" value="',json.asin,'"></div>',
               '<div><label for="batchSizeAsin">',messages.batchSize,'</label>',
               '<input type="input" id="batchSizeAsin" value="',json.batchSizeAsin,'"></div>',
               '</div>');
    },

    edit: function() {
        // executed when todo label is double-clicked
    },

    close: function() {
        // executed when todo loses focus
    },

    updateOnEnter: function( e ) {
        // executed on each keypress when in todo edit mode,
        // but we'll wait for enter to get in action
    }
});