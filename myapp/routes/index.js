var express = require('express');
var router = express.Router();
var app = express();
const mysql = require('mysql');
const bodyParser = require("body-parser");
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
});

router.get('/', function (req, res) {
    res.render('index');
});
/* GET home page. */
router.post('/submitlog', function (req, res) {
    var ln = req.body.LfirstName;
    var password = req.body.Lpassword;
    //let sql = 'SELECT Name,password FROM regt WHERE Name = ?';
    db.query('SELECT * FROM regt WHERE email = AND Name = ?',[ln], function (error, results, fields)
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
module.exports = router;
