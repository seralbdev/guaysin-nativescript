"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable = require("data/observable");
var appSettings = require("application-settings");
var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var cryptoservice_1 = require("../../services/cryptoservice");
var sitebackend_1 = require("../../services/sitebackend");
var LoginViewModel = (function (_super) {
    __extends(LoginViewModel, _super);
    function LoginViewModel() {
        return _super.call(this) || this;
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
            sitebackend_1.SiteBackend.Initialize().then(function () {
                frameModule.topmost().navigate("pages/sitelist/sitelist-page");
            });
        }
    };
    return LoginViewModel;
}(observable.Observable));
exports.LoginViewModel = LoginViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tdmlld21vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4tdmlld21vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQStDO0FBQy9DLGtEQUFxRDtBQUNyRCxvQ0FBdUM7QUFDdkMsc0NBQXlDO0FBQ3pDLDhEQUE0RDtBQUM1RCwwREFBdUQ7QUFFdkQ7SUFBb0Msa0NBQXFCO0lBSXJEO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBRU8sdUNBQWMsR0FBdEIsVUFBdUIsR0FBVTtRQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxPQUFPLEVBQUUsR0FBRztZQUNaLFlBQVksRUFBRSxJQUFJO1NBQ2pCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxnQ0FBTyxHQUFkO1FBQ0ksRUFBRSxDQUFBLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBLENBQUM7WUFDN0Isc0JBQXNCO1lBQ3RCLG1CQUFtQjtZQUNuQixJQUFHLENBQUM7Z0JBQ0EsRUFBRSxDQUFBLENBQUMsOEJBQWMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUEsQ0FBQztvQkFDNUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO2dCQUNuRSxDQUFDO2dCQUFBLElBQUksQ0FBQSxDQUFDO29CQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDOUMsQ0FBQztZQUVMLENBQUM7WUFBQSxLQUFLLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUNOLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUM1QyxDQUFDO1FBQ0wsQ0FBQztRQUFBLElBQUksQ0FBQSxDQUFDO1lBQ0YsYUFBYTtZQUNiLGtFQUFrRTtZQUNsRSw4QkFBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0MsU0FBUztZQUNULHlCQUFXLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUMxQixXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDbkUsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FBQyxBQXhDRCxDQUFvQyxVQUFVLENBQUMsVUFBVSxHQXdDeEQ7QUF4Q1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgb2JzZXJ2YWJsZSA9IHJlcXVpcmUoXCJkYXRhL29ic2VydmFibGVcIik7XG5pbXBvcnQgYXBwU2V0dGluZ3MgPSByZXF1aXJlKFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIik7XG5pbXBvcnQgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xuaW1wb3J0IGZyYW1lTW9kdWxlID0gcmVxdWlyZShcInVpL2ZyYW1lXCIpO1xuaW1wb3J0IHtDcnlwdG9TZXJ2aWNlc30gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NyeXB0b3NlcnZpY2VcIjtcbmltcG9ydCB7U2l0ZUJhY2tlbmR9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zaXRlYmFja2VuZFwiO1xuXG5leHBvcnQgY2xhc3MgTG9naW5WaWV3TW9kZWwgZXh0ZW5kcyBvYnNlcnZhYmxlLk9ic2VydmFibGUge1xuICAgIFxuICAgIHBhc3N3b3JkOnN0cmluZztcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBzaG93TG9naW5FcnJvcihtc2c6c3RyaW5nKXtcbiAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgIHRpdGxlOiBcIkVSUk9SXCIsXG4gICAgICAgIG1lc3NhZ2U6IG1zZyxcbiAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgfSk7ICAgICAgICBcbiAgICB9XG4gICAgICAgXG4gICAgcHVibGljIG9uTG9nT24oKXsgICAgICAgXG4gICAgICAgIGlmKGFwcFNldHRpbmdzLmhhc0tleShcIlNFQ1JFVFwiKSl7XG4gICAgICAgICAgICAvL1NlY3JldCBhbHJlYWR5IHNhdmVkXG4gICAgICAgICAgICAvL1RyeSB0byBEZWNyeXB0IGl0XG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgaWYoQ3J5cHRvU2VydmljZXMuVW5ibG9ja1NlY3JldCh0aGlzLnBhc3N3b3JkKSl7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lTW9kdWxlLnRvcG1vc3QoKS5uYXZpZ2F0ZShcInBhZ2VzL3NpdGVsaXN0L3NpdGVsaXN0LXBhZ2VcIik7ICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dMb2dpbkVycm9yKFwiSW5jb3JyZWN0IHBhc3N3b3JkXCIpOyAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0xvZ2luRXJyb3IoXCJVbmV4cGVjdGVkIGVycm9yXCIpOyAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvL0ZpcnN0IHRpbWUuXG4gICAgICAgICAgICAvL0dlbmVyYXRlIHJhbmRvbSBzZWNyZXQsIGVuY3J5cHQgd2l0aCBwd2QgYW5kIHNhdmUgYXMgYXBwLXNldHRpbmdcbiAgICAgICAgICAgIENyeXB0b1NlcnZpY2VzLkNyZWF0ZVNlY3JldCh0aGlzLnBhc3N3b3JkKTtcbiAgICAgICAgICAgIC8vSW5pdCBEQlxuICAgICAgICAgICAgU2l0ZUJhY2tlbmQuSW5pdGlhbGl6ZSgpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUoXCJwYWdlcy9zaXRlbGlzdC9zaXRlbGlzdC1wYWdlXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59Il19