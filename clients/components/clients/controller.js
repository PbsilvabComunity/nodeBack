const nanoid = require('nanoid/async'); 

module.exports = function(injectedStore){
    let store = injectedStore;
    const TABLE = 'clients'

    if(!store){
        store = require('../../../store/mysql');
    }

    async function list() {
        clients = await store.list(TABLE);
        return clients;
    }

    function get(id) {
        return store.get(TABLE, id);
    }

    async function upsert(body){
       
        const client = {
            name: body.name
        }

        if (body.id){
            client.id = body.id 
        } else {
            client.id = await nanoid();
        }
        
        return store.upsert(TABLE, client);
    }

    async function clientBillingId(id) {
        
        let  billingPlatform = await store.query(TABLE + '_payment_platform', {client_id: id});

        if (billingPlatform && !billingPlatform.customer_id) {
            updateClientPlatform(billingPlatform);
            billingPlatform = await clientBillingId(id);
        }

        return billingPlatform;
    }

    async function updateClientPlatform(localAccount) {

        increaseAccount = await  store.query('increase_accounts', {external_id: localAccount.client_id });

        if (!increaseAccount) {
            return false;
        }   

        localAccount.customer_id = increaseAccount.id; 

        storedAccount = await store.upsert(TABLE + '_payment_platform', localAccount );

        return storedAccount;
    }

    
    return {
        list,
        get,
        upsert,
        clientBillingId
    };
}