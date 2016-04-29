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
        name: "The Essays of Montaigne",
        why: "his experience"
    };
    collection.insert(favorite, function(err, result) {
            if (err) {
                console.error("Could not create favorite", favorite.name);
                console.log(err);
                db.close();
                return;
            }
            console.log("Created favorite", favorite.name);
            db.close();
    });
});
