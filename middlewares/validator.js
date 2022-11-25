exports.validateId = (req,res,next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(id.match(/^[0-9a-fA-F]{24}$/)) {
       return next();
    }
    else{
        req.flash('error', 'Invalid trade id')
        //let err = new Error('Invalid trade id');
        // err.status = 400;
        // return next(err);
        return res.redirect('back');
    }
}