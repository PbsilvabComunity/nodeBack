const nanoid = require('nanoid/async'); 

module.exports = function(injectedStore){
    let store = injectedStore;
    const TABLE = 'billing_info'

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
       
        const billingInfo = {
            client_id  : body.client_id,
            doc_type   : body.doc_type,
            doc_number : body.doc_number
        }

        if (body.id){
            billingInfo.id = body.id 
        } else {
            billingInfo.id = await nanoid();
        }
        
        return store.upsert(TABLE, billingInfo);
    }
    
    return {
        list,
        get,
        upsert
    };
}