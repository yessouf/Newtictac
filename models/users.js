var mongoose = require('./connection')

var userSchema = mongoose.Schema({
    name: String,
    firstname: String,
    email: String,
    password: String,
})

module.exports = mongoose.model('users', userSchema);
