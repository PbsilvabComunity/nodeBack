const express = require('express');

const response  = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/',          list);
router.get('/find/:id',  find);
router.get('/platform/:id',  getClientPlatform);


router.post('/',         upsert);
router.put('/',         upsert);

function list(req, res, next) {
    Controller.list()
    .then( (resp) =>{
        response.success(req, res, resp, 200);
    })
    .catch(next);
}

function find(req, res, next) {
    Controller.get(req.params.id)
    .then( (resp) =>{
        response.success(req, res, resp, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
    Controller.upsert(req.body)
    .then( (resp) =>{
        response.success(req, res, resp, 200);
    })
    .catch(next);
}

function getClientPlatform(req, res, next) {
    
    Controller.clientBillingId(req.params.id)
    .then( (resp) =>{
        response.success(req, res, resp, 200);
    })
    .catch(next);

}

module.exports = router;