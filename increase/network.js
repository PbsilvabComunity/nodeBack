const express = require('express');

const increase    = require('./remote-increase');
const response   = require('../network/response');

const router = express.Router();

router.get('/',              listClients);
router.get('/:client_id',    findClient);
router.get('/:client_id/subscriptions',    findClientSubscriptions);
router.get('/:client_id/payments',    findClientPayments);
router.get('/sync/customers',    sync_customers);



async function listClients(req, res, next){

    let listOfClients = await increase.listAllCustomers();

    response.success(req, res, listOfClients, 200);

}

async function findClient(req, res, next){

    let client = await increase.findCustomer(req.params.client_id);

    response.success(req, res, client, 200);
    
}

async function findClientSubscriptions(req, res, next) {
    
    let client = await increase.findCustomerSubscriptions(req.params.client_id);

    response.success(req, res, client, 200);
}


async function findClientPayments(req, res, next) {
    
    let client = await increase.findCustomerPayments(req.params.client_id);

    response.success(req, res, client, 200);
}

function sync_customers(req, res, next){


    let client = increase.sync();

    response.success(req, res, client, 200);
}

module.exports = router;