const model = require('../models/trade');

exports.index = function(req,res){
    trades = model.find();
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

};

exports.new = function(req,res){
    res.render('trade/newTrade');
}

exports.show = function(req,res){
    trade = model.findById(req.params.id);
    if(trade){
        res.render('trade/trade', {trade:trade});
    }
    else{
        res.status(404).send("Can not find trade with id", req.params.id);
    }
};

exports.create = function(req,res){
    trade = req.body;
    model.save(trade);
    res.redirect('/trades');
}

exports.delete = function(req,res){
    let id = req.params.id;
    let result = model.delete(id);
    if(result){
        res.redirect('/trades');
    }
    else{
        res.status(404).send("Can not find trade with id", id);
    }
}

exports.update = function(req,res){
    let trade = req.body;
    let id = req.params.id;
    result = model.update(id, trade);
    if(result){
        res.redirect('/trades/'+id);
    }
    else{
        res.status(404).send("Can not find trade with id" +req.params.id);
    }
}

exports.edit = function(req,res){
     // res.send("Story updation form with id: " +req.params.id);
     let trade = model.findById(req.params.id)
     if(trade){
         res.render('trade/edit', {trade});
     }
     else{
         res.status(404).send("Can not find story with id" +req.params.id)
     }
}