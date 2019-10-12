const mongoose = require('mongoose');

const AudioSchema = new mongoose.Schema({
    artist: String,
    album: String,
    cover: String,
    duration: String,
    isBookmark: Boolean,
    musicSrc: String,
    size: Number,
    track: String,
    year: String
}, { versionKey: false });

mongoose.model('Audio', AudioSchema);

module.exports = mongoose.model('Audio');