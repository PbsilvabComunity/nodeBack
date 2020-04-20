const nanoid = require('nanoid/async'); 
const auth  = require('../auth');

module.exports = function(injectedStore){
    let store = injectedStore;
    const TABLE = 'users'

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
       
        const user = {
            name: body.name,
            email: body.email
        }

        if (body.id){
            user.id = body.id 
        } else {
            user.id = await nanoid();
        }
        
        if (body.password) {
            await auth.upsert({
                id:   user.id,
                email: body.email,
                password:  body.password
            });
        }

        return store.upsert(TABLE, user);
    }

    return {
        list,
        get,
        upsert
    };
}