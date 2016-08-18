"use strict";
var observable = require("data/observable");
var appSettings = require("application-settings");
var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var cryptoservice_1 = require("../../services/cryptoservice");
var sitebackend_1 = require("../../services/sitebackend");
var LoginViewModel = (function (_super) {
    __extends(LoginViewModel, _super);
    function LoginViewModel() {
        _super.call(this);
    }
    LoginViewModel.prototype.showLoginError = function (msg) {
        dialogs.alert({
            title: "ERROR",
            message: msg,
            okButtonText: "OK"
        });
    };
    LoginViewModel.prototype.onLogOn = function () {
        if (appSettings.hasKey("SECRET")) {
            //Secret already saved
            //Try to Decrypt it
            try {
                if (cryptoservice_1.CryptoServices.UnblockSecret(this.password)) {
                    frameModule.topmost().navigate("pages/sitelist/sitelist-page");
                }
                else {
                    this.showLoginError("Incorrect password");
                }
            }
            catch (e) {
                this.showLoginError("Unexpected error");
            }
        }
        else {
            //First time.
            //Generate random secret, encrypt with pwd and save as app-setting
            cryptoservice_1.CryptoServices.CreateSecret(this.password);
            //Init DB
            sitebackend_1.SiteBackend.Initialize();
            frameModule.topmost().navigate("pages/sitelist/sitelist-page");
        }
    };
    return LoginViewModel;
}(observable.Observable));
exports.LoginViewModel = LoginViewModel;
//# sourceMappingURL=login-viewmodel.js.map