var mongo = require('mongoskin');

var conn = mongo.db('pamupamu:pamupamu@flame.mongohq.com:27077/pamu');

function testdb(res){
    
    conn.collection('ladies').find({area_codes:503}).toArray(function (err, items){
        if(err) throw err;
        
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(items));
    });
    
}

exports.testdb = testdb;