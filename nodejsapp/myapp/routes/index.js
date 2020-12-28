var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db=mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'webapp',
  debug: false
});

// /* GET home page. */
 router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
 });

router.get('/testconnect', function (req,res,next){
  if(db != null) {
    res.send('connect success');
  }else{
    res.send('connect fail');
  }
})

router.get('/admin', function (Req,res,next){
db.query('SELECT * FROM users', function (err,rs){
  res.render('admin', {users:rs});
})

});

router.get('/form', function(req, res, next){
  res.render('form');

});

router.get('/home', function(req, res, next){
  res.render('home');

});



router.post('/form', function(req, res, next){
db.query('INSERT INTO users SET ?', req.body, function (err, rs){
  res.send('Registered successfully');


 
})
})
router.post('/edit', function(req, res, next){
  db.query('INSERT INTO users WHERE id = ?', req.body, function (err, rs){
    res.redirect('/admin');
   
  })
  })

router.get('/delete', function(req, res, next) {
db.query('DELETE FROM users WHERE id = ?', req.query.id, function (err,rs){
  res.redirect('/admin');
})
});

router.get('/edit', function (req,res,next){
  db.query('SELECT * FROM users WHERE id = ?', req.query.id, function (err, rs){
    res.render('edit', {user: rs[0] });
  })
})



module.exports = router;
