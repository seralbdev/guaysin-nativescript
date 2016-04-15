import appSettings = require("application-settings");
var CryptoJS = require("crypto-js");

export module CryptoServices{
        var secret:string;
        
        export function UnblockSecret(Password:string):boolean {
            var encryptedsecret = appSettings.getString("SECRET");
            var secrethex = CryptoJS.AES.decrypt(encryptedsecret, Password);
            var secret = secrethex.toString(CryptoJS.enc.Utf8);
            if(!secret){                   
                return false;
            }
            return true;   
        }
        
        export function CreateSecret(Password:string):void {
            var randomstring = Math.random().toString(36).slice(-16);
            var ciphertexthex = CryptoJS.AES.encrypt(randomstring,Password);
            var ciphertext = ciphertexthex.toString();            
            appSettings.setString("SECRET",ciphertext);
            secret = randomstring;     
        }     
}

