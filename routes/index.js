var express = require('express');
var router = express.Router();
const db = low('db.json')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/info', function(req, res, next) {
  var name = req.body.name;
  var phone = req.body.phone;
  var address = req.body.address;
  var email = req.body.email;
  var fb = req.body.fb; 
  db.defaults({ users: [] })
  .value()
  
  db.get('users')
  .push({ name: name, phone: phone, address: address, email: email, fb:fb})
  .value()

  var test = db.get('posts')
  .find({ name:name })
  .value()
    
  console.log(test)

  res.render('index');
});

module.exports = router;
