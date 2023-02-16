const Character = require("../models/Character");
const Player = require("../models/Player");
const axios = require('axios');
const availableClass = ['guerrier', 'paladin', 'chasseur', 'voleur', 'prêtre', 'chaman', 'mage', 'démoniste', 'moine', 'druide', 'chasseur de démons', 'chevalier de la mort', 'évocateur'];

// Ajoute un personnage avec un compte vierge
exports.createFirstCharacter = (req, res, next) => {

    if (!checkClass(req.body.class)) {
        return console.log('Classe inconnue');
    }

    axios.get('https://backend-tp-final-nodejs.agence-pixi.fr/wow/compte/check', {
        params: {
            username: req.body.username,
            password: req.body.password
        }
    })
        .then(function (response) {
            let idCompte = response;
            req.auth.idCompte = idCompte
            console.log(idCompte)

            const character = new Character({
                pseudo: req.body.pseudo,
                class: req.body.class,
                level: req.body.level,
                idCompte: idCompte
            });
            saveCharacter(character)
        })
        .catch(function (error) {
            console.log(error);
        });
}

// Ajoute un personnage
exports.createCharacter = (req, res, next) => {

    if (!checkClass(req.body.class)) {
        return console.log('Classe inconnue');
    }

    const character = new Character({
        pseudo: req.body.pseudo,
        class: req.body.class,
        level: req.body.level,
        idCompte: req.body.idCompte
    });

    saveCharacter(character)
};

// Affiche un personnage d'un joueur
exports.getOneCharacter = (req, res, next) => {
    Character.find({ idCompte: req.auth.idCompte })
        .then((characters) => {
            characters.findOne({ pseudo: req.params.pseudo, class: req.params.class })
                .then(character => res.status(200).json(character))
                .catch(error => res.status(400).json({ error }))
        })
}

// Liste les personnages d'un joueur
exports.getCharacterByPlayer = (req, res, next) => {
    Character.find({ idCompte: req.auth.idCompte })
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json({ error }));
}

// Modifie un personnages d'un joueur
exports.updateCharacter = (req, res, next) => {

    Character.find({ idCompte: req.auth.idCompte })
        .then((characters) => {
            characters.findOne({ pseudo: req.params.pseudo, class: req.params.class })
                .then((character) => {
                    character.updateOne({ pseudo: req.params.pseudo, class: req.params.class })
                        .then(() => res.status(200).json({ success: 'Personnage modifé' }))
                        .catch(error => res.status(400).json({ error }))
                })
                .catch(error => res.status(400).json({ error }))
        })
}

// Supprime un personnage d'un joueur
exports.deleteCharacter = (req, res, next) => {
    Character.find({ idCompte: req.auth.idCompte })
        .then((characters) => {
            characters.findOne({ pseudo: req.params.pseudo, class: req.params.class })
                .then((character) => {
                    character.deleteOne({ pseudo: req.params.pseudo, class: req.params.class })
                        .then(() => res.status(200).json({ success: 'Personnage supprimé' }))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch((error) => {
                    res.status(400).json({ error });
                });
        })
}

function checkClass(classToCheck) {
    if (!(availableClass.find(e => req.body.class))) {
        return false;
    }
}

function saveCharacter(character) {
    character.save()
        .then(() => {
            res.status(201).json({ success: 'Personnage créer' })
        })
        .catch(error => {
            res.status(400).json({ error })
        })
}