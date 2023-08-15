// const express = require("express");
// const bodyParser = require("body-parser");
// const mysql = require("mysql");

// const app = express();


// app.get("/",(req,res)=>{
//    res.sendFile(__dirname + "/index.html");
// });
// app.listen(3000,(req,res)=>{
//   console.log("Server started ....");
// });


const express = require('express');
const mysql = require('mysql2');

// Create a connection pool to MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Yojana@001',
  database: 'project',
  connectionLimit: 10
});

// Create an Express application
const app = express();

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
6
// Endpoint for handling form submission

app.get("/",(req,res)=>{
   res.sendFile(__dirname + "/index.html");
});
app.post('/complaint', (req, res) => {
  const { studentName, studentID, email, phone, gender, address, roomNumber, complaint } = req.body;

  // Create a SQL query to insert the complaint into the database
  const sql = `INSERT INTO complaints (studentName, studentID, email, phone, gender, address, roomNumber, complaint)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  // Execute the SQL query
  pool.query(sql, [studentName, studentID, email, phone, gender, address, roomNumber, complaint], (error, results) => {
    if (error) {
      console.error('Failed to submit complaint:', error);
      res.status(500).send('Failed to submit complaint.');
    } else {
      // res.send('Complaint submitted successfully!');
       res.send('<script>alert("Complaint submitted successfully!"); window.location="/";</script>');
    }
  });
  // res.redirect("/");
});

app.get('/complaints', (req, res) => {
//   res.sendFile(__dirname + "/index.html");
  // Create a SQL query to retrieve all complaints from the database
  const sql = 'SELECT * FROM complaints';

  // Execute the SQL query
  pool.query(sql, (error, results) => {
    if (error) {
      console.error('Failed to fetch complaints:', error);
      res.status(500).send('Failed to fetch complaints.');
    } else {
      res.json(results);
    }
  });
});
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
