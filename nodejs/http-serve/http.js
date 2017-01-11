var connect = require('connect');
var serveStatic = require('serve-static');

var port = 8080;
var dirname = '/';
var ssl = false;

process.argv.forEach(function (val, index, array) {
  if (val.match(/port/)){
    port = val.replace(/port=/, '');
  } else if (val.match(/dirname/)) {
    dirname = val.replace(/dirname=/, '');
  } else if (val.match(/ssl/)) {
    ssl = val.replace(/ssl=/, '');
  }
});

if (!ssl) {
	connect().use(serveStatic(dirname)).listen(port, function(){
	    console.log('Serving ' + dirname  +' on '+ port  +'...');
	});
} else {
	var port = 8443;
	var dirname = __dirname;

	process.argv.forEach(function (val, index, array) {
	  if (val.match(/port/)){
	    port = val.replace(/port=/, '');
	  } else if (val.match(/dirname/)) {
	    dirname = val.replace(/dirname=/, '');
	  }
	});

	var fs = require('fs');
	var read = require('fs').readFileSync
	var https = require('https');
	var express = require('express');
	var app = express();

	app.use(express.static(dirname));
	
	var httpsServer = https.createServer({
	        key: read('/nodeserver/ssl/youbim.key', 'utf8'),
	        cert: read('/nodeserver/ssl/youbim.crt', 'utf8'),
	        ca: [
	            read('/nodeserver/ssl/ca1.crt', 'utf8'),
	            read('/nodeserver/ssl/ca2.crt', 'utf8'),
	            read('/nodeserver/ssl/ca3.crt', 'utf8')
	        ]
	    }, app);
	
	httpsServer.listen(port);
	
	console.log ('Serving ' + dirname + ' over SSL on ' + port);
}
