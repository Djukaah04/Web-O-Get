var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'weboget'});
client.connect(function(err, result){});

router.get('/', function(req, res, next) {
    console.log('GET all products by price')
  
    var getAllProducts = `select * from weboget.products_by_price`;

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

router.get('/price_:sign/:value', function(req, res, next) {
    
    var sign = req.params.sign === 'above' ? '>' : '<'
    console.log(`GET product with price${sign}${req.params.value}`)

    var getProduct = `select * from weboget.products_by_price where price${sign}${+req.params.value} allow filtering`;
  
    client.execute(getProduct, [],
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

module.exports = router;
  