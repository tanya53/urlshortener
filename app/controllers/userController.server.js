'use strict';
/*contains the code for shortening the URL and storing it in the database and 
  retrieveing it by the shortened URL */
var URL = require('../models/URL.js');
var validUrl = require('valid-url');



function make_short_url(){
/* this is not the best algrithm to use for mapping the long_url to a short_url that
   is unique.  I was going to use the _id from mongo, but it was too big, then I was just 
   goint to count the records.  I opted to just use the date and use modular arithmatic. 
   This will not find duplicates of the same long_url and if it was heavily used there could
   be duplicates   */
   
   var nbr = Date.now();
   var remainder = 0;
   var digits = [];
   var str = "";
   var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
   var BASE = ALPHABET.length;
   
   while (nbr > 0){
       remainder = nbr % BASE;
       digits.push(remainder);
       nbr = Math.floor(nbr/BASE);
       }
   digits = digits.reverse();
   for (var i = 0;i < digits.length;i++){
       str = str + ALPHABET[digits[i]];
       }
   return str;
   }



function userController () {

	this.shortenurl = function (req, res,https) {
		/*shortens or lengthens url*/
		var outstr = "";
        var long_url = req.originalUrl.slice(req.originalUrl.indexOf('/new/')+5);

    	if (!validUrl.isUri(long_url)){
    	    outstr = JSON.stringify({"error":"invalid url"});
    	    res.end(outstr);
    	}else{
    	var short_url = make_short_url();
    	var url1 = new URL({_id:short_url,original_url:long_url});
    	
        url1.save(function(err){
            if(err) {
      	      outstr = JSON.stringify({"didn't add url to database ":err.code});}
            else {outstr = JSON.stringify({"original_url":long_url,"short_url":short_url});

            }    
                 res.end(outstr);
            });
	
        }
    }; /* shortenurl */

    this.getlongurl = function(req,res,https){
        var short_url =req.params.shorturl;
        var url = URL.findOne({_id:short_url},function (err,docs){
            if (err) {
                var outstr = JSON.stringify({"can't find url in database ":err});
                res.end(outstr);
            }
            else{
            if (docs == null){
                var outstr = "can't find url in database";
                res.end(outstr);
            }
            else {
                res.redirect(docs.original_url);}
                
            }
        });
        
    };
} /* userController */


module.exports = userController;