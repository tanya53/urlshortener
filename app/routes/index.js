'use strict';

var path = process.cwd();
var Controller = require(path + '/app/controllers/userController.server.js');


module.exports = function (app) {
	
	var controller = new Controller();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
	
	app.route('/new/*')
	  .get(controller.shortenurl);
	  
	app.route('/:shorturl')
	  .get(controller.getlongurl);
	  
	app.route('*').get(function(req,res){
		res.end('entered invalid url');
	});
	
};
