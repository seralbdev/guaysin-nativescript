"use strict";
var appSettings = require("application-settings");
var CryptoJS = require("crypto-js");
var CryptoServices;
(function (CryptoServices) {
    var secret;
    function UnblockSecret(Password) {
        var encryptedsecret = appSettings.getString("SECRET");
        var secrethex = CryptoJS.AES.decrypt(encryptedsecret, Password);
        var sec = secrethex.toString(CryptoJS.enc.Utf8);
        if (!sec) {
            return false;
        }
        secret = sec;
        return true;
    }
    CryptoServices.UnblockSecret = UnblockSecret;
    function CreateSecret(Password) {
        var randomstring = Math.random().toString(36).slice(-16);
        var ciphertexthex = CryptoJS.AES.encrypt(randomstring, Password);
        var ciphertext = ciphertexthex.toString();
        appSettings.setString("SECRET", ciphertext);
        secret = randomstring;
    }
    CryptoServices.CreateSecret = CreateSecret;
    function Encode(Payload) {
        if (!secret)
            throw new Error("Secret not ublocked");
        return CryptoJS.AES.encrypt(Payload, secret);
    }
    CryptoServices.Encode = Encode;
    function Decode(Payload) {
        if (!secret)
            throw new Error("Secret not ublocked");
        return CryptoJS.AES.decrypt(Payload, secret).toString(CryptoJS.enc.Utf8);
    }
    CryptoServices.Decode = Decode;
})(CryptoServices = exports.CryptoServices || (exports.CryptoServices = {}));
//# sourceMappingURL=cryptoservice.js.map