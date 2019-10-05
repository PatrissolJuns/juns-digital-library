const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    name: String,
    audioList: [String]
}, { versionKey: false });

mongoose.model('Playlist', PlaylistSchema);

module.exports = mongoose.model('Playlist');


// Virtual property

/*
personSchema.virtual('fullName').get(function () {
    return this.name.first + ' ' + this.name.last;
});*/
