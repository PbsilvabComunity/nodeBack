const express   = require('express');
const bodyParser= require('body-parser');

const config    = require('../config.js');
const clients   = require('./components/clients/network');
const billing   = require('./components/billingInfo/network');
const errors    = require('../network/errors');

const app = express();
app.use(bodyParser.json());

//ROUTER

app.use('/api/clients', clients);
app.use('/api/clients/info', billing);

app.use(errors);

app.listen(config.clients.port, ()=>{
    console.log('clients escuchando en el puerto ', config.clients.port);
});

