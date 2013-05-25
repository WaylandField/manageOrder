var fs = require('fs');
module.exports = function(app, options){
  console.log('controller initiating...');
  fs.readdirSync(__dirname + '/rest').forEach(function(name){
      if(name && name.toLowerCase().substring(name.length-3)==='.js'){
          console.log('   %s', name);
          var obj = require('./rest/' + name)(app, options);
      }
  });
  console.log('controller initiating completed');
};