const model = require('../models/offer');
const trade = require('../models/trade');
const flash = require('connect-flash');
const offer = require('../models/offer');

exports.index = function(req,res,next) {
    const trader = req.session.user;
    const ownerItem = req.params.ownerItem;
    const owner = req.params.owner;
    trades = []
    trade.find({status: 'available', createdBy: trader})
    .then(trades =>{
        if(trades){
            trades = trades
        }
        res.render('offer/availableTrades', {trades:trades, ownerItem:ownerItem, owner:owner});
    })
    .catch(err => next(err))

};

exports.create = function(req,res,next){
    let tradeItem = req.body.tradeItem;
    let ownerItem = req.body.ownerItem;
    let offer = new model(req.body);
    offer.save()
    .then(offer => {
        trade.findByIdAndUpdate(tradeItem, {status:'pending'}, {useFindAndModify: false, runValidators: true})
        .then( result =>{
            if(result){
                trade.findByIdAndUpdate(ownerItem, {status:'pending'}, {useFindAndModify: false, runValidators: true})
                .then(updatedResult=>{
                    if(updatedResult){
                        req.flash('success', 'Offer created successfully');
                        res.redirect('/users/profile');
                    }
                })
                .catch(err=> next(err))
            }
        }
        )
        .catch(err=>next(err))
    })
    .catch(err => {
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            return res.redirect('back');
        }
        req.flash('error', 'Unable to create offer. Please try again later');
        return res.redirect('back');
        //next(err)
    })
}

exports.delete = function(req,res,next){
    let id = req.params.id;
    model.findByIdAndDelete(id)
    .then(offer => {
        if(offer){
            let ownerItem = offer.ownerItem;
            let tradeItem = offer.tradeItem;
            trade.findByIdAndUpdate(tradeItem, {status:'available'}, {useFindAndModify: false, runValidators: true})
            .then(updatedtradeItem => {
                if(updatedtradeItem){
                    trade.findByIdAndUpdate(ownerItem, {status:'available'}, {useFindAndModify: false, runValidators: true})
                    .then(updatedOwnerItem => {
                        if(updatedOwnerItem){
                            req.flash('success', 'Offer is removed successfully')
                            res.redirect('/users/profile');
                        }
                    })
                    .catch(err => next(err))
                }
            })
            .catch(err => next(err))
        }
        else{
            //res.status(404).send("Can not find trade with id", id);
            let err = new Error("Can not find offer with id "+req.params.id);
            err.status=404;
            next(err);
            
        }
    })
    .catch(err => next(err))
}

exports.manage = function(req,res,next) {
    const user = req.session.user;
    const item = req.params.item;
    let isOfferResponder = false;
    model.findOne({$or: [{tradeItem: item}, {ownerItem: item}]}).populate('tradeItem', 'title category status image').populate('ownerItem', 'title category status image')
    .then(offer => {
        if(offer){
            if(offer.owner == user){
                // show accept and reject
                isOfferResponder = true;
            }
            res.render('offer/manageOffer', {offer: offer, isOfferResponder: isOfferResponder})
        }
        else{
            req.flash('error', 'Unable to retrieve the offer');
            res.redirect('back');
        }
    })
    .catch(err => next(err));

};

exports.acceptOffer = function(req,res,next){
    let id = req.params.id;
    model.findByIdAndDelete(id)
    .then(offer => {
        if(offer){
            let ownerItem = offer.ownerItem;
            let tradeItem = offer.tradeItem;
            trade.findByIdAndUpdate(tradeItem, {status:'traded'}, {useFindAndModify: false, runValidators: true})
            .then(updatedtradeItem => {
                if(updatedtradeItem){
                    trade.findByIdAndUpdate(ownerItem, {status:'traded'}, {useFindAndModify: false, runValidators: true})
                    .then(updatedOwnerItem => {
                        if(updatedOwnerItem){
                            req.flash('success', 'Items are traded successfully')
                            res.redirect('/users/profile');
                        }
                    })
                    .catch(err => next(err))
                }
            })
            .catch(err => next(err))
        }
        else{
            //res.status(404).send("Can not find trade with id", id);
            let err = new Error("Can not find offer with id "+req.params.id);
            err.status=404;
            next(err);
            
        }
    })
    .catch(err => next(err))
}