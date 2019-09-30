const mongoose = require('mongoose');

const AudioSchema = new mongoose.Schema({
    artist: String,
    album: String,
    belongToPlaylist: [String],
    cover: String,
    duration: String,
    isBookmark: Boolean,
    track: String,
    year: String
});

mongoose.model('Audio', AudioSchema);

module.exports = mongoose.model('Audio');