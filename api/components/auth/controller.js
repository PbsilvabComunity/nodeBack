const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const user = require('../user/controller');

module.exports = function(injectedStore){
    let store = injectedStore;
    const TABLE = 'auth'

    if(!store){
        store = require('../../../store/dummy');
    }

    async function login(email, password) {

        const data = await store.query(TABLE, {email: email});

        if(!data) {
            throw new Error('Informacion invalida');
        }

        return bcrypt.compare(password, data.password)
        .then((eQuals)=>{
            if (eQuals === true) {
                return auth.sign(data);
            } else {
                throw new Error('Informacion invalida');
            }
        });
    }


    async function upsert(data) {
        
        const authData = {
            id: data.id,
            email: data.email
        }

        if(data.password){
            authData.password = await bcrypt.hash(data.password, 5); 
        }

        return store.upsert(TABLE, authData); ;
    }


    return {
        login,
        upsert,
    }
}