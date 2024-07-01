import {OktaAuth} from '@okta/okta-auth-js'


const oktaAuth = new OktaAuth({
    issuer: 'https://dev-85830223.okta.com/oauth2/default',
    clientId: '0oai2bshvlpGaPILc5d7',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email']
});


export default {
    oidc: {
        oktaAuth,
       // baseUrl:'https://dev-85830223.okta.com',
        clientId: '0oai2bshvlpGaPILc5d7',
        //redirectUri: window.location.origin+'/callback',
        redirectUri: 'http://localhost:4200/login/callback',
        // authParams:{
        // issuer: 'https://dev-85830223.okta.com/oauth2/default',
        // scopes: ['openid', 'profile', 'email']
        // }
         issuer: 'https://dev-85830223.okta.com/oauth2/default',
         scopes: ['openid', 'profile', 'email']
        
    }
}