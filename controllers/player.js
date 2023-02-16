const Player = require("../models/Player");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Création compte joueur
exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then(hash => {

            const Player = new Player({
                email: req.body.email,
                password: hash
            });

            user.save()
                .then(() => {
                    res.status(201).json({ message: "Utilisateur créé" })
                    event.emit('sendMail', { email: user.email });
                })
                .catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status(500).json({ error }))
}

// Connexion joueur
exports.login = (req, res, next) => {

    User.findOne({ email: req.body.email })
        .then(player => {

            if (!player) {
                return res.status(401).json({ message: "Login ou mot de passe incorrecte" });
            }

            bcrypt.compare(req.body.password, player.password)
                .then(valid => {

                    if (!valid) {
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