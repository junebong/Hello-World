/* C9では支持しない　ノンブロッキングの例
var exec = require("child_process").exec;

function start(response) {
    console.log("Request handler 'start' was called.");
    var content = "empty";
    
    exec("ls -lah", function (error, stdout, stderr) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(stdout);
        response.end();
    });
}*/
var querystring = require("querystring"),
    fs = require("fs"),
    db = require("./db");

function start(response, postData) {
    console.log("Request handler 'start' was called.");
    
    var body = '<!DOCTPYE html>' +
        '<html lang="jp">' +
        '<head>'+
        '<meta charset="utf-8">' +
    	'<title>Node-Test</title>' +
        '</head>' +
	    '<body>' +
        '<form action="/upload" method="post">' +
        '<textarea name="text" rows="20" cols="60"></textarea>' +
        '<input type="submit" value="Submit text" />' +
        '</form>' +
		'</body>' +
        '</html>';
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(body);
        response.end();
}

function upload(response, postData) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent:" + 
    querystring.parse(postData).text);
    response.end();
}

function show(response, postData) {
    console.log("Request handler 'show' was called.");
    fs.readFile("./tmp/pics/nodejs.png", "binary", function(error, file) {
       if (error) {
           response.writeHead(500, {"Content-Type": "text/plain"});
           response.write(error + "\n");
           response.end();
       } else {
           response.writeHead(200, {"Content-Type": "image/png"});
           response.write(file, "binary");
           response.end();
       }
    });
}

function tdb(response, postData) {
    console.log("Request handler 'tdb' was called.");
    db.testdb(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.tdb = tdb;