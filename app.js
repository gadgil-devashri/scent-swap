// Require 
const express = require('express');

// App creation
const app = express();

// App configuration 
const host = 'localhost';
const port = 3000;
app.set('view engine', 'ejs');

// Middleware 
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

// Routes 
app.get('/', (req,res) =>{
    // res.send("Homepage");
    res.render('index');
})

// Start the server 
app.listen(port, host, ()=>{
    console.log("Sever is running on:", port);
})