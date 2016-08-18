"use strict";
var observable_1 = require("data/observable");
var dialogs = require("ui/dialogs");
var sitebackend_1 = require("../../services/sitebackend");
var frameModule = require("ui/frame");
var SiteFormViewModel = (function (_super) {
    __extends(SiteFormViewModel, _super);
    function SiteFormViewModel(site) {
        _super.call(this);
        this.pwdsecure = true;
        this.site = site;
    }
    SiteFormViewModel.prototype.SaveChanges = function () {
        sitebackend_1.SiteBackend.SaveSite(this.site);
        frameModule.topmost().goBack();
    };
    SiteFormViewModel.prototype.DeleteSite = function () {
        var _this = this;
        dialogs.confirm("Cofirm deletion").then(function (result) {
            if (result) {
                sitebackend_1.SiteBackend.DeleteSite(_this.site);
                frameModule.topmost().goBack();
            }
        });
    };
    SiteFormViewModel.prototype.UpdateUi = function () {
        this.notifyPropertyChange("pwdsecure", this.pwdsecure);
    };
    SiteFormViewModel.prototype.ChangePwdSecurity = function () {
        this.pwdsecure = !this.pwdsecure;
        this.UpdateUi();
    };
    return SiteFormViewModel;
}(observable_1.Observable));
exports.SiteFormViewModel = SiteFormViewModel;
//# sourceMappingURL=siteform-viewmodel.js.map