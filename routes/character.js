const express = require('express');
const characterCtrl = require('../controllers/character');
const auth = require('../middleware/auth');
const router = express.Router();

// POST
// Ajoute un personnage avec un compte vierge
router.post('/createFisrtCharacter', auth, characterCtrl.createFirstCharacter);

// POST
// Ajoute un personnage
router.post('/createCharacter', auth, characterCtrl.createCharacter);

// GET
// Affiche un personnage d'un joueur
router.get('/getOneCharacter', auth, characterCtrl.getOneCharacter);

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
