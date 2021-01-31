var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1', keyspace: 'weboget'});
client.connect(function(err, result){});


router.get('/product/:productID', function(req, res, next) {
    console.log(`Get all purchases of product with productID=${req.params.productID}`)

    var getBuyers = `select * from weboget.products_buyer where productid=${+req.params.productID}`
    client.execute(getBuyers, [], function(err, result) {
        if(err) {
            res.status(404).send({msg: err})
            throw Error('Error in execute getBuyers: ', err)
        }
        else {
            res.json(result.rows)
        }
    })
})

router.get('/:userID', function(req, res, next) {
    console.log(`Get all purchases from userID=${req.params.userID}`)

    var getPurchases = `select * from weboget.users_purchase where userid=${+req.params.userID}`
    client.execute(getPurchases, [], function(err, result) {
        if(err) {
            res.status(404).send({msg: err})
            throw Error('Error in execute getPurchases: ', err)
        }
        else {
            res.json(result.rows)
        }
    })
})

router.post('/:userID/:firstName/:lastName/:productID/:name/:type/:price/:amount', function(req, res){

    var getProductsBuyersOfTheProduct = `select * from weboget.products_buyer where productid=${+req.params.productID} and userid=${+req.params.userID}`
    client.execute(getProductsBuyersOfTheProduct, [], function(err, result) {
        if(err){
            res.status(404).send({msg:err});
            throw Error('Error in execute getProductsBuyersOfTheProduct: ', err)
        }
        else {
            if(result.rows[0]) { // product already bought by user
                var newAmount = result.rows[0].amount + (+req.params.amount)
                var updateProductsBuyer = `update products_buyer set amount=${newAmount} where productid=${+req.params.productID} and userid=${+req.params.userID}`
                client.execute(updateProductsBuyer, [], function(err, result) {
                    if(err){
                        res.status(404).send({msg:err});
                        throw Error('Error in execute updateProductsBuyer: ', err)
                    }
                    else {
                        console.log('ProductsBuyer updated!')
                        res.end()
                    }
                })
            }
            else { // product never before bought by user
                var addProductsBuyer = `insert into weboget.products_buyer (productid, name, type, price, amount, userid, firstname, lastname) values (${+req.params.productID}, ?, ?, ${+req.params.price}, ${+req.params.amount}, ${+req.params.userID}, ?, ?)`
                client.execute(addProductsBuyer, [req.params.name, req.params.type, req.params.firstName, req.params.lastName], function(err, result) {
                    if(err){
                        res.status(404).send({msg:err});
                        throw Error('Error in execute addProductsBuyer: ', err)
                    }
                    else {
                        console.log('ProductsBuyer inserted!')
                        res.end()
                    }
                })
            }
        }
    })


    var getUsersPurchasesOfTheProduct = `select * from weboget.users_purchase where userid=${+req.params.userID} and productid=${+req.params.productID}`
    client.execute(getUsersPurchasesOfTheProduct, [], function(err, result) {
        if(err){
            res.status(404).send({msg:err});
            throw Error('Error in execute getUsersPurchasesOfTheProduct: ', err)
        }
        else {
            if(result.rows[0]) { // user already bought this product, just update amount
                var newAmount = result.rows[0].amount + (+req.params.amount)
                var updateUsersPurchase = `update users_purchase set amount=${newAmount} where userid=${+req.params.userID} and productid=${+req.params.productID}`
                client.execute(updateUsersPurchase, [], function(err, result) {
                    if(err){
                        res.status(404).send({msg:err});
                        throw Error('Error in execute updateUsersPurchase: ', err)
                    }
                    else {
                        console.log('UsersPurchase updated!')
                        res.end()
                    }
                })
            }
            else { // user never bought this product, add purchase
                var addUsersPurchase = `insert into weboget.users_purchase (userID, firstName, lastName, productID, name, type, price, amount) values (${+req.params.userID},?,?,${+req.params.productID},?,?,${+req.params.price},${+req.params.amount})`
                client.execute(addUsersPurchase, [req.params.firstName,req.params.lastName,req.params.name,req.params.type], function(err, result){
                    if(err){
                        res.status(404).send({msg:err});
                        throw Error('Error in execute addUsersPurchase: ', err)
                    }
                    else {
                        console.log('UsersPurchase added!')
                        res.end()
                    }
                })
            }
        }
    })
})

module.exports = router;