'use strict';
const https = require('https');
const getPublickeyOptions = {
    hostname: 'captcha.irisdev.net',
    port: 443,
    path: '/publickey',
    method: 'GET'
};
const postRequestVerificationOptions = {
    hostname: 'captcha.irisdev.net',
    port: 443,
    path: '/check',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      }
};
/**
 * Create a new instance of IrisCaptcha
 *
 * @param {Object} instanceConfig The default config for the instance
 *  {
 *      provider    default https://captcha.irisdev.net
 *      secret      default -
 *      publicKey   default - , available at https://captcha.irisdev.net/publickey
 *  }
 */
function IrisCaptcha(instanceConfig) {
    this.defaults = instanceConfig;
}


IrisCaptcha.prototype.create = async function(){
    await this.initSecret();
}

//
IrisCaptcha.prototype.loadPublicKey = function(){
    let request = https.request(getPublickeyOptions,res=>{
        res.sta
    })
}
IrisCaptcha.prototype.verifyPublicKey = function(){}

//init the secret and checks validity of it offline
IrisCaptcha.prototype.initSecret = function(){
    if (this.defaults.secret === undefined)  {
        throw new Error("the secret is undefined.");
    }
    if (typeof this.defaults.secret != "string" )  {
        throw new Error("the type of secret must be string.");
    }

    let ss = this.defaults.secret.split("0x");
    if (ss.length != 2) {
        throw new Error("invalid Secret format.");
    }
    this.appuid = "0x"+ss[1];
    this.secret = ss[0];
    this.fullSecret= this.defaults.secret;
}

// Exported
IrisCaptcha.prototype.GetJs = async function(){
    return `<script src="https://captcha.irisdev.net/js/${this.appuid}"></script>`;
}
IrisCaptcha.prototype.Validate = async function(userResponse,remoteip){
    
    if (typeof userResponse != "string" || typeof remoteip != "string")  {
        throw new Error("the type of userResponse and remoteip must be string.")
    }


}
IrisCaptcha.prototype.Create = function(){}