var app = app||{};

app.OrderListView = Backbone.View.extend({

    tagName:  'div',
    className: 'row',

    initialize: function(){
        this.collection.on('reset', this.render, this);
    },

    render : function(){
        var h= [];
        h.push('<div class="span11 orderListArea">');
        var orders= this.collection.toJSON();
        for(var i=0;orders&&i<orders.length;i++){
            h.push('<div>',orders[i].name,'</div>');
        }
        h.push('</div>');
        this.$el.html(h.join(""));
        return this;
    }
});