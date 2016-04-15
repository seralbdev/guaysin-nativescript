import appSettings = require("application-settings");
var CryptoJS = require("crypto-js");

export module CryptoServices{
    export class CryptoService{
        private static secret:string;
        
        public static UnblockSecret(Password:string):boolean {
            var encryptedsecret = appSettings.getString("SECRET");
            var secrethex = CryptoJS.AES.decrypt(encryptedsecret, Password);
            var secret = <string>secrethex.toString(CryptoJS.enc.Utf8);
            if(!secret){                   
                return false;
            }
            CryptoService.secret = secret;
            return true;   
        }
        
        public static CreateSecret(Password:string):void {
            var randomstring = Math.random().toString(36).slice(-16);
            var ciphertexthex = CryptoJS.AES.encrypt(randomstring,Password);
            var ciphertext = ciphertexthex.toString();            
            appSettings.setString("SECRET",ciphertext);        
        }     
    }    
}

