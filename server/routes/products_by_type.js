var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'weboget'});
client.connect(function(err, result){});

router.get('/', function(req, res, next) {
    console.log('GET all products by type')
  
    var getAllProducts = `select * from weboget.products_by_type`;

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

router.get('/type_:type', function(req, res, next) {
    console.log('GET products by type: ' + req.params.type)
  
    var getProduct = `select * from weboget.products_by_type where type=?`;
  
    client.execute(getProduct, [req.params.type],
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
  