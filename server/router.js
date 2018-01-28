var express = require('express');
var path = require('path');
var fs = require('fs');

var bodyParser = require('body-parser')

 

 


module.exports = function(app){

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))

	// parse application/json
	app.use(bodyParser.json())  

	app.get('/',function(req,res){
		var filepath = path.join(__dirname,'../dist/index.html')
		res.sendfile(filepath);
	})

	app.post('/WeChatData',function(req,res){
		var query = req.body;
		console.log(query);
		fs.writeFile(__dirname+'/data.json', JSON.stringify(query), (err) => {
		  if (err) throw err;
		  console.log('保存成功!');
		  res.status(200).json({success:true,msg:'保存成功！'});
		});
	})

	app.get('/WeChatData',function(req,res){
		var query = req.query;
		console.log(query);
		fs.readFile(__dirname+'/data.json','utf-8', (err,_d) => {
		  if (err) throw err;
		  console.log('获取json成功!');
		  res.status(200).json({success:true,json:_d,msg:'获取成功！'});
		});
	})

	app.use(express.static(path.join(__dirname,'../dist')));

}