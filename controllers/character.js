const Character = require("../models/Character");

// Ajoute un personnage
exports.createCharacter = (req, res, next) => {

    const character = new Character({
        ...req.body,
        idPlayer: req.auth.idPlayer
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

    const characterObject = req.character ? {
        ...JSON.parse(req.body.character)
    } : { ...req.body };

    delete characterObject._idPlayer;

    Character.find({ idPlayer: req.auth.idPlayer })
        .then((characters) => {
            characters.findOne({ pseudo: req.params.pseudo, class: req.params.class })
                .then((character) => {
                    character.updateOne({ pseudo: req.params.pseudo, class: req.params.class }, { ...characterObject, pseudo: req.params.pseudo, class: req.params.class })
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