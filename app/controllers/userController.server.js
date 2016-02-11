'use strict';
/*this was the part added for the assignment */


function userController () {

	this.userinfo = function (req, res) {
		/*finds the ip address, os being used and the language and returns to client */
        var str1 = req.headers['user-agent'];
        var ind1 = str1.indexOf("(");
        var ind2 = str1.indexOf(")");
        var os = str1.substring(ind1+1,ind2);
        ind1 = req.headers['accept-language'].indexOf(',');
        var lang = req.headers['accept-language'].substring(0,ind1);
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end(JSON.stringify({"ipaddress":req.ip,"language":lang,"software":os}));
	};
	


}


module.exports = userController;