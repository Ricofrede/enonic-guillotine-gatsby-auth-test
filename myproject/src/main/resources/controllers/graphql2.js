const guillotineLib = require('/lib/guillotine');
const graphqlPlaygroundLib = require('/lib/graphql-playground');
const authLib = require('/lib/xp/auth')
const page = require('./info.js');

//──────────────────────────────────────────────────────────────────────────────
// Constants
//──────────────────────────────────────────────────────────────────────────────
const CORS_HEADERS = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Origin': '*'
};

const SCHEMA = guillotineLib.createSchema()

//──────────────────────────────────────────────────────────────────────────────
// Methods
//──────────────────────────────────────────────────────────────────────────────
exports.options = function () {
    return {
        contentType: 'text/plain;charset=utf-8',
        headers: CORS_HEADERS
    };
};

exports.get = function (req) {
    if (!authLib.hasRole('system.admin')) return

    if (req.webSocket) {
        return {
            webSocket: {
                data: guillotineLib.createWebSocketData(req),
                subProtocols: ['graphql-ws']
            }
        };
    }

    let body = graphqlPlaygroundLib.render();
    return {
        contentType: 'text/html; charset=utf-8',
        body: body
    };
};

exports.post = function (req) {
    /* Expecting a request body of the format:
    body: {
        user: 'user',
        password: 'password',
        query: 'query'
        variables: {}
    } */
    let input = JSON.parse(req.body);
    
    function checkLogin(user, password){
        const login = authLib.login({
            user: user,
            password: password,
            scope: 'REQUEST'
        });

        return login
    }

    if (!input.user || !input.password ) return 
    const login = checkLogin(input.user,input.password)
    if (!login.authenticated) return

    const params = {
        query: input.query,
        variables: input.variables
    }

    return {
        contentType: 'application/json',
        headers: CORS_HEADERS,
        body: guillotineLib.execute(params)
    };
};

exports.webSocketEvent = guillotineLib.initWebSockets();
