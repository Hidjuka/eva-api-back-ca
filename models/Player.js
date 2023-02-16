const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    idCompte: { type: String, unique: true }
});

module.exports = mongoose.model('Player', playerSchema);