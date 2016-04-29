var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost/favorites', function(err, db) {
    var collection,
        favorite;

    if (err) {
        console.error(err);
        db.close();
        return;
    }
    console.log('Connected to MongoDB database');

    collection = db.collection('favorites');
    favorite = {
        name: "the essays of Montaigne",
        why: "his experience"
    };

    collection.findOne({name: "The Essays of Montaigne"}, function(err, favorite) {
        if (err || !favorite) {
            console.error("Could not read favorite");
            db.close();
            return;
        }
        console.log("Read favorite:", favorite.name);
        console.log(favorite.why);
        db.close();
    });
});
