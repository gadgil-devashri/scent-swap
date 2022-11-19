const model = require('../models/trade');

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
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid trade ID");
        err.status = 400;
        return next(err);
    }
    model.findById(id).populate('createdBy', 'firstName lastName')
    .then(trade => {
        if(trade){
            res.render('trade/trade', {trade:trade});
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
        res.redirect('/trades');
    })
    .catch(err => {
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err)
    })
}

exports.delete = function(req,res,next){
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid trade ID");
        err.status = 400;
        return next(err);
    }
    model.findByIdAndDelete(id)
    .then(trade => {
        if(trade){
            res.redirect('/trades');
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
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid trade ID");
        err.status = 400;
        return next(err);
    }
    model.findByIdAndUpdate(id, trade, { useFindAndModify: false, runValidators: true})
    .then(trade => {
        if(trade){
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
            err.status = 400;
        }
        next(err);
    })
}

exports.edit = function(req,res,next){
     // res.send("trade updation form with id: " +req.params.id);
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid trade ID");
        err.status = 400;
        return next(err);
    }
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