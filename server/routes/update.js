var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
const { report } = require('./add_user');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'weboget'});
client.connect(function(err, result){});

// Purchase
router.post('/user/:userID/:attribute/:operation/:number', function(req, res){
    var getUser = `select email, password, ${req.params.attribute} from users_by_id where userID=${+req.params.userID}`
    client.execute(getUser, [], function(err, result){
        if(err){
            res.status(404).send({msg:err});
            throw Error('Error in execute getUsersAttributeValue: ', err)
        }
        else {
            // console.log(result.rows[0])
            var currentValue, email, password, newValue
            if(req.params.attribute === 'balance')
                currentValue = result.rows[0].balance
            else if(req.params.attribute === 'numofpurchases')
                currentValue = result.rows[0].numofpurchases

            email = result.rows[0].email
            password = result.rows[0].password
            
            req.params.operation === '+' ? newValue = currentValue + (+req.params.number) : newValue = currentValue - (+req.params.number)

            var updateUserById = `update users_by_id set ${req.params.attribute}=${newValue} where userID=${+req.params.userID}`
            client.execute(updateUserById, [], function(err, result) {
                if(err) {
                    res.status(404).send({msg:err})
                    throw Error('Error in execute updateUserById: ', err)
                }
                else {
                    var updateUserByEmailPassword = `update users_by_email_password set ${req.params.attribute}=${newValue} where email=? and password=?`
                    client.execute(updateUserByEmailPassword, [email, password], function(err, result) {
                        if(err) {
                            res.status(404).send({msg:err})
                            throw Error('Error in execute updateUserByEmailPassword: ', err)
                        }
                        else {
                           console.log(`User's ${req.params.attribute} fully updated !`)
                            res.end()
                        }
                    })
                }
            })
        }
    })
})

router.post('/product/:productID/:type/:price/:number', function(req, res) {
    var getTimesBought = `select timesbought from products_by_id where productid=${+req.params.productID}`
    client.execute(getTimesBought, [], function(err, result) {
        if(err) {
            res.status(404).send({msg:err})
            throw Error('Error in execute getTimesBought: ', err)
        }
        else {
            if(result.rows[0] === null){
                console.log('nema rezultata!')
                throw Error('No rows fount at getTimesBought: ', err)
            }
            var currentTimesBought = result.rows[0].timesbought
            var newTimesBought = currentTimesBought + (+req.params.number)
            var updateProductsById = `update products_by_id set timesbought=${newTimesBought} where productID=${+req.params.productID}`
            var updateProductsByType = `update products_by_type set timesbought=${newTimesBought} where type=? and productID=${+req.params.productID}`
            var updateProductsByPrice = `update products_by_price set timesbought=${newTimesBought} where price=${req.params.price} and productID=${+req.params.productID}`
            client.execute(updateProductsById, [], function(err, result) {
                if(err){
                    res.status(404).send({msg:err})
                    throw Error('Error in execute updateProductsById: ', err)
                } 
                else {
                    client.execute(updateProductsByType, [req.params.type], function(err, result) {
                        if(err){
                            res.status(404).send({msg:err})
                            throw Error('Error in execute updateProductsByType: ', err)
                        } 
                        else {
                            client.execute(updateProductsByPrice, [], function(err, result) {
                                if(err){
                                    res.status(404).send({msg:err})
                                    throw Error('Error in execute updateProductsByPrice: ', err)
                                } 
                                else {
                                    console.log('Product fully updated!')
                                    res.end()
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

module.exports = router;