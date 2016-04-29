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
    name: "the essays of Montaigne"
};

newFavorite = {
    $set: {why: "his imagination"}
};

    collection.findAndModify(favorite, null, newFavorite, function(err, result) {
         var changedFavorite = result.value;
         if (!changedFavorite || err) {
             console.error("Could not update this favorite");
             db.close();
             return;
         }
         console.log("Updated favorite", changedFavorite.name);
         db.close();
    });
});
