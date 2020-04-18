const Afip = require('@afipsdk/afip.js');
const config = require('../../config');

let AfipInstance = new Afip({CUIT: config.afip_SVR.cuit, cert:'afippk.pem', key:'servidor.key'});


const ctrl = require('./controller');


module.exports = ctrl(AfipInstance);