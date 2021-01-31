var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'weboget'});
client.connect(function(err, result){});


// Adding a user
router.post('/:firstName/:lastName/:email/:password', function(req, res, next) {
    console.log(`ADD user: ${req.params.firstName} ${req.params.lastName}`)
  
    var getNextId = "select next_id from ids";
    var nextId;
    var insertUser1 = "insert into weboget.users_by_id (userID, firstName, lastName, email, password, numOfPurchases, balance) values (?,?,?,?,?,0,0)";
    var insertUser2 = "insert into weboget.users_by_email_password (userID, firstName, lastName, email, password, numOfPurchases, balance) values (?,?,?,?,?,0,0)";
    var updateNextId = "update ids set next_id=next_id+1 where id_name='userID'";
    const queries = [
        { query: insertUser1, params: [nextId, req.params.firstName, req.params.lastName, req.params.email, req.params.password]},
        { query: insertUser2, params: [nextId, req.params.firstName, req.params.lastName, req.params.email, req.params.password]} 
    ];

    client.execute(getNextId, [], function(err,result) {
        if(err){
            res.status(404).send({msg:err});
            throw Error('Error in getNextId: ', err)
        } 
        else {
            nextId = +result.rows[0].next_id; // ID for the new user

            client.execute(insertUser1, [nextId, req.params.firstName, req.params.lastName, req.params.email, req.params.password], { prepare : true },
                function(err, result){
                    if(err){
                        res.status(404).send({msg:err});
                    } else {
                        client.execute(insertUser2, [nextId, req.params.firstName, req.params.lastName, req.params.email, req.params.password], { prepare : true },
                            function(err, result){
                                if(err){
                                    res.status(404).send({msg:err});
                                } else {
                                    client.execute(updateNextId,[],
                                        function(err, result){
                                            if(err){
                                                res.status(404).send({msg:err});
                                                throw Error('Error in execute: ', err)
                                            } else {
                                                console.log('All OK!')
                                                res.send({msg: true})
                                            }
                                        }
                                    )
                                }
                            }
                        )
                    }
                }
            )   
        }
    })
});

module.exports = router;
  