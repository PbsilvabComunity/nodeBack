const store = require('../../../store/mysql');
const remoteAfip = require('../../../store/remote-afip');


const ctrl = require('./controller');
module.exports = ctrl(store, remoteAfip);