const trade = require('../models/trade');

// check if user is guest

exports.isGuest = (req,res,next)=>{
    if(!req.session.user){
        return next();
    }
    else{
        req.flash('error', 'You are already logged in');
        return res.redirect('/users/profile');
    }
}

// check if user is logged in

exports.isLoggedIn = (req,res,next)=>{
    if(req.session.user){
        return next();
    }
    else{
        req.flash('error', 'You need to log in first');
        return res.redirect('/users/login');
    }
}

// check if user is trade owner

exports.isOwner = (req,res,next)=>{
    let id = req.params.id;
    trade.findById(id)
    .then(trade => {
        if(trade){
            if(trade.createdBy == req.session.user){
                return next();
            }
            else{
                //err = new Error('Unauthorized to perform this action');
                //err.status = 401;
                //next(err);
                req.flash('error', 'Unauthorized to perform this action');
                return res.redirect('back');

            }
        }
    })
    .catch(err => next(err))
   
}
