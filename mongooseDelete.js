var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/favorites');

mongoose.connection.on('error', function(err) {
    console.error('Could not connect.  Error:', err);
});

mongoose.connection.once('open', function() {
   var favoriteSchema = mongoose.Schema({
       name: {type: String, unique: true},
       why: String
    });

    var Favorite = mongoose.model('Favorite', favoriteSchema);

    Favorite.findOneAndRemove({name: "The Essays of Montaigne"}, function(err, favorite) {

        if (err || !favorite) {
            console.error("Could not delete favorite");
            mongoose.disconnect();
            return;
        }
        console.log("Deleted favorite", favorite.name);
        mongoose.disconnect();
    });
});
