const express = require('express');
const playerCtrl = require('../controllers/player');
const auth = require('../middleware/auth');
const router = express.Router();

// POST
// Création compte joueur
router.post('/register', playerCtrl.signup);

// POST
// Connexion joueur
router.post('/login', playerCtrl.login);

module.exports = router;