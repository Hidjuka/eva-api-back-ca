const Character = require("../models/Character");
const Player = require("../models/Player");
const axios = require('axios');

// Ajoute un personnage
exports.createCharacter = (req, res, next) => {

    if ( req.auth.idCompte == null )
    {
        axios.get('https://backend-tp-final-nodejs.agence-pixi.fr/wow/compte/check', {
            params: {
                username: req.body.username,
                password: req.body.password
            }
          })
          .then(function (response) {
            idCompte = response;
            req.auth.idCompte = idCompte
          })
          .catch(function (error) {
            console.log(error);
          });  
    }
    else
    {
        idCompte = req.body.idCompte
    }
    
    const character = new Character({
        ...req.body,
        idCompte: idCompte
    });

    character.save()
        .then(() => {
            res.status(201).json({ success: 'Personnage créer' })
        })
        .catch(error => {
            res.status(400).json({ error })
        })
};

// Affiche un personnage d'un joueur
exports.getOneCharacter = (req, res, next) => {
    Character.find({ idPlayer: req.auth.idPlayer })
        .then((characters) => {
            characters.findOne({ pseudo: req.params.pseudo, class: req.params.class })
                .then(character => res.status(200).json(character))
                .catch(error => res.status(400).json({ error }))
        })
}

// Liste les personnages d'un joueur
exports.getCharacterByPlayer = (req, res, next) => {
    Character.find({ idPlayer: req.auth.idPlayer })
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json({ error }));
}

// Modifie un personnages d'un joueur
exports.updateCharacter = (req, res, next) => {

    Character.find({ idPlayer: req.auth.idPlayer })
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
    Character.find({ idPlayer: req.auth.idPlayer })
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