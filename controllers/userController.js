const model = require('../models/user');
const flash = require('connect-flash');
const trade = require('../models/trade');
const watchlist = require('../models/watchlist');

exports.new = (req, res)=>{
    res.render('./user/new');
};

exports.login = (req, res)=>{
    res.render('./user/login');
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id), trade.find({'createdBy':id}), watchlist.find({'userId': id}).populate('tradeId','title category status')])
    .then(results =>{
        const [user, trades, watchlistItems] = results;
        res.render('./user/profile' , {user: user, trades:trades, watchlistItems:watchlistItems})

    })
    .catch(err => next(err));
};


exports.create = (req, res, next)=>{
    let user = new model(req.body);
    user.save()//insert the document to the database
    .then(user=> {
        req.flash('success', 'You have signed up successfully.')
        res.redirect('/users/login')
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);
            return res.redirect('/users/new');
        }
        if(err.code === 11000 ) {
            req.flash('error', 'Email address is already taken');
            return res.redirect('/users/new');
        }
        next(err);
    });
    
};

exports.verify = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    model.findOne({email: email})
    .then(user =>{
        if(user){
            user.comparePassword(password)
            .then(result => {
                if(result){
                    req.flash('success', 'You have successfully logged in');
                    req.session.user = user._id;
                    req.session.username = user.firstName;
                    res.redirect('/users/profile');
                }
                else{
                    req.flash('error', 'Wrong password');
                    // console.log("Wrong password");
                    res.redirect('/users/login');
                }
            })
            .catch(err => next(err))
        }
        else{
            req.flash('error', 'Wrong email');
            // console.log("Wrong email");
            res.redirect('/users/login');
        }
    })
    .catch(err => next(err))
}

exports.logout = (req, res, next) =>{
    req.session.destroy(err => {
        if(err){
            return next(err)
        }
        else{
            res.redirect('/')
        }
    });

}