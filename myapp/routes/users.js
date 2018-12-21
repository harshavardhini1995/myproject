var express = require('express');
var router = express.Router();
var app = express();
const mysql = require('mysql');
//const bodyParser = require("body-parser");
const db = mysql.createConnection({
   host  : 'localhost',
   user  : 'root',
password : '',
database : 'nodemysql',
port     : 3306
});
//connection
db.connect((err) => {
  if(err){
    throw err;
  }
  console.log('MySql Connected...');
});

router.get('/', function (req, res) {
    res.render('index');
});




/* GET users listing. */
router.get('/createdb', (req,res) => {
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result) => {
    if(err) throw err;
    //console.log(result);
    res.send('database created');
  });
});

//create tabel
router.get('/createtb', (req,res) => {
   let sql = 'CREATE TABLE regt(id int AUTO_INCREMENT, Name VARCHAR(255), phone BIGINT, password VARCHAR(255), gender VARCHAR(255), age INT, address VARCHAR(255), email VARCHAR(255), PRIMARY KEY(id))';
   db.query(sql, (err, result) => {
     if(err) throw err;
     //console.log(result);
     res.send('regestration table created');

   });
});

router.post('/submitreg', function (req, res) {
    console.log("Inside post submitreg " +req.body);
    var n = req.body.firstName;
    var ph = req.body.phno;
    var pass = req.body.password;
    var gen = req.body.gender;
    var age = req.body.age;
    var ad = req.body.address;
    var email = req.body.email;
    console.log(n +  " :fname");
    console.log(ph +  " :ph");
    console.log(pass +  " :pass");
    console.log(gen +  " :gen");
    console.log(ad +  " :ad");
    console.log(email +  " :email");
    let post = {Name: n, phone: ph, password: pass, gender: gen, age: age, address: ad, email: email};
    let sql = 'INSERT INTO regt SET ?';
   let query = db.query(sql, post, (err, result) => {
     if(err) throw err;
     //console.log(result);
     res.send('Passed into table');
   });
 });
module.exports = router;
