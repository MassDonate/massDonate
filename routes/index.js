var express = require('express');
var router = express.Router();
var low = require('lowdb')
const db = low('db.json')
var request = require('request');
/* GET home page. */
var bool = false;
var newestDisaster= "asd";
poll();
setInterval(poll() , 300000);

function poll(){
   request('http://api.rwlabs.org:80/v1/disasters?limit=1&fields%5Binclude%5D%5B%5D=country&sort%5B%5D=date%3Adesc', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        if(body!=newestDisaster){ // Show the HTML for the Google homepage.
            bool = true
            newestDisaster = body;
        }
    }
   })
}

router.get('/check',function(req,res,next){
    if(bool){
        res.send({bool:bool, newestDisaster:newestDisaster});
    }else{
        res.send({bool:bool, newestDisaster:null});
    }
    bool=false;
});
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about',function(req,res,next){
  res.render('index');
})

router.get('/disasters',function(req,res,next){
  res.render('disaster');
})

router.get('/contact',function(req,res,next){
    res.render('contact');
});
router.post('/info', function(req, res, next) {

  var name = req.body.name;
  var phone = req.body.phone;
  var address = req.body.address;
  var email = req.body.email;
  var fb = req.body.fb;
  var city = req.body.city;
  db.defaults({ users: [], cities: [] , volunteers:[], donators:[]})
  .value()

  db.get('users')
  .push({ name: name, phone: phone,city:city, address: address, email: email, fb:fb})
  .value()

  db.get('cities')
  .push({name:city,people:[]})
  .value()

  db.get('cities')
  .find({name:city})
  .value()['people'].push({name:name})
  console.log(db.get('cities').find({name:city}).value()['people'][0]);
  res.render('thanks');
});


router.post('/moreInfo',function(req,res,next){
    console.log(req.body)

    var uncode = decodeURIComponent(req);
    console.log(uncode);
    /*console.log(isValidJson(req.body));
    var donate = req.body.job;
    console.log(donate);

    var items = requ.donationItems;
    var canDropOff = requ.canDropOff;
    var needsPickup = requ.needsPickup;
    console.log(req);
    console.log("donate"+donate);
    console.log("items"+items)
    console.log("canDrop"+canDropOff);
    console.log("needsPickup"+needsPickup);
    console.log(typeof req)
    console.log(isValidJson(req));
    */
    res.send("DEEZ NUTS");
});
module.exports = router;
