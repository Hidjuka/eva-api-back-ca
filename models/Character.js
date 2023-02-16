const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
    pseudo: { type: String, required: true },
    class: { type: String, required: true },
    level: { type: Number, required: true },
    idPlayer: { type: Number, required: true }
});

module.exports = mongoose.model('Character', characterSchema);