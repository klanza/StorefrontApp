const db = require("../models");
const passport = require('passport');
const bcrypt = require('bcrypt');

// Defining methods for the productsController
module.exports = {
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .sort({ username: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //from passport docs, last example using callback. look in to flash messages? 
  login: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) { return res.json({ message: info.message }); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
      });
    })(req, res, next);
  },
  create: (req, res) => {
    //count returns every instance of username found in db
    db.User.count({ username: req.body.username }).then((count) => {
      //if count = 0 that means that username doesn't already exist      
      if (count === 0) {
        // move making password here instead of model db lol make
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const hashWord = bcrypt.hashSync(password, salt);
        // make object, we check/compare for this in signup form!
        const localshopper = {
          username: req.body.username,
          hash: hashWord,
          salt: salt,
        };
        db.User.create(localshopper).save().then(instance => res.json(instance)).catch(err => console.dir(err));
      } else {
        res.json('Username already exists');
      }
    }).catch(err => res.status(422).json(err));
  },
};