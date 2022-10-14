exports.index = function(req,res){
    res.render('trade/trades');

};

exports.new = function(req,res){
    res.render('trade/newTrade');
}

exports.show = function(req,res){
    res.render('trade/trade');
};