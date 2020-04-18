const db = {
    'user': [
        {
            id:'1',
            name:'Pedro',
            client_id:'1'
        }
    ],
    'clients': [
        {
            id: '1',
            name: 'Ecom',
        }
    ],
    'clients_payment_platform': [
        {
            client_id   : '1',
            platform    : 'increase',
            customer_id : null,
        }
    ],
    'billing_info': [
        {
            id: '1',
            client_id: '1',
            doc_type:  'DNI',
            doc_number: '95958279'
        }
    ],
    'service_provider': [
        {
            id: "1",
            name: "Ecom",
        }
    ],
    'services': [
        {
            id:"1",
            service_provider_id:"1",
            name  : "Ecom Gestion",
        }
    ],
    "plans": [
        {
            id: "1",
            name: "Plan Inicial",
            service_id: "1",
        },
        {
            id: "2",
            name: "Plan Profesional",
            service_id: "1",
        },
    ],
    "client_plans": [
        {
            client_id:              '1',
            plan_id:                '1',
            subscription_id:        null,
            subscription_status:    null
        }
    ],
    "paymenys": [
        {
            "id": "00000000-0000-0000-0000-000000000001",
            "status": "processing",
            "amount": "26.26",
            "currency": "ARS",
            "payment_method": {
              "id": "00000000-0000-0000-0000-000000000001",
              "external_id": null,
              "data": {
                "type": "cbu",
                "country": "ARG",
                "number": "19101134**4200"
              },
              "created_at": "2020-04-03T17:03:07-03:00"
            },
            "events": [],
            "created_at": "2020-04-03T17:03:07-03:00",
            "rejection_code": null,
            "rejection_type": null,
            "rejection_description": null,
            "paid_at": null
        }
    ],
    "increase_accounts": [
        {
            "id": "f80eb1e6-3e0e-440a-b6c0-78be160de3aa",
            "external_id": "1",
            "email": "pbsilvab@gmail.com",
            "language": "ES",
            "timezone": "Buenos Aires",
            "first_name": null,
            "last_name": null,
            "billing_info": {},
            "created_at": "2020-03-20T16:45:17-03:00"
        }
    ]    
};

async function list(table) {
    return db[table] || [];
}

async function get(table, id) {
    let collection = await list(table);

    return collection.filter(item => item.id === id)[0] || null;
}

async function upsert(table, data) {

    if (!db[table]) {
        db[table] = [];
    }

    db[table].push(data); 
}

async function remove(table, id) {
    return true;
}

async function query(table, q, join) {
    let listing = await list(table);
    let keys = Object.keys(q);
    let key = keys[0];

    return listing.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}