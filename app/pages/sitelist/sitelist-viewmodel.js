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
    return SiteListViewModel;
}(observable_1.Observable));
exports.SiteListViewModel = SiteListViewModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZWxpc3Qtdmlld21vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2l0ZWxpc3Qtdmlld21vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTJDO0FBRTNDLG9DQUF1QztBQUN2Qyw0Q0FBeUM7QUFDekMsMERBQXVEO0FBQ3ZELHNDQUF5QztBQUN6QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUcxQztJQUF1QyxxQ0FBVTtJQUFqRDs7SUFnRUEsQ0FBQztJQTNERyxzQkFBVyxvQ0FBSzthQUFoQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRU0scUNBQVMsR0FBaEIsVUFBaUIsS0FBZTtRQUFmLHNCQUFBLEVBQUEsVUFBZTtRQUM1QixJQUFJLElBQUksR0FBRyx5QkFBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRU0sc0NBQVUsR0FBakIsVUFBa0IsU0FBUztRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQzNCLFVBQVUsRUFBRSw4QkFBOEI7WUFDMUMsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLG1DQUFPLEdBQWQsVUFBZSxTQUFTO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQzNCLFVBQVUsRUFBRSw4QkFBOEI7WUFDMUMsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLGtDQUFNLEdBQWIsVUFBYyxTQUFTO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVNLHdDQUFZLEdBQW5CLFVBQW9CLFNBQVM7UUFDekIseUJBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDNUIsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzlDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQixDQUFDLEVBQUMsVUFBQSxLQUFLO1lBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLHdDQUFZLEdBQW5CLFVBQW9CLFNBQVM7UUFDekIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDMUMsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztnQkFDUCx5QkFBVyxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQztvQkFDOUIsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO29CQUMvQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2IsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzt3QkFDM0IsVUFBVSxFQUFFLHdCQUF3QjtxQkFDdkMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsRUFBQyxVQUFBLEtBQUs7b0JBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUFoRUQsQ0FBdUMsdUJBQVUsR0FnRWhEO0FBaEVZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlQXJyYXl9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCBkaWFsb2dzID0gcmVxdWlyZShcInVpL2RpYWxvZ3NcIik7XG5pbXBvcnQge1NpdGV9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zaXRlXCI7XG5pbXBvcnQge1NpdGVCYWNrZW5kfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvc2l0ZWJhY2tlbmRcIjtcbmltcG9ydCBmcmFtZU1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9mcmFtZVwiKTtcbnZhciBUb2FzdCA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtdG9hc3RcIik7XG5cblxuZXhwb3J0IGNsYXNzIFNpdGVMaXN0Vmlld01vZGVsIGV4dGVuZHMgT2JzZXJ2YWJsZSB7XG4gICAgXG4gICAgcHJpdmF0ZSBfc2l0ZXM6T2JzZXJ2YWJsZUFycmF5PFNpdGU+O1xuICAgIHB1YmxpYyBmaWx0ZXI6c3RyaW5nO1xuICAgIFxuICAgIHB1YmxpYyBnZXQgU2l0ZXMoKTpPYnNlcnZhYmxlQXJyYXk8U2l0ZT57XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXRlcztcbiAgICB9XG4gICAgXG4gICAgcHVibGljIExvYWRTaXRlcyhxdWVyeTpzdHJpbmc9XCJcIik6dm9pZHtcbiAgICAgICAgdmFyIGRhdGEgPSBTaXRlQmFja2VuZC5Mb2FkU2l0ZXMocXVlcnkpO1xuICAgICAgICB0aGlzLl9zaXRlcyA9IGRhdGE7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBTZWxlY3RTaXRlKEV2ZW50RGF0YSl7XG4gICAgICAgIGNvbnNvbGUubG9nKEV2ZW50RGF0YS5pbmRleCk7XG4gICAgICAgIHZhciBzaXRlID0gdGhpcy5fc2l0ZXMuZ2V0SXRlbShFdmVudERhdGEuaW5kZXgpO1xuICAgICAgICBjb25zb2xlLmxvZyhzaXRlKTtcbiAgICAgICAgZnJhbWVNb2R1bGUudG9wbW9zdCgpLm5hdmlnYXRlKHtcbiAgICAgICAgICAgIG1vZHVsZU5hbWU6IFwicGFnZXMvc2l0ZWZvcm0vc2l0ZWZvcm0tcGFnZVwiLFxuICAgICAgICAgICAgY29udGV4dDogc2l0ZVxuICAgICAgICB9KTsgICAgXG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBBZGRTaXRlKEV2ZW50RGF0YSl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWRkU2l0ZVwiKTtcbiAgICAgICAgbGV0IHNpdGUgPSBuZXcgU2l0ZShcIlwiLFwiXCIsXCJcIixcIlwiKTtcbiAgICAgICAgY29uc29sZS5sb2coc2l0ZSk7XG4gICAgICAgIGZyYW1lTW9kdWxlLnRvcG1vc3QoKS5uYXZpZ2F0ZSh7XG4gICAgICAgICAgICBtb2R1bGVOYW1lOiBcInBhZ2VzL3NpdGVmb3JtL3NpdGVmb3JtLXBhZ2VcIixcbiAgICAgICAgICAgIGNvbnRleHQ6IHNpdGVcbiAgICAgICAgfSk7ICAgIFxuICAgIH1cbiAgIFxuICAgIHB1YmxpYyBTZWFyY2goRXZlbnREYXRhKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJzZWFyY2hcIik7XG4gICAgICAgIHRoaXMuTG9hZFNpdGVzKHRoaXMuZmlsdGVyKTtcbiAgICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUNoYW5nZShcIlNpdGVzXCIsdGhpcy5fc2l0ZXMpOyAgICAgICAgXG4gICAgfSAgICBcblxuICAgIHB1YmxpYyBFeHBvcnRCYWNrdXAoRXZlbnREYXRhKXtcbiAgICAgICAgU2l0ZUJhY2tlbmQuRXhwb3J0VG9GaWxlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBsZXQgdG9hc3QgPSBUb2FzdC5tYWtlVGV4dChcIkV4cG9ydCBmaW5pc2hlZFwiKTtcbiAgICAgICAgICAgIHRvYXN0LnNob3coKTsgICAgICAgICAgICAgXG4gICAgICAgIH0sZXJyb3IgPT57XG4gICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KFwiQmFja3VwIGZhaWxlZCFcIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBJbXBvcnRCYWNrdXAoRXZlbnREYXRhKXtcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKFwiUmVzdG9yZSBiYWNrdXA/XCIpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgU2l0ZUJhY2tlbmQuSW1wb3J0RnJvbUZpbGUoKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCB0b2FzdCA9IFRvYXN0Lm1ha2VUZXh0KFwiUmVzdG9yZSBmaW5pc2hlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdG9hc3Quc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogXCJwYWdlcy9sb2dpbi9sb2dpbi1wYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0sZXJyb3I9PntcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydChcIlJlc3RvcmUgZmFpbGVkIVwiKTtcbiAgICAgICAgICAgICAgICB9KTsgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7IFxuICAgIH0gICAgICAgXG59Il19