

var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config/dbconfig');


// adding the user
var functions = { 
    addNew: function (req,res) {
        if((!req.body.name) || (!req.body.password)) {
            res.json({success:false, msg:'Enter all fields'})
        }
        else {
            var newUser = User ({
                name: req.body.name,
                password: req.body.password

            });
            newUser.save(function(err,newUser) {
                if(err) {
                    res.json({success:false, msg:'Failed to save'})
                }
                else {
                    res.json({success:true, msg:'Successfully saved'})
                }
            })
        }
    },
   authenticate: function(req,res) {
       User.findOne({
           name: req.body.name
       }, function (err,user) {
           if(err) throw console.error
           if(!user) {
                res.status(403).send({success:false, msg:'Authentication failed. User not found.'})
           }
           else {
               user.comparePassword (req.body.password, function (err,isMatch){
                   if(isMatch && !err) { 
                       // incase of password match we need to send JWT token
                       var token = jwt.encode (user, config.secret)
                       res.json({success:true, token: token})
                   }
                   else {
                       return res.status(403).send({success:false, msg:'Authentication failed. Wrong password.'})
                   }
               })
           }
        
        
        
        }
       
       )
   },
   getinfo: function(req,res) {
    if(req.headers.authorization && req.headers.authorization.split('')[0]=== 'Bearer') {
        var token = req.headers.authentication.split('') [1]
        var decodetoken = jwt.decode(token, config.secret)
         return res.json ({success:true, user: 'Hello' + decodetoken.name})
    }
    else {
        return res.json({success:false, msg:'No token provided'})
    }
}
}

module.exports= functions