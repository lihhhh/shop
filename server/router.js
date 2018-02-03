var express = require('express');
var path = require('path');
var fs = require('fs');

var bodyParser = require('body-parser');
var formidable = require('formidable');
var util = require('util');

 

 


module.exports = function(app){

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))

	// parse application/json
	app.use(bodyParser.json())  

	app.get('/',function(req,res){
		var filepath = path.join(__dirname,'../dist/index.html')
		res.sendfile(filepath);
	})

	app.post('/SaveWeChatData',function(req,res){
		var query = req.body;
		console.log(query);
		var tpl = {
			TemplateData:query.json
		};
		fs.writeFile(__dirname+'/data.json', JSON.stringify(tpl), (err) => {
		  if (err) throw err;
		  console.log('保存成功!');
		  res.status(200).json({success:true,msg:'保存成功！'});
		});
	})

	app.post('/Seller/Tool/Upload',function(req,res){
		var form = new formidable.IncomingForm();
		form.encoding = 'utf-8';
	    form.uploadDir = path.join(__dirname + "/upload");
	    form.keepExtensions = true;//保留后缀
	    form.maxFieldsSize = 2 * 1024 * 1024;
	    //处理图片
	    form.parse(req, function (err, fields, files){
	        console.log(files.file);
	        var filename = files.file.name
	        var nameArray = filename.split('.');
	        var type = nameArray[nameArray.length - 1];
	        var name = '';
	        for (var i = 0; i < nameArray.length - 1; i++) {
	            name = name + nameArray[i];
	        }
	        var date = new Date();
	        var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
	        var avatarName = name + time + '.' + type;
	        var newPath = form.uploadDir + "/" + avatarName;
	        fs.renameSync(files.file.path, newPath);  //重命名
	        // res.send({data:"/upload/"+avatarName});
	        res.send({"error": 0,"url":"/upload/"+avatarName});
	        
	    })
	})

	app.get('/GetWeChatData',function(req,res){
		var query = req.query;
		console.log(query);
		fs.readFile(__dirname+'/data.json','utf-8', (err,_d) => {
		  if (err) throw err;
		  console.log('获取json成功!');
		  res.status(200).json({success:true,Data:JSON.parse(_d),msg:'获取成功！'});
		});
	})

	app.use(express.static(path.join(__dirname,'../dist')));
	app.use(express.static(path.join(__dirname,'../server')));
	app.use(express.static(path.join(__dirname,'../src/ueditor')));

}