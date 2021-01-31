var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'weboget'});
client.connect(function(err, result){});

router.get('/', function(req, res, next) {
    console.log('GET all products by id')
  
    var getAllProducts = `select * from weboget.products_by_id`;

    client.execute(getAllProducts, [],
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
    console.log('GET product with id: ' + req.params.id)
  
    var getProduct = `select * from weboget.products_by_id where productid=${+req.params.id}`;

    client.execute(getProduct, [],
      function(err, result){
        if(err){
          res.status(404).send({msg:err});
        } else {
            if(result.rows[0]) {
              res.json(result.rows[0])
            } 
            else res.json(null)
        }
      })
});

module.exports = router;