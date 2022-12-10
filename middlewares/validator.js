const {body} = require('express-validator');
const {validationResult} = require('express-validator');

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

exports.validateSignup = [
    body('firstName', 'first name can not be empty').notEmpty().trim().escape(),
    body('lastName', 'last name can not be empty').notEmpty().trim().escape(),
    body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({ min: 8, max: 64})
]

exports.validateLogin = [
    body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({ min: 8, max: 64})
]

exports.validateResults = (req,res,next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        })
        return res.redirect('back')
    }
    else{
        return next();
    }
}

exports.validateTrade = [
    body('title', 'Title can not be empty').notEmpty().trim().escape(),
    body('category', 'Category can not be empty').notEmpty().trim().escape(),
    body('company', 'Company can not be empty').notEmpty().trim().escape(),
    body('type', 'Type can not be empty').notEmpty(),
    body('original_net_weight', 'original_net_weight can not be empty').notEmpty().trim().escape(),
    body('existing_net_weight', 'existing_net_weight can not be empty').notEmpty().trim().escape(),
    body('original_price', 'original_price can not be empty').notEmpty().trim().escape(),
    body('image', 'image can not be empty').notEmpty(),
    body('details', 'Details must be at least 10 characters long').isLength({ min: 10}).trim().escape()
]