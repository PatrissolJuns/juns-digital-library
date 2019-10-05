const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
    name: String,
    parentFolder: [String]
}, { versionKey: false });

mongoose.model('Folder', FolderSchema);

module.exports = mongoose.model('Folder');