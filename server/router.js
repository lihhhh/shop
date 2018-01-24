var express = require('express');
var path = require('path');

module.exports = function(app){

	app.get('/',function(req,res){
		var filepath = path.join(__dirname,'../dist/index.html')
		res.sendfile(filepath);
	})

	app.get('/test',function(req,res){
		res.status(200).json({success:true});
	})

	app.use(express.static(path.join(__dirname,'../dist')));

}