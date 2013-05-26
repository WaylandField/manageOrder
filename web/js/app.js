function AppStart(){
    app = app||{};
    // create View and Model for Filter
    var filterModel = new app.FilterModel();
    var filterView = new app.FilterView(
        {model: filterModel}
    );
    // create View and Collection for order list
    var orderList = new app.OrderCollection();
    var orderListView = new app.OrderListView({
        collection:orderList
    });
    // create batch model for send creating batch request to backend
    var batchModel= new app.BatchModel();

    //component interaction defined here to 
    //decouple the dependancy between different component
    filterView.on("filterOrder", function(query){
        if(query){
            orderList.fetch(query);
        }else{
            orderList.fetch();
        }
    });
    filterView.on("createBatch", function(batch){
        batchModel.save(batch);
    });
    // create UI structure to 
    $('#mainArea').append(filterView.$el);
    $('#mainArea').append(orderListView.$el);

    //Fetch data by rest call, the update UI on Model changed
    filterModel.fetch();
}

$(function(){
    AppStart();
});