const event = require('events');
let evenement = new event.EventEmitter();

evenement.on('connexionFail', function (params) {

    let date = new Date();
    let dateStr =
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("00" + date.getDate()).slice(-2) + "-" +
        date.getFullYear() + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);

    console.log(dateStr, "tentative de connexion invalide");

});

module.exports = evenement;