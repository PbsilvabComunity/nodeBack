const remote = require('./afip');
const config = require('../config');  

module.exports = new remote( config.afip_SVR.host, config.afip_SVR.port );