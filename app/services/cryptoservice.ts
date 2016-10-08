import appSettings = require("application-settings");
var CryptoJS = require("crypto-js");

export module CryptoServices{
        var secret:string;
        
        function GetEncryptedSecret():string{
            return appSettings.getString("SECRET");   
        }

        function SetEncryptedSecret(ciphertext:string){
            appSettings.setString("SECRET",ciphertext);    
        }

        export function UnblockSecret(Password:string):boolean {
            var encryptedsecret = GetEncryptedSecret();
            var secrethex = CryptoJS.AES.decrypt(encryptedsecret, Password);
            var sec = secrethex.toString(CryptoJS.enc.Utf8);
            if(!sec){                   
                return false;
            }
            secret = sec;
            return true;   
        }
        
        export function CreateSecret(Password:string):void {
            var randomstring = Math.random().toString(36).slice(-16);
            var ciphertexthex = CryptoJS.AES.encrypt(randomstring,Password);
            var ciphertext = ciphertexthex.toString();            
            appSettings.setString("SECRET",ciphertext);
            secret = randomstring;     
        }
        
        export function Encode(Payload:string):string{
            if(!secret)
                throw new Error("Secret not ublocked");
            return CryptoJS.AES.encrypt(Payload,secret);    
        }
        
        export function Decode(Payload:string):string{
            if(!secret)
                throw new Error("Secret not ublocked");
            return CryptoJS.AES.decrypt(Payload,secret).toString(CryptoJS.enc.Utf8);             
        }     
}

