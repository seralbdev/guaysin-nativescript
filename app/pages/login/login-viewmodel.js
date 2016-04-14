"use strict";
var observable = require("data/observable");
var appSettings = require("application-settings");
var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var CryptoJS = require("crypto-js");
var LoginViewModel = (function (_super) {
    __extends(LoginViewModel, _super);
    function LoginViewModel() {
        _super.call(this);
    }
    LoginViewModel.prototype.showLoginError = function () {
        dialogs.alert({
            title: "ERROR",
            message: "Incorrect password",
            okButtonText: "OK"
        });
    };
    LoginViewModel.prototype.onLogOn = function () {
        if (appSettings.hasKey("PASSWORD")) {
            //Password already saved
            //Decrypt it and compare
            console.log(this.password);
            var encryptedpwd = appSettings.getString("PASSWORD");
            console.log(encryptedpwd);
            var plainsavedpwdhex = CryptoJS.AES.decrypt(encryptedpwd, this.password);
            var plainsavedpwd = plainsavedpwdhex.toString(CryptoJS.enc.Utf8);
            console.log(plainsavedpwd);
            if (this.password == plainsavedpwd) {
                var topmost = frameModule.topmost();
                topmost.navigate("pages/sitelist/sitelist-page");
            }
            else {
                this.showLoginError();
            }
        }
        else {
            //First time.Assign this one as pwd
            var ciphertexthex = CryptoJS.AES.encrypt(this.password, this.password);
            console.log(ciphertexthex);
            var ciphertext = ciphertexthex.toString();
            console.log(ciphertext);
            appSettings.setString("PASSWORD", ciphertext);
        }
    };
    return LoginViewModel;
}(observable.Observable));
exports.LoginViewModel = LoginViewModel;
//# sourceMappingURL=login-viewmodel.js.map