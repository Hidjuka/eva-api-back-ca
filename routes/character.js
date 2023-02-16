const express = require('express');
const characterCtrl = require('../controllers/character');
const auth = require('../middleware/auth');
const router = express.Router();

// POST
// Ajoute un personnage
router.post('/', auth, characterCtrl.createCharacter);

// GET
// Affiche un personnage d'un joueur
router.get('/', auth, characterCtrl.getOneCharacter);

// GET
// Liste les personnages d'un joueur
router.get('/', auth, characterCtrl.getCharacterByPlayer);

// PUT
// Modifie un personnages d'un joueur
router.get('/', auth, characterCtrl.updateCharacter);

// DELETE
// Supprime un personnage d'un joueur
router.delete('/', auth, characterCtrl.deleteCharacter);

module.exports = router;
