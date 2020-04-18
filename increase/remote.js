var rp = require('request');

var http = {};

http.options = {}

http.get = function(){
    
    http.options.method = 'GET';
     
    return new Promise( (resolve, reject) => {
        rp(http.options, (err, req, body)=>{
            if(err) return reject(err);

            resolve(body);
        })
    });  
};

http.post = function(){
     
    http.options.method = 'POST';

    return new Promise( (resolve, reject) => {
        rp(http.options, (err, req, body)=>{
            if(err) return reject(err);

            resolve(body);
        })
    });  

};

module.exports = http;