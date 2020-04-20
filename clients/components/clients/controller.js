const nanoid = require('nanoid/async'); 
const billingInfo = require('../billingInfo/index');

module.exports = function(injectedStore){
    let store = injectedStore;
    const TABLE = 'contacts'

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
            company_name: body.company_name
        }

        if (body.id){
            client.id = body.id 
        } else {
            client.id = await nanoid();
        }

        let legalInfo = null;

        if (body.cuit) {
            
             legalInfo = await billingInfo.search_info(body.cuit);
        
            if (legalInfo) {
                legalInfo.contact_id = client.id;
            }
            if (legalInfo.name) {
                client.name = legalInfo.name;
            }
            if (legalInfo.last_name) {
                client.last_name = legalInfo.last_name;
            }    
        }

        let contact_upsert = await store.upsert(TABLE, client);

        if (legalInfo) {
            billingInfo.upsert(legalInfo);
        }
        
        return contact_upsert
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