const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: { type: String, required : [true, 'can not be empty']},
    lastName: { type: String, required : [true, 'can not be empty']},
    email: { type: String, required : [true, 'can not be empty'], unique: true},
    password: { type: String, required : [true, 'can not be empty']}
});

// replace plaintext password with hased password 
userSchema.pre('save', function(next){
    let user = this;
    if(! user.isModified('password'))
        return next();
    bcrypt.hash(user.password, 10)
    .then(hash => {
        user.password = hash;
        return next();
    })
    .catch(err => next(err))
})

userSchema.methods.comparePassword = function(loginpassword) {
    return bcrypt.compare(loginpassword, this.password)
}
module.exports = mongoose.model('User', userSchema);