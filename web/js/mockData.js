/**
 * this object will be used as the mock data source
 * I will use mock data instead of real REST call
 */
var MockData = {
    getMockFilter:function(){
        return {
            filterMeta: [
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
            ]
        };
    },
    getMockOrders:function(query){
        var pagesize = query&&query.batchSize?query.batchSize:30;
        var result=[];
        for(var i=0;i<pagesize;i++){
            result.push({
                name:'Sample order '+ i
            });
        }
        return result;
    }
};