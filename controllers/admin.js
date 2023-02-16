const Admin = require("../models/Admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Création compte admin
exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then(hash => {

            const Admin = new Admin({
                email: req.body.email,
                password: hash
            });

            user.save()
                .then(() => {
                    res.status(201).json({ message: "Utilisateur créé" })
                })
                .catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status(500).json({ error }))
}

// Connexion admin
exports.login = (req, res, next) => {

    User.findOne({ email: req.body.email })
        .then(admin => {

            if (!admin) {
                return res.status(401).json({ message: "Login ou mot de passe incorrecte" });
            }

            bcrypt.compare(req.body.password, admin.password)
                .then(valid => {

                    if (!valid) {
                        return res.status(401).json({ message: "Login ou mot de passe incorrecte" });
                    }

                    res.status(200).json({

                        idAdmin: admin._id,
                        adminToken: jwt.sign(
                            { idAdmin: admin._id },
                            'SR1wKQYqlTLVWZSlYkot3xTu0qdZuWDn',
                            { expiresIn: '365 days' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
}