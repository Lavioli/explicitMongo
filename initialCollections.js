var MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost/', function(err, db) {

    var collection;

    if (err) {
        console.error(err);
        db.close();
        return;
    }
    console.log('Connected to MongoDB database');

    collection = db.collection('favorites');
    db.close();
});
