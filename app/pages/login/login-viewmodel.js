"use strict";
var observable = require("data/observable");
var appSettings = require("application-settings");
var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
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
            //Compare
            if (this.password == appSettings.getString("PASSWORD")) {
                //TODO:Navigate to sitelist
                var topmost = frameModule.topmost();
                topmost.navigate("pages/sitelist/sitelist-page");
            }
            else {
                this.showLoginError();
            }
        }
        else {
            //First time.Assign this one as pwd
            appSettings.setString("PASSWORD", this.password);
        }
    };
    return LoginViewModel;
}(observable.Observable));
exports.LoginViewModel = LoginViewModel;
//# sourceMappingURL=login-viewmodel.js.map