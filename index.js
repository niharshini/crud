const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "student_db"
});

mysqlconnection.connect((err)=>{
    if(!err)
    console.log('database connection successful');
    else
    console.log('database connection not successful \n Error : ' + JSON.stringify(err, undefined,2));
});

app.listen(3000,()=>console.log('Express server is running at port no : 3000'));

//GET ALL STUDENTS
app.get('/student',(req,res)=>{
    mysqlconnection.query('SELECT * FROM student',(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//GET ONE STUDENT
app.get('/student/:Id',(req,res)=>{
    mysqlconnection.query('SELECT * FROM student WHERE Std_Id=?',[req.params.Id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//DELETE ONE STUDENT
app.delete('/student/:Id',(req,res)=>{
    mysqlconnection.query('DELETE FROM student WHERE Std_Id=?',[req.params.Id],(err,rows,fields)=>{
        if(!err)
        res.send('deleted successfully');
        else
        console.log(err);
    })
});

//INSERT STUDENT
app.post('/student', (req, res) => {
    let std = req.body;
    var sql = "SET @Std_Id = ?;SET @Name = ?;SET @Dept_Name = ?;SET @Redn_No = ?; \
    CALL studentAddOrEdit(@Std_Id,@Name,@Dept_name,@Regn_No);";
    mysqlConnection.query(sql, [std.Std_Id, std.Name, std.Dept_name, std.Regn_No], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted Student id : '+element[0].Std_Id);
            });
        else
            console.log(err);
    })
});

//UPDATE STUDENT
 app.put('/student', (req, res) => {
    let std = req.body;
    var sql = "SET @Std_Id = ?;SET @Name = ?;SET @Dept_Name = ?;SET @Redn_No = ?; \
    CALL studentAddOrEdit(@Std_Id,@Name,@Dept_name,@Regn_No);";
    mysqlConnection.query(sql, [std.Std_Id, std.Name, std.Dept_name, std.Regn_No], (err, rows, fields) => {
         if (!err)
             res.send('Updated successfully');
         else
            console.log(err);     })
 });