const express   = require('express');
const bodyParser= require('body-parser');

const config    = require('../config.js');
const services   = require('./components/services/network');
const plans   = require('./components/plans/network');
const errors    = require('../network/errors');

const app = express();
app.use(bodyParser.json());

//ROUTER
app.use('/api/services', services);
app.use('/api/services/plans', plans);

app.use(errors);

app.listen(config.services.port, ()=>{
    console.log('Servicio services escuchando en el puerto ', config.services.port);
});