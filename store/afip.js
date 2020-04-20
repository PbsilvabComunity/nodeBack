const request  = require('request');

function RemoteAfipConn(host, port) {

    const URL = 'http://'+host +':'+port;

    function search(cuit) {
        return req('GET', `search/${cuit}`);
    }
    
    function generate_cae(data) {
        return req('GET', 'new/cae', data);
    }


    function req(method, table, data) {
        let url = URL + '/' + table;
        body    = '';
        if(data){
            body = data;
        }
        console.log(url);
        return new Promise((resolve, reject) => {
            
            console.log(body);

            request({
                method:method,
                headers:{
                    'content-type': 'application/json'
                },
                url:url,
                body:body
            }, (err, req, body)=>{

                if(err) {
                    console.log('error con la db remota', err);
                    return reject(err.message);
                }

                const resp = JSON.parse(body);

                return resolve(resp);
            });
        });
    }


    return {
        search,
        generate_cae
    }
}


module.exports = RemoteAfipConn;