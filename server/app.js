var express = require('express');
var app = express();

require('./router.js')(app);

app.listen(3000,function(){
	console.log('run 3000');
});