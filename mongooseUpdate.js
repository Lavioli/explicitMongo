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

    Favorite.findOneAndUpdate({name: "The Essays of Montaigne"},
        {why: "Socratic Wisdom"}, function(err, favorite) {

        if (err || !favorite) {
            console.error("Could not update favorite");
            mongoose.disconnect();
            return;
        }
        console.log("Updated favorite", favorite.name);
        mongoose.disconnect();
    });
});
