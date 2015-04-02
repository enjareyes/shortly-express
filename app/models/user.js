var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  // hasTimestamps: true,
  defaults: {}, 

  // storing things
  //authenticate and initialize
 
  initialize: function(){
    this.on('creating', function(model, attrs, options){  
      // var username = model.get('username'); 
      var password = model.get('password'); 
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt); 
      var password = model.set('password', hash); 
    }),

    this.on('fetching', function(model, attrs, options){
      console.log(model)
      //run password through bcrypt + check if db contains bcrypt output
      this.authenticate() //access password and hash to pass in as params
    })
  },
  
  authenticate: function() { 
    var result = false;
    bcrypt.compare(password, hash, function(err, res) {
      result = true
    });

    // Load hash from your password DB.
    if (result) { 
      //
    }
  }

});

module.exports = User;