const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user:"root",
  password:"7Wn7v64H!!",
  database:"accviewd"
})

app.get('/', (re, res) => {
    return res.json("From BAckend Side");
  });

app.get('/users',(req,res)=>{
  const sql="SELECT * FROM user";
  db.query(sql,(err,data)=>{
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.get('/balance-sheet', (req, res) => {
  const sql = "SELECT AccountTypeName, AccountName, acctotalamount FROM balancesheetc"; // Modify according to your table structure
  db.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
         return res.json(data);
      }
  });
});

app.get('/income-statement', (req, res) => {
  const sql = "SELECT AccountTypeName, AccountName, acctotalamount FROM balancesheetc"; // Modify according to your table structure
  db.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
         return res.json(data);
      }
  });
});


app.listen(8081, () => {
  console.log("listening");
});


