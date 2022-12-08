const model = require('../models/watchlist');
const flash = require('connect-flash');

exports.create = function(req,res,next){
    let watchlistItem = new model();
    watchlistItem.tradeId = req.params.id;
    watchlistItem.userId = req.session.user;
    watchlistItem.save()
    .then(watchlistItem => {
        req.flash('success', 'Trade item is added to your watchlist');
        res.redirect('/users/profile');
    })
    .catch(err => {
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            return res.redirect('back');
        }
        req.flash('error', 'Unable to add trade item to your watchlist. Please try again later');
        return res.redirect('back');
        //next(err)
    })
}

exports.delete = function(req,res,next){
    let id = req.params.id;
    model.findByIdAndDelete(id)
    .then(watchlistItem => {
        if(watchlistItem){
            req.flash('success', 'Trade item is removed from your watchlist')
            res.redirect('back');
        }
        else{
            //res.status(404).send("Can not find trade with id", id);
            let err = new Error("Can not find watchlist item with id "+req.params.id);
            err.status=404;
            next(err);
            
        }
    })
    .catch(err => next(err))
}