const requestHandler = require('./remote');
const config         = require('../config');
const store          = require('../store/mysql');
var increase = {};

if (config.serverMode == 'production') {
    increase.url    = config.increase.production_host;
    increase.token  = config.increase.production_token;
} else {
    increase.url    = config.increase.staging_host;
    increase.token  = config.increase.staging_token;
}

increase.listAllCustomers  = async function(){

    setupOptions('/customers/');

    customers = await requestHandler.get();
    
    return customers;
}

increase.findCustomer  = async function(id){
    
    setupOptions(`/customers/${id}`);

    customers = await requestHandler.get();

    return customers;
}

increase.createnewCustomer = async function(params){
    
    setupOptions(`/customers`);
    setupParams(params);

    customers = await requestHandler.post();

    return customers;
}

increase.findCustomerSubscriptions  = async function(customer_id){
    
    setupOptions(`/subscriptions?customer_id=${customer_id}`);

    customers = await requestHandler.get();

    return customers;
}

increase.findCustomerPayments  = async function(customer_id){
    
    setupOptions(`/payments?customer_id=${customer_id}`);

    customers = await requestHandler.get();

    return customers;
}



increase.addCustomerPaymentMethod = async function(id, params){

    setupOptions(`/customers/${id}/payment_methods`);

    setupParams(params);

    customerPaymentMethod = await requestHandler.post();

    return customerPaymentMethod;

}

increase.sync                   = async function(){

    let allCustomers = await this.listAllCustomers();

    if(allCustomers && allCustomers.data){
        allCustomers = allCustomers.data;
    }

    allCustomers.forEach(element => {
        this.saveLocalAccount(element);
    });
}

increase.saveLocalAccount        =   async function(account){

    let increaseAccount = {
        id:         account.id,
        external_id:   account.external_id
    }

    store.upsert('increase_accounts', increaseAccount);
    
}


function setupOptions(url){
    requestHandler.options = {
        uri:increase.url+url,
        headers: {
            'Authorization': increase.token,
            'Content-Type':  'application/json'
        },
        json:true
    }
}

function setupParams(params){
    requestHandler.options.qs = params;
}

module.exports = increase;