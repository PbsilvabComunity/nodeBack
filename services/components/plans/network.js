const express = require('express');

const response  = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/',          list);
router.get('/find/:id',  find);
router.post('/',         upsert);
router.put('/',         upsert);


//client subscribe
router.get('/subscription/:client_id',     client_subscriptions);
router.post('/subscribe/:plan_id',         client_suscribe);


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

function client_suscribe(req, res, next) {
    Controller.newSubscription(req.params.plan_id, req.body)
    .then( (resp) =>{
        response.success(req, res, resp, 200);
    })
    .catch(next);
}

function client_subscriptions(req, res, next) {
    Controller.findClientSubscription(req.params.client_id)
    .then( (resp) =>{
        response.success(req, res, resp, 200);
    })
    .catch(next);
}

module.exports = router;