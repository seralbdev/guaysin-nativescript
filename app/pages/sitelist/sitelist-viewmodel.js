"use strict";
var observable_1 = require("data/observable");
var site_1 = require("../../services/site");
var sitebackend_1 = require("../../services/sitebackend");
var frameModule = require("ui/frame");
var SiteListViewModel = (function (_super) {
    __extends(SiteListViewModel, _super);
    function SiteListViewModel() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SiteListViewModel.prototype, "Sites", {
        get: function () {
            return this._sites;
        },
        enumerable: true,
        configurable: true
    });
    SiteListViewModel.prototype.LoadSites = function (query) {
        if (query === void 0) { query = ""; }
        var data = sitebackend_1.SiteBackend.LoadSites(query);
        this._sites = data;
    };
    SiteListViewModel.prototype.SelectSite = function (EventData) {
        console.log(EventData.index);
        var site = this._sites.getItem(EventData.index);
        console.log(site);
        frameModule.topmost().navigate({
            moduleName: "pages/siteform/siteform-page",
            context: site
        });
    };
    SiteListViewModel.prototype.AddSite = function (EventData) {
        console.log(EventData.index);
        var site = new site_1.Site("", "", "", "");
        console.log(site);
        frameModule.topmost().navigate({
            moduleName: "pages/siteform/siteform-page",
            context: site
        });
    };
    SiteListViewModel.prototype.Search = function (EventData) {
        console.log("search");
        this.LoadSites(this.filter);
        this.notifyPropertyChange("Sites", this._sites);
    };
    return SiteListViewModel;
}(observable_1.Observable));
exports.SiteListViewModel = SiteListViewModel;
//# sourceMappingURL=sitelist-viewmodel.js.map