"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var dialogs = require("ui/dialogs");
var sitebackend_1 = require("../../services/sitebackend");
var frameModule = require("ui/frame");
var SiteFormViewModel = (function (_super) {
    __extends(SiteFormViewModel, _super);
    function SiteFormViewModel(site) {
        var _this = _super.call(this) || this;
        _this.pwdsecure = true;
        _this.site = site;
        return _this;
    }
    SiteFormViewModel.prototype.SaveChanges = function () {
        sitebackend_1.SiteBackend.SaveSite(this.site).then(function () {
            frameModule.topmost().goBack();
        });
    };
    SiteFormViewModel.prototype.DeleteSite = function () {
        var _this = this;
        dialogs.confirm("Cofirm deletion").then(function (result) {
            if (result) {
                sitebackend_1.SiteBackend.DeleteSite(_this.site).then(function () {
                    frameModule.topmost().goBack();
                });
            }
        });
    };
    SiteFormViewModel.prototype.UpdateUi = function () {
        console.log(this.pwdsecure);
        this.notifyPropertyChange("pwdsecure", this.pwdsecure);
    };
    SiteFormViewModel.prototype.ChangePwdSecurity = function () {
        console.log("change secure");
        this.pwdsecure = !this.pwdsecure;
        this.UpdateUi();
    };
    return SiteFormViewModel;
}(observable_1.Observable));
exports.SiteFormViewModel = SiteFormViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZWZvcm0tdmlld21vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2l0ZWZvcm0tdmlld21vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTJDO0FBQzNDLG9DQUF1QztBQUV2QywwREFBdUQ7QUFDdkQsc0NBQXlDO0FBRXpDO0lBQXVDLHFDQUFVO0lBSzdDLDJCQUFtQixJQUFTO1FBQTVCLFlBQ0ksaUJBQU8sU0FFVjtRQUxNLGVBQVMsR0FBUyxJQUFJLENBQUM7UUFJMUIsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0lBQ3JCLENBQUM7SUFFTSx1Q0FBVyxHQUFsQjtRQUNJLHlCQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLHNDQUFVLEdBQWpCO1FBQUEsaUJBU0M7UUFSRyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUMxQyxFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDO2dCQUNQLHlCQUFXLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ25DLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbkMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRU0sb0NBQVEsR0FBZjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTSw2Q0FBaUIsR0FBeEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBckNELENBQXVDLHVCQUFVLEdBcUNoRDtBQXJDWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCBkaWFsb2dzID0gcmVxdWlyZShcInVpL2RpYWxvZ3NcIik7XG5pbXBvcnQge1NpdGV9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zaXRlXCI7XG5pbXBvcnQge1NpdGVCYWNrZW5kfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2l0ZWJhY2tlbmRcIjtcbmltcG9ydCBmcmFtZU1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9mcmFtZVwiKTtcblxuZXhwb3J0IGNsYXNzIFNpdGVGb3JtVmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gICAgXG4gICAgcHVibGljIHNpdGU6U2l0ZTtcbiAgICBwdWJsaWMgcHdkc2VjdXJlOmJvb2xlYW49dHJ1ZTtcbiAgICBcbiAgICBwdWJsaWMgY29uc3RydWN0b3Ioc2l0ZTpTaXRlKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zaXRlID0gc2l0ZTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIFNhdmVDaGFuZ2VzKCl7XG4gICAgICAgIFNpdGVCYWNrZW5kLlNhdmVTaXRlKHRoaXMuc2l0ZSkudGhlbigoKT0+e1xuICAgICAgICAgICAgZnJhbWVNb2R1bGUudG9wbW9zdCgpLmdvQmFjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIERlbGV0ZVNpdGUoKXtcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKFwiQ29maXJtIGRlbGV0aW9uXCIpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgU2l0ZUJhY2tlbmQuRGVsZXRlU2l0ZSh0aGlzLnNpdGUpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVNb2R1bGUudG9wbW9zdCgpLmdvQmFjaygpOyBcbiAgICAgICAgICAgICAgICB9KTsgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOyAgICAgICAgXG4gICBcbiAgICB9XG4gICAgXG4gICAgcHVibGljIFVwZGF0ZVVpKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHdkc2VjdXJlKTtcbiAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZShcInB3ZHNlY3VyZVwiLHRoaXMucHdkc2VjdXJlKTsgICAgXG4gICAgfSAgICBcbiAgICBcbiAgICBwdWJsaWMgQ2hhbmdlUHdkU2VjdXJpdHkoKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJjaGFuZ2Ugc2VjdXJlXCIpO1xuICAgICAgICB0aGlzLnB3ZHNlY3VyZSA9ICF0aGlzLnB3ZHNlY3VyZTtcbiAgICAgICAgdGhpcy5VcGRhdGVVaSgpO1xuICAgIH0gICAgICAgICAgXG59Il19