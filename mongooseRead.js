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

    Favorite.findOne({name: "As You Like It"}, function(err, favorite) {
        if (err || !favorite) {
            console.error("Could not create favorite");
            mongoose.disconnect();
            return;
        }
        console.log("Read favorite", favorite.name);
        console.log(favorite.why);
        mongoose.disconnect();
    });
});
