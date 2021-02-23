'use strict';
const { rejects } = require('assert');
const https = require('https');
const jwt = require('jsonwebtoken');
const { resolve } = require('path');

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
 *      method      [signature,request]
 *  }
 */
function IrisCaptcha(instanceConfig) {
    this.defaults = instanceConfig;
    this.create();
}

//
IrisCaptcha.prototype.create = async function(){
    await this.initSecret();
}

//OK
IrisCaptcha.prototype.loadPublicKey = function(){
    let publicKey = "";
    return new Promise((resolve,rejects)=>{
        let conn =  https.request(getPublickeyOptions,res=>{
            res.on('data', (d) => {
                publicKey += Buffer.from(d).toString();
                });
            res.on('close',()=>{
                this.publicKey = publicKey;
                console.log("Done");
                resolve(publicKey);
            })
            res.on('error',(err)=>{
                rejects(err);
            })
            })
        conn.end();
    })
    

}

//
IrisCaptcha.prototype.verifyPublicKey = function(){}

//init the secret and checks validity of it offline
IrisCaptcha.prototype.initSecret = async function(){
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

// validate user response with signature
IrisCaptcha.prototype.validateSig = function(token){
    // jwt.verify(token, cert, function(err, decoded) {
    //     console.log(decoded.foo) // bar
    //   });
    return new Promise((resolve,rejects)=>{
        if (this.publicKey === undefined || !this.publicKey  ) {
            rejects( new Error("Iris-Captcha Publickey not loaded yet."));
        }
    
        jwt.verify(token, this.publicKey, function(err, decoded) {
            if (!!err){
                rejects(err);
            }else{
                resolve(decoded);
            }
          });
    })
   
}
IrisCaptcha.prototype.validateReq = function(token){
    return new Promise((resolve,rejects)=>{
        // TODO
        resolve("Sent");
    });
}
// Exported
IrisCaptcha.prototype.validate = function(userResponse,remoteip = ""){
    
    return new Promise((resolve,rejects)=>{
        if (typeof userResponse != "string" || typeof remoteip != "string")  {
            rejects(new Error("the type of userResponse and remoteip must be string."));
        }
    
        if (this.publicKey != undefined && this.defaults.method == "signature") {
            // verifing with signature
             this.validateSig(this.userResponse).then(res=>{
                 resolve(res)
             },err=>{
                 rejects(err);
             })
        }else{
            // verifing with request
            this.validateReq(this.userResponse).then(res=>{
                resolve(res)
            },err=>{
                rejects(err);
            })
        }

    })



}

// Exported
IrisCaptcha.prototype.GetJs = function(){
    return `<script src="https://captcha.irisdev.net/js/${this.appuid}"></script>`;
}

module.exports.default = IrisCaptcha;