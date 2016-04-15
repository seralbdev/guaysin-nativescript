"use strict";
var appSettings = require("application-settings");
var CryptoJS = require("crypto-js");
var CryptoServices;
(function (CryptoServices) {
    var secret;
    function UnblockSecret(Password) {
        var encryptedsecret = appSettings.getString("SECRET");
        var secrethex = CryptoJS.AES.decrypt(encryptedsecret, Password);
        var secret = secrethex.toString(CryptoJS.enc.Utf8);
        if (!secret) {
            return false;
        }
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
})(CryptoServices = exports.CryptoServices || (exports.CryptoServices = {}));
//# sourceMappingURL=cryptoservice.js.map