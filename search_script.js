const express = require('express')
const mysql = require('mysql')
var app = express()

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'search'
})

connection.connect(function (err) {
  if (err) {
    console.log('Error!!')
  } else {
    console.log('Connected!')
  }
})

app.get('/user', function (req, res) {
  // res.json('hello')
    var first_name1='in';
    if(first_name1.length>=3){
      
        connection.query('SELECT * FROM user WHERE first_name LIKE"'+ first_name1+'%"LIMIT 5;', function (err, rows, fields) {
        if (err) {
          console.log('Error in query')
        } else {
          console.log('Successfull query')
          res.json(rows)
        }
      })
    }
    else{
        res.json('provide atleast 3 chars for search');
    }
})

app.listen(3306)
