
const express = require('express');
const md5 = require('md5');
const path = require('path');
const mysql = require('mysql');
const bodyparser = require('body-parser');
//const favicon = require('serve-favicon');
const generator = require('generate-password');

// const nodeMailer = require('nodemailer');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

var db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "cedssectbrico"
});

db.connect();

app.post('/renewpasswd', function (request, response) {
    console.log('renewpasswd for matricule = ', request.body.matricule);
    var matricule = request.body.matricule;

    var newpassword = generator.generate({
        length: 12,
        numbers: true,
        symbols: true,
        strict: true
    });

    console.log('newpassword = ' + newpassword);
    var md5newPassword = md5(newpassword);

    db.query("update user set PasswdMD5 = ? where Matricule= ?",
            [md5newPassword, matricule],
             function (err, rows, fields) {

                if (err) {
                    response.send('RenewPassword has failed ');
                }
                response.send('renewpassword OK : ' + newpassword);
    });
    
});

app.post('/login', function (request, response) {

    db.query('select Nom as nom, Prenom as prenom, Matricule as mat, PasswdMD5 as passwd from user where Matricule= ?',
            [request.body.matricule],
            function(err, rows, fields){

                if (err) throw err;

                if (rows.length === 1 && rows[0] !== null) {
                    var matricule = rows[0].mat;
                    var passwd = rows[0].passwd;
                    var nom = rows[0].nom;
                    var prenom = rows[0].prenom;

                    var md5request = md5(request.body.password);

                    if (md5request === passwd) {
                        response.send({ matricule, nom, prenom });
                    } else {
                        response.send({ error: 'Bad Password'});
                    }
                  }
              });

});


app.listen(port, () => console.log(`Listening on port ${port}` ));