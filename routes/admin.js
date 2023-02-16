const express = require('express');
const adminCtrl = require('../controllers/admin');
const auth = require('../middleware/auth');
const router = express.Router();

// POST
// Création compte joueur
router.post('/register', adminCtrl.signup);

// POST
// Connexion admin
router.post('/login', adminCtrl.login);

module.exports = router;