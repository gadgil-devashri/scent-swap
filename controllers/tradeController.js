const model = require('../models/trade');
const watchlist = require('../models/watchlist');
const offer = require('../models/offer');

exports.index = function(req,res,next){
    model.find()
    .then(trades => {
        trades.sort((a,b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title) )
        trades_dict = {};
        trades.forEach(trade =>{
            if(trade.category in trades_dict){
                trades_dict[trade.category].push(trade);
            }
            else{
                trades_dict[trade.category] = [];
                trades_dict[trade.category].push(trade);
            }

        })
        res.render('trade/trades', {trades_dict:trades_dict});

    })
    .catch(err => next(err))
};

exports.new = function(req,res){
    res.render('trade/newTrade');
}

exports.show = function(req,res,next){
    let id = req.params.id;
    model.findById(id).populate('createdBy', 'firstName lastName')
    .then(trade => {
        if(trade){
            watchlistId = null;
            watchlist.findOne({'tradeId': trade._id, 'userId':req.session.user})
            .then(watchlistItem => {
                if(watchlistItem){
                    watchlistId = watchlistItem._id;
                }
                res.render('trade/trade', {trade:trade, watchlistId:watchlistId});
            })
            .catch(err => next(err))
            
        }
        else{
            //res.status(404).send("Can not find trade with id", req.params.id);
            let err = new Error("Can not find trade with id "+req.params.id);
            err.status=404;
            next(err);
        }
    })
    .catch(err => next(err))
};

exports.create = function(req,res,next){
    let trade = new model(req.body);
    trade.createdBy = req.session.user;
    trade.save()
    .then(trade => {
        trade.status = 'available';
        req.flash('success', 'Trade item created successfully');
        res.redirect('/trades');
    })
    .catch(err => {
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            return res.redirect('back');
        }
        req.flash('error', 'Trade item can not be created. Please try again later');
        return res.redirect('back');
        //next(err)
    })
}

exports.delete = function(req,res,next){
    let id = req.params.id;
    model.findByIdAndDelete(id)
    .then(trade => {
        if(trade){
            watchlist.deleteMany({tradeId:id})
            .then(items =>{
                offer.findOneAndDelete({$or: [{ownerItem: id}, {tradeItem: id}]})
                .then(offer => 
                {
                    item = null
                    if(offer)
                    {
                        if(offer.ownerItem == id){
                            // update tradeItem status
                            item = offer.tradeItem
                            
                        }
                        else{
                            // update owneritem status
                            item = offer.ownerItem
                        }

                        model.findByIdAndUpdate(item, {status:'available'}, {useFindAndModify: false, runValidators: true})
                        .then(item =>{
                            req.flash('success', 'Trade item deleted successfully. If there are any associated offers/ watchlist entries then they are eliminated')
                            res.redirect('/trades');
                        })
                        .catch(err =>next(err))

                    } else{
                        req.flash('success', 'Trade item deleted successfully')
                        res.redirect('/trades');
                    }
                   
                })
                .catch(err => next(err))

            })
            .catch(err => next(err))
        }
        else{
            //res.status(404).send("Can not find trade with id", id);
            let err = new Error("Can not find trade with id "+req.params.id);
            err.status=404;
            next(err);
            
        }
    })
    .catch(err => next(err))
}

exports.update = function(req,res,next){
    let trade = req.body;
    let id = req.params.id;
    trade.status = 'available';
    model.findByIdAndUpdate(id, trade, { useFindAndModify: false, runValidators: true})
    .then(trade => {
        if(trade){
            req.flash('success', 'Trade item updated successfully');
            res.redirect('/trades/'+id);
        }
        else{
            //res.status(404).send("Can not find trade with id" +req.params.id);
            let err = new Error("Can not find trade with id "+req.params.id);
            err.status=404;
            next(err);
        }

    })
    .catch(err => {
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            return res.redirect('back');
        }
        req.flash('error', 'Trade item can not be updated. Please try again later');
        return res.redirect('back');
        //next(err);
    })
}

exports.edit = function(req,res,next){
     // res.send("trade updation form with id: " +req.params.id);
    let id = req.params.id;
    model.findById(id)
    .then(trade => {
        if(trade){
            res.render('trade/editTrade', {trade});
        }
        else{
            //res.status(404).send("Can not find trade with id" +req.params.id);
           let err = new Error("Can not find trade with id "+req.params.id);
           err.status=404;
           next(err);
        }
    })
    .catch(err => next(err))
}