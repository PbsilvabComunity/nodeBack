const nanoid = require('nanoid/async'); 

module.exports = function(injectedStore){
    let store = injectedStore;
    const TABLE = 'services'

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
       
        const service = {
            name: body.name,
            client_id:  body.client_id,
        }

        if (body.id){
            service.id = body.id 
        } else {
            service.id = await nanoid();
        }
        
        console.log(service);

        return store.upsert(TABLE, service);
    }
    
    return {
        list,
        get,
        upsert
    };
}