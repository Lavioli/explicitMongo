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

    favoriteToDelete = {
        name: "the essays of Montaigne"
    };

    collection.findAndRemove(favoriteToDelete, null, function(err, result) {
         var deletedFavorite = result.value;
         if (!deletedFavorite || err) {
             console.error("Could not delete this favorite");
             db.close();
             return;
         }
         console.log("Deleted favorite", deletedFavorite.name);
         db.close();
    });
});
