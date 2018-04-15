"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("data/observable");
var dialogs = require("ui/dialogs");
var site_1 = require("../../services/site");
var sitebackend_1 = require("../../services/sitebackend");
var frameModule = require("ui/frame");
var Toast = require("nativescript-toast");
var SiteListViewModel = (function (_super) {
    __extends(SiteListViewModel, _super);
    function SiteListViewModel() {
        return _super !== null && _super.apply(this, arguments) || this;
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
        console.log("AddSite");
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
    SiteListViewModel.prototype.ExportBackup = function (EventData) {
        sitebackend_1.SiteBackend.ExportToFile().then(function () {
            var toast = Toast.makeText("Export finished");
            toast.show();
        }, function (error) {
            dialogs.alert("Backup failed!");
        });
    };
    SiteListViewModel.prototype.ImportBackup = function (EventData) {
        dialogs.confirm("Restore backup?").then(function (result) {
            if (result) {
                sitebackend_1.SiteBackend.ImportFromFile().then(function () {
                    var toast = Toast.makeText("Restore finished");
                    toast.show();
                    frameModule.topmost().navigate({
                        moduleName: "pages/login/login-page"
                    });
                }, function (error) {
                    dialogs.alert("Restore failed!");
                });
            }
        });
    };
    SiteListViewModel.prototype.ExportToCloud = function (EventData) {
        sitebackend_1.SiteBackend.ExportToCloud().then(function () {
            var toast = Toast.makeText("Export(cloud) finished");
            toast.show();
        }, function (error) {
            dialogs.alert("Export(cloud) failed!");
        });
    };
    SiteListViewModel.prototype.ImportFromCloud = function (EventData) {
        dialogs.confirm("Restore backup?").then(function (result) {
            if (result) {
                sitebackend_1.SiteBackend.ImportFromCloud().then(function () {
                    var toast = Toast.makeText("Restore finished");
                    toast.show();
                    frameModule.topmost().navigate({
                        moduleName: "pages/login/login-page"
                    });
                }, function (error) {
                    dialogs.alert("Restore failed!");
                });
            }
        });
    };
    return SiteListViewModel;
}(observable_1.Observable));
exports.SiteListViewModel = SiteListViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZWxpc3Qtdmlld21vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2l0ZWxpc3Qtdmlld21vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTJDO0FBRTNDLG9DQUF1QztBQUN2Qyw0Q0FBeUM7QUFDekMsMERBQXVEO0FBQ3ZELHNDQUF5QztBQUN6QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUcxQztJQUF1QyxxQ0FBVTtJQUFqRDs7SUF5RkEsQ0FBQztJQXBGRyxzQkFBVyxvQ0FBSzthQUFoQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRU0scUNBQVMsR0FBaEIsVUFBaUIsS0FBZTtRQUFmLHNCQUFBLEVBQUEsVUFBZTtRQUM1QixJQUFJLElBQUksR0FBRyx5QkFBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRU0sc0NBQVUsR0FBakIsVUFBa0IsU0FBUztRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQzNCLFVBQVUsRUFBRSw4QkFBOEI7WUFDMUMsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLG1DQUFPLEdBQWQsVUFBZSxTQUFTO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxX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QUMsQ0FBQztnQkFDckMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBekZELENBQXVDLHVCQUFVLEdBeUZoRDtBQXpGWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZUFycmF5fSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgZGlhbG9ncyA9IHJlcXVpcmUoXCJ1aS9kaWFsb2dzXCIpO1xuaW1wb3J0IHtTaXRlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2l0ZVwiO1xuaW1wb3J0IHtTaXRlQmFja2VuZH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3NpdGViYWNrZW5kXCI7XG5pbXBvcnQgZnJhbWVNb2R1bGUgPSByZXF1aXJlKFwidWkvZnJhbWVcIik7XG52YXIgVG9hc3QgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXRvYXN0XCIpO1xuXG5cbmV4cG9ydCBjbGFzcyBTaXRlTGlzdFZpZXdNb2RlbCBleHRlbmRzIE9ic2VydmFibGUge1xuICAgIFxuICAgIHByaXZhdGUgX3NpdGVzOk9ic2VydmFibGVBcnJheTxTaXRlPjtcbiAgICBwdWJsaWMgZmlsdGVyOnN0cmluZztcbiAgICBcbiAgICBwdWJsaWMgZ2V0IFNpdGVzKCk6T2JzZXJ2YWJsZUFycmF5PFNpdGU+e1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l0ZXM7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBMb2FkU2l0ZXMocXVlcnk6c3RyaW5nPVwiXCIpOnZvaWR7XG4gICAgICAgIHZhciBkYXRhID0gU2l0ZUJhY2tlbmQuTG9hZFNpdGVzKHF1ZXJ5KTtcbiAgICAgICAgdGhpcy5fc2l0ZXMgPSBkYXRhO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgU2VsZWN0U2l0ZShFdmVudERhdGEpe1xuICAgICAgICBjb25zb2xlLmxvZyhFdmVudERhdGEuaW5kZXgpO1xuICAgICAgICB2YXIgc2l0ZSA9IHRoaXMuX3NpdGVzLmdldEl0ZW0oRXZlbnREYXRhLmluZGV4KTtcbiAgICAgICAgY29uc29sZS5sb2coc2l0ZSk7XG4gICAgICAgIGZyYW1lTW9kdWxlLnRvcG1vc3QoKS5uYXZpZ2F0ZSh7XG4gICAgICAgICAgICBtb2R1bGVOYW1lOiBcInBhZ2VzL3NpdGVmb3JtL3NpdGVmb3JtLXBhZ2VcIixcbiAgICAgICAgICAgIGNvbnRleHQ6IHNpdGVcbiAgICAgICAgfSk7ICAgIFxuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgQWRkU2l0ZShFdmVudERhdGEpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFkZFNpdGVcIik7XG4gICAgICAgIGxldCBzaXRlID0gbmV3IFNpdGUoXCJcIixcIlwiLFwiXCIsXCJcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHNpdGUpO1xuICAgICAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUoe1xuICAgICAgICAgICAgbW9kdWxlTmFtZTogXCJwYWdlcy9zaXRlZm9ybS9zaXRlZm9ybS1wYWdlXCIsXG4gICAgICAgICAgICBjb250ZXh0OiBzaXRlXG4gICAgICAgIH0pOyAgICBcbiAgICB9XG4gICBcbiAgICBwdWJsaWMgU2VhcmNoKEV2ZW50RGF0YSl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VhcmNoXCIpO1xuICAgICAgICB0aGlzLkxvYWRTaXRlcyh0aGlzLmZpbHRlcik7XG4gICAgICAgIHRoaXMubm90aWZ5UHJvcGVydHlDaGFuZ2UoXCJTaXRlc1wiLHRoaXMuX3NpdGVzKTsgICAgICAgIFxuICAgIH0gICAgXG5cbiAgICBwdWJsaWMgRXhwb3J0QmFja3VwKEV2ZW50RGF0YSl7XG4gICAgICAgIFNpdGVCYWNrZW5kLkV4cG9ydFRvRmlsZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRvYXN0ID0gVG9hc3QubWFrZVRleHQoXCJFeHBvcnQgZmluaXNoZWRcIik7XG4gICAgICAgICAgICB0b2FzdC5zaG93KCk7ICAgICAgICAgICAgIFxuICAgICAgICB9LGVycm9yID0+e1xuICAgICAgICAgICAgZGlhbG9ncy5hbGVydChcIkJhY2t1cCBmYWlsZWQhXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgSW1wb3J0QmFja3VwKEV2ZW50RGF0YSl7XG4gICAgICAgIGRpYWxvZ3MuY29uZmlybShcIlJlc3RvcmUgYmFja3VwP1wiKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBpZihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIFNpdGVCYWNrZW5kLkltcG9ydEZyb21GaWxlKCkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICAgICBsZXQgdG9hc3QgPSBUb2FzdC5tYWtlVGV4dChcIlJlc3RvcmUgZmluaXNoZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRvYXN0LnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVNb2R1bGUudG9wbW9zdCgpLm5hdmlnYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6IFwicGFnZXMvbG9naW4vbG9naW4tcGFnZVwiXG4gICAgICAgICAgICAgICAgICAgIH0pOyAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9LGVycm9yPT57XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoXCJSZXN0b3JlIGZhaWxlZCFcIik7XG4gICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOyBcbiAgICB9XG4gICAgXG4gICAgcHVibGljIEV4cG9ydFRvQ2xvdWQoRXZlbnREYXRhKXtcbiAgICAgICAgU2l0ZUJhY2tlbmQuRXhwb3J0VG9DbG91ZCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRvYXN0ID0gVG9hc3QubWFrZVRleHQoXCJFeHBvcnQoY2xvdWQpIGZpbmlzaGVkXCIpO1xuICAgICAgICAgICAgdG9hc3Quc2hvdygpOyAgICAgICAgICAgICBcbiAgICAgICAgfSxlcnJvciA9PntcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoXCJFeHBvcnQoY2xvdWQpIGZhaWxlZCFcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgSW1wb3J0RnJvbUNsb3VkKEV2ZW50RGF0YSl7XG4gICAgICAgIGRpYWxvZ3MuY29uZmlybShcIlJlc3RvcmUgYmFja3VwP1wiKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICBpZihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIFNpdGVCYWNrZW5kLkltcG9ydEZyb21DbG91ZCgpLnRoZW4oKCk9PnsgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgdG9hc3QgPSBUb2FzdC5tYWtlVGV4dChcIlJlc3RvcmUgZmluaXNoZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRvYXN0LnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVNb2R1bGUudG9wbW9zdCgpLm5hdmlnYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6IFwicGFnZXMvbG9naW4vbG9naW4tcGFnZVwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KFwiUmVzdG9yZSBmYWlsZWQhXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTsgXG4gICAgfSAgICBcbn0iXX0=