module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    serverMode: process.env.SERVERMODE || 'staggin',
    api: {
        port: process.env.API_PORT || 3000
    },
    clients: {
        port: process.env.API_PORT || 3002
    },
    services: {
        port: process.env.API_PORT || 3003
    },
    billing: {
        port: process.env.API_PORT || 3004
    },
    afip_SVR: {
        port: process.env.API_PORT || 3005,
        cuit: process.env.AFIP_CUIT || '20959582794',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret!'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || 'root',
        database: process.env.MYSQL_DB || 'ecombilling',
    },
    mysql_service: {
        port: process.env.MYSQL_SVR_PORT  || 3001,
        host: process.env.MYSQL_SVR_HOST  || 'localhost'
    },
    increase: {
        production_host:  'https://gateway.increase.app/pay/public/v1',
        production_token: 'Bearer 4MGty3bNALIHBsNDJ1h5uJEgsYc8gPLY2dnoTvXVNjOzPy196y7omHgWA6mRWxYF',
        staging_host:  'https://gateway.staging.increase.app/pay/public/v1/',
        staging_token: 'Bearer 68R84up64SPdNUKyJsrMLLXnblRxWotM6G66AKnBJz6ja9ZyFD5bY8RNPj7tx5TI',
    }
}