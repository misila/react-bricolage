const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();
//app.use(express.static(path.join(__dirname, 'build')));

var db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "cedssectbrico"
});

db.connect();

app.get('/ping', function(req, res){
    
    return res.send('pong');
});

app.get('/', function(request, response) {
 
    db.query('select * from userds', function(err, rows, fields){
        //console.log('query is DONE, err = ', err, ', fields = ', fields);
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(rows));
        //console.log(JSON.stringify(rows));
    });
    //});
    //response.sendFile(path.join(__dirname, 'build', 'index.html'));
    //res.send('Hello World!');
});

console.log('server.js, app.listen(3000) ');
app.listen(3000);