const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, client) => {
    if (err) return console.log(err);
    
    let db = client.db('mean');
    closure(db);
    });
    };

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/products', (req, res) => {
        connection((db) => {
            db.collection('products')
                .find()
                .toArray()
                .then((products) => {
                    response.data = products;
                    res.json(response);
                })
                .catch((err) => {
                    sendError(err, res);
                });
        });
    
});

router.post('/product', function(req, res){
    var product = req.body;
    connection((db) => {
        db.collection('products')
            .insertOne(product, function(err,product) {
                if(err){
                    res.send(err);
                }
                res.json(product);
            });
    });
});

router.delete('/product/:_id', function(req, res){
    var product = {"_id" : new ObjectID(req.params._id) };
    connection((db) => {
        console.log(product);
        db.collection('products')
            .deleteOne(product, function(err, obj) {
                if (err) throw err;
                console.log("1 document deleted");
            });
    });
});

router.put('/product', function(req, res){
    var product = {"_id" : new ObjectID(req.body._id) };
    connection((db) => {
        db.collection('products') 
            .findOneAndUpdate(product, {$set: {"name":req.body.name , "code": req.body.code, "price": req.body.price, "quantity": req.body.quantity, "category":req.body.category}} , { new:true }, (err,todo) => {
                if(err){
                return res.json({'success':false,'message':'Some Error','error':err});
                }
                console.log(todo);
                return res.json({'success':true,'message':'Updated successfully',todo});
              });
    });

});

module.exports = router;