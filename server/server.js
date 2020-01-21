
const express = require('express');
const md5 = require('md5');
const path = require('path');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const favicon = require('serve-favicon');
const generator = require('generate-password');

// const nodeMailer = require('nodemailer');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
//app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({ extended: true }));


var db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "cedssectbrico"
});

db.connect();

app.post('/renewpasswd', function (request, response) {
    console.log('renewpasswd for matricule = ', request.query.matricule);
    var matricule = request.body.matricule;

    var newpassword = generator.generate({
        length: 12,
        numbers: true,
        symbols: true,
        strict: true
    });

    console.log('newpassword = ' + newpassword);
    var md5newPassword = md5(newpassword);
    console.log('md5newPassword = ' +md5newPassword);

    db.query("update user set PasswdMD5 = ? where Matricule= ?",
            [md5newPassword, matricule],
             function (err, rows, fields) {

                if (err) {
                    response.send('RenewPassword has failed ');
                    //throw err;
                }
                console.log('err = ' + err);
                console.log('rows = ' + JSON.stringify(rows));
                response.send('renewpassword OK : ' + newpassword);
    });
        
    
    //db.query
});

app.post('/login', function (request, response) {

    db.query('select Matricule as mat, PasswdMD5 as passwd from user where Matricule= ?',
            [request.body.matricule], 
            function(err, rows, fields){
                
                if (err) throw err;
                
                if (rows.length === 1 && rows[0] !== null) {
                    var matricule = rows[0].mat;
                    var passwd = rows[0].passwd;
                    
                    var md5request = md5(request.body.password);
                    
                    if (md5request === passwd) {
                        response.send('Authentification OK for matricule ' + matricule);
                    }else {
                        response.send('Authentification KO for matricule ' + matricule+ ', Bad Password');
                    }
                  }
              });

});

app.get('/', function(request, response) {
    /*
    db.query('select * from userds', function(err, rows, fields){
        
         response.writeHead(200, {'Content-Type': 'application/json'});
         response.end(JSON.stringify(rows));

    });*/
    response.sendFile(path.join(__dirname, 'build', 'index.html'));
    //});
    //});    
});

console.log('server.js, app.listen(3000) ');
//app.listen(3000, '10.239.168.127');
app.listen(3000);