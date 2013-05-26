var app = app||{};

app.OrderListView = Backbone.View.extend({

    tagName:  'div',

    initialize: function(){
        this.collection.on('reset', this.render, this);
    },

    render : function(){
        var h= [];
        var orders= this.collection.toJSON();
        for(var i=0;orders&&i<orders.length;i++){
            h.push('<div>',orders[i].name,'</div>');
        }
        this.$el.html(h.join(""));
        return this;
    }
});