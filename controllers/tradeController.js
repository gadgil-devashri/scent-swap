const model = require('../models/trade');

exports.index = function(req,res){
    trades = model.find();
    res.render('trade/trades', {trades:trades});

};

exports.new = function(req,res){
    res.render('trade/newTrade');
}

exports.show = function(req,res){
    trade = model.findById();
    res.render('trade/trade');
};