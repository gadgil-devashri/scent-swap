// Require 
const express = require('express');
const morgan = require('morgan');
const tradeRoute = require('./routes/tradeRoutes');
const mainRoute = require('./routes/mainRoutes');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


// App creation
const app = express();

// App configuration 
const host = 'localhost';
const port = 3000;
app.set('view engine', 'ejs');

// Connect to DB
mongoose.connect('mongodb://localhost:27017/scent-swap' ,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => {
    // Start the server 
    app.listen(port, host, ()=>{
        console.log("Sever is running on:", port);
    })

})
.catch(err => console.log(err.message))

// Middleware 
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'ejdf3u94ir94ifijVitf94if0gi4',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60*60*1000},
    store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/scent-swap'})
}))
app.use(flash());

app.use((req, res, next) => {
    // console.log(req.session)
    res.locals.user = req.session.user || null;
    res.locals.username = req.session.username || null;
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
})

// Routes 
/* app.get('/', (req,res) =>{
    // res.send("Homepage");
    res.render('index');
}); */
app.use('/', mainRoute);
app.use('/trades', tradeRoute);
app.use('/users', userRoutes);

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

