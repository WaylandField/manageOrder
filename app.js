var express = require('express');
var app = express();

/** config **/
app.use('/web', express.static(__dirname+'/web'));

app.use(express.logger());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.logger({ format: ':method :url' }));

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(err.stack);
  res.send(500, 'Something broke!');
});

require('./controller')(app);
app.listen(3000);