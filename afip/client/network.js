const express = require('express');

const response  = require('../../network/response');

const router = express.Router();

const Controller = require('./index');

const Validator  = require('./middleware/validator');

router.get('/search/:cuit', search_cuit);

router.post('/new/cae', Validator() , new_cae);


function search_cuit(req, res, next) {

    Controller.search_cuit(req.params.cuit)
    .then((resp)=>{
        response.success(req, res, resp, 200);
    })
    .catch(next);

}   

function new_cae(req, res, next) {

    resp = Controller.generateCae(req.body)
    .then((resp)=>{
        response.success(req, res, resp, 200);
    })
    .catch(next);

}   


module.exports = router;