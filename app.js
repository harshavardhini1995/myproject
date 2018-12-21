const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile('C:/Users/HP/Desktop/nodesql/index.html');
});


//create connection
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



//create database
app.get('/createdb', (req,res) => {
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result) => {
    if(err) throw err;
    //console.log(result);
    res.send('database created');
  });
});

//create tabel
app.get('/createtb', (req,res) => {
   let sql = 'CREATE TABLE regt(id int AUTO_INCREMENT, Name VARCHAR(255), phone BIGINT, password VARCHAR(255), gender VARCHAR(255), PRIMARY KEY(id))';
   db.query(sql, (err, result) => {
     if(err) throw err;
     //console.log(result);
     res.send('regestration table created');

   });
});

app.post('/submitreg', function (req, res) {
    var n = req.body.firstName;
    var ph = req.body.phno;
    var pass = req.body.password;
    var gen = req.body.gender;
    let post = {Name: n, phone: ph, password: pass, gender: gen};
    let sql = 'INSERT INTO regt SET ?';
   let query = db.query(sql, post, (err, result) => {
     if(err) throw err;
     //console.log(result);
     res.send('Passed into table');
   });

    //var len = req.body.firstName.length;
    //var iChars = "!`@#$%^&*()+=-[]\\\';,./{}|\":<>?~_";
    //var numb = "1234567890";
    //if(len > 6)
    //{
      //  res.send('enter name with less than 6 characters');
    //}
    //for (var i = 0; i < len; i++)
    //{
      //if (iChars.indexOf(name.charAt(i)) != -1)
        //{
          //res.send('No spl characters');
        //}
    //}
    //for (var i = 0; i < len; i++)
    //{
      //if (numb.indexOf(name.charAt(i)) != -1)
        //{
          //res.send('No numbers');
        //}
  //  }

app.post('/submitlog', function (req, res) {
    var ln = req.body.LfirstName;
    var password = req.body.Lpassword;
    //let sql = 'SELECT Name,password FROM regt WHERE Name = ?';
    db.query('SELECT * FROM regt WHERE Name = ?',[ln], function (error, results, fields)
    {
           if (error)
             {
    // console.log("error ocurred",error);
                   res.send({
                   "code":400,
                   "failed":"error ocurred"});
              }
          else
       {
    // console.log('The solution is: ', results);
                     if(results.length >0)
                     {
                            if(results[0].password == password)
                              {
                                 res.send({
                                "code":200,
                                "success":"login sucessfull"});
                              }
                            else
                             {
                                res.send({
                                "code":204,
                                "success":"Email and password does not match"});
                              }
                     }
                     else
                    {
                             res.send({
                             "code":204,
                             "success":"Email does not exits"});
                    }
      }
  });
});//app.post

    //var len = req.body.firstName.length;
    //var iChars = "!`@#$%^&*()+=-[]\\\';,./{}|\":<>?~_";
    //var numb = "1234567890";
    //if(len > 6)
    //{
      //  res.send('enter name with less than 6 characters');
    //}
    //for (var i = 0; i < len; i++)
    //{
      //if (iChars.indexOf(name.charAt(i)) != -1)
        //{
          //res.send('No spl characters');
        //}
    //}
    //for (var i = 0; i < len; i++)
    //{
      //if (numb.indexOf(name.charAt(i)) != -1)
        //{
          //res.send('No numbers');
        //}
  //  }



app.listen('3000', () => {
  console.log('listening to localhost:3000');
});
