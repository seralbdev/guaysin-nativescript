"use strict";
var appSettings = require("application-settings");
var CryptoJS = require("crypto-js");
var CryptoServices;
(function (CryptoServices) {
    var CryptoService = (function () {
        function CryptoService() {
        }
        CryptoService.UnblockSecret = function (Password) {
            var encryptedsecret = appSettings.getString("SECRET");
            var secrethex = CryptoJS.AES.decrypt(encryptedsecret, Password);
            var secret = secrethex.toString(CryptoJS.enc.Utf8);
            if (!secret) {
                return false;
            }
            CryptoService.secret = secret;
            return true;
        };
        CryptoService.CreateSecret = function (Password) {
            var randomstring = Math.random().toString(36).slice(-16);
            var ciphertexthex = CryptoJS.AES.encrypt(randomstring, Password);
            var ciphertext = ciphertexthex.toString();
            appSettings.setString("SECRET", ciphertext);
        };
        return CryptoService;
    }());
    CryptoServices.CryptoService = CryptoService;
})(CryptoServices = exports.CryptoServices || (exports.CryptoServices = {}));
//# sourceMappingURL=cryptoservice.js.map