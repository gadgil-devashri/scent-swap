exports.index = function(req,res){
    res.render('index');
}

exports.about = function(req,res){
    res.render('main/about');
};

exports.contact = function(req,res){
    res.render('main/contact');
};