const express = require('express');
const config  = require('../config');
const app = express();
const bodyParser= require('body-parser');

const afipSrv = require('./client/network')

const errors     = require('../network/errors');

app.use(bodyParser.json());


app.use('/api/afip', afipSrv);


app.use(errors);

app.listen(config.afip_SVR.port, function(){
    console.log('Servicio de afip escuchando en puerto ', config.afip_SVR.port );
});