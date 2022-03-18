const { redirect } = require('express/lib/response');
const User = require('../models/user');
const { validationResult } = require('express-validator');

//Controller for landing on login page 
exports.getLogin =  (req, res, next) => {
    res.render('index');
};

//Controller for landing on signup page
exports.getSignup = (req, res, next) => {
    res.render('signup');
};

//Controller for post login request
exports.postLogin = (req,res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('index', {
        path: '/',
        pageTitle: 'Login',
        errorMessage: errors.array()[0].msg,
        oldInput: {
            email: email,
            password: password
        },
        validationErrors: errors.array()
        });
    }
    User.findOne({email: email })
    .then(user => {
        if(!user){
            return res.render('index');
        }
        if(user.password === password){
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
                console.log(err);
                res.redirect('/home');
              });
        }
    })
};

//Controller for post signup request
exports.postSignup = (req,res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('signup');
    }
    const user = new User({
        email: email,
        password: password
    });
    user.save();
    return res.redirect('/');
};

//Controller for post logout request
exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
      });
};