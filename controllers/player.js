const Player = require("../models/Player");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const event = require('../events/connexionFail');

// Connexion joueur
exports.login = (req, res, next) => {

    User.findOne({ username: req.body.username })
        .then(player => {

            if (!player) {
                event.emit('connexionFail');
                return res.status(401).json({ message: "Login ou mot de passe incorrecte" });
            }

            bcrypt.compare(req.body.password, player.password)
                .then(valid => {

                    if (!valid) {
                        event.emit('connexionFail');
                        return res.status(401).json({ message: "Login ou mot de passe incorrecte" });
                    }

                    res.status(200).json({

                        idPlayer: player._id,
                        token: jwt.sign(
                            { idPlayer: player._id },
                            'SR1wKQYqlTLVWZSlYkot3xTu0qdZuWDn',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
}