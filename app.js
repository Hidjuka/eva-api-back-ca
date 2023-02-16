const express = require('express');
const mongoose = require('mongoose');
const characterRoutes = require('./routes/character');
const playerRoutes = require('./routes/player');
const adminRoutes = require('./routes/admin');
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');

mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://admin:admin@cluster0.ij0ogsd.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use('/api/character', characterRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/admin', adminRoutes);

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

module.exports = app;