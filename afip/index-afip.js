const express = require('express');
const config  = require('../config');
const app = express();
const bodyParser= require('body-parser');

const afipSrv = require('./client/network')

const errors     = require('../network/errors');

app.use(bodyParser.json());

app.use('/', afipSrv);

app.use(errors);

app.listen(config.afip_SVR.port, function(){
    console.log('Servicio de AFIP escuchando en puerto ', config.afip_SVR.port );
});