var express = require('express');
var router = express.Router();
var auth = require('../auth/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/', async function(req, res, next){
    const authed = await auth(req.body.user, req.body.pw);
    if(authed){
        console.log('logged in');
        req.session.user = req.body.user;
    }else{
        console.log('false user/pw');
    }
    res.render('login');
}); 

module.exports = router;