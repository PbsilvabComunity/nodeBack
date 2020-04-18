const nanoid = require('nanoid/async'); 

module.exports = function(injectedStore){
    let store = injectedStore;
    const TABLE = 'plans'

    if(!store){
        store = require('../../../store/dummy');
    }

    async function list() {
        users = await store.list(TABLE);
        return users;
    }

    function get(id) {
        return store.get(TABLE, id);
    }

    async function upsert(body){
       
        const plans = {
            name: body.name,
            service_id: body.service_id
        }

        if (body.id){
            plans.id = body.id 
        } else {
            plans.id = await nanoid();
        }
        
        return store.upsert(TABLE, plans);
    }

    async function newSubscription(plan_id, body) {

        if(!body.client_id) {
            throw new Error('el cliente enviado es incorrecto');
        }

        if(!plan_id) {
            throw new Error('Debe enviar un plan para hacer el registro');
        }

        const client_service = {
            client_id:  body.client_id,
            plan_id:    plan_id
        }

        return store.upsert("client_" + TABLE, client_service);

    }

    async function findClientSubscription(client_id){
        
        const query = {client_id: client_id};

        return store.query('client_'+ TABLE, query);
    }

    
    return {
        list,
        get,
        upsert,
        newSubscription,
        findClientSubscription
    };
}