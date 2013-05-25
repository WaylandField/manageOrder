$(function(){
    app = app||{};
    //
    var filterModel = new app.FilterModel();
    var filterView = new app.FilterView(
        {model: filterModel}
    );
    var orderList = new app.OrderCollection();
    var orderListView = new app.OrderListView({
        collection:orderList
    });
    //do query when click the filterOrder btn
    filterView.on("filter filterAdv filterAsin", function(){
        orderList.query(filterModel.getQuery());
    });
    filterView.on("filter filterAdv filterAsin", function(){
        orderList.query(filterModel.getQuery());
    });

    //render filter and order list UIs
    $('#mainArea').append(filterView.render().$el);
    $('#mainArea').append(orderListView.render().el);
});