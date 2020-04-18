const express   = require('express');
const bodyParser= require('body-parser');

const config    = require('../config.js');
const IncreaseNetwork   = require('./network');
const errors    = require('../network/errors');

const app = express();

app.use(bodyParser.json());

//ROUTER
app.use('/api/clients', IncreaseNetwork);

app.use(errors);

app.listen(config.billing.port, ()=>{
    console.log('Servicio billing escuchando en el puerto ', config.billing.port);
});