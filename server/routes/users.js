var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'weboget'});
client.connect(function(err, result){});

router.get('/', function(req, res, next) {
    console.log('GET all users')
  
    var getAllUsers = `select * from weboget.users_by_id`;

    client.execute(getAllUsers, [],
      function(err, result){
        if(err){
          res.status(404).send({msg:err});
        } else {
            if(result.rows[0]) {
              res.json(result.rows)
            } 
            else res.json(null)
        }
      })
});

router.get('/id_:id', function(req, res, next) {
    console.log('GET user with id: ' + req.params.id)
  
    var getUser = `select * from weboget.users_by_id where userid=${+req.params.id}`;

    client.execute(getUser, [],
      function(err, result){
        if(err){
          res.status(404).send({msg:err});
        } else {
            if(result.rows[0]) {
              res.json(result.rows)
            } 
            else res.json(null)
        }
      })
  });

router.get('/email_:email/password_:pass', function(req, res, next) {
    console.log('GET /login/:email/:pass')
  
    var getUser = `select * from weboget.users_by_email_password where email=? and password=?`;

    client.execute(getUser, [req.params.email,req.params.pass],
      function(err, result){
        if(err){
          res.status(404).send({msg:err});
        } else {
            if(result.rows[0]) {
              res.json(result.rows[0])
              console.log('Nadjen email: ' + result.rows[0].email)
            }
            else {
              res.send(null)
              console.log('Nije nadjen email!')
            } 
        }
      })
  });

module.exports = router;
  