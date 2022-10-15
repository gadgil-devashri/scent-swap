// Require 
const express = require('express');
const morgan = require('morgan');
const tradeRoute = require('./routes/tradeRoutes');
const methodOverride = require('method-override');

// App creation
const app = express();

// App configuration 
const host = 'localhost';
const port = 3000;
app.set('view engine', 'ejs');

// Middleware 
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// Routes 
app.get('/', (req,res) =>{
    // res.send("Homepage");
    res.render('index');
});
app.use('/trades', tradeRoute);

app.use((req,res,next)=>{
    let err = new Error('The server can not locate: '+req.url);
    err.status=404;
    next(err);
})
app.use((err, req, res, next) =>{
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});

})

// Start the server 
app.listen(port, host, ()=>{
    console.log("Sever is running on:", port);
})