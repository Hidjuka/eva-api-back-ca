const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const adminToken = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(adminToken, 'SR1wKQYqlTLVWZSlYkot3xTu0qdZuWDn');
        const idAdmin = decodedToken.idAdmin;

        req.auth = {
            idAdmin: idAdmin
        };

        next();

    } catch(error) {
        res.status(401).json({ error });
    }
};