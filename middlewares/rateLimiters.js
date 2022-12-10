const rateLimit = require('express-rate-limit')

exports.logInLimiter = rateLimit({
    windowMS: 60 * 1000, // 1 min
    max:5,
    //message: "Too many requests. Try again later"
    handler: (req, res, next)=>{
        let err = new Error('Too many requests. Try again later')
        err.status = 429;
        return next(err);
    }

})