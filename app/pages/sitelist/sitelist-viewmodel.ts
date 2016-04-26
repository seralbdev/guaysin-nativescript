import {Observable} from "data/observable";
import {ObservableArray} from "data/observable-array";
import dialogs = require("ui/dialogs");
import {Site} from "../../services/site";
import {SiteBackend} from "../../services/sitebackend";
import frameModule = require("ui/frame");

export class SiteListViewModel extends Observable {
    
    private _sites:ObservableArray<Site>;
    
    public get Sites():ObservableArray<Site>{
        return this._sites;
    }
    
    public LoadSites():void{
        var data = SiteBackend.LoadSites("");
        this._sites = data;
    }
    
    public OnSelectSite(EventData){
        console.log(EventData.index);
        var site = this._sites.getItem(EventData.index);
        console.log(site);
        frameModule.topmost().navigate({
            moduleName: "pages/siteform/siteform-page",
            context: site
        });    
    }
    
    public OnAddSite(EventData){
        console.log(EventData.index);
        let site = new Site("","","","");
        console.log(site);
        frameModule.topmost().navigate({
            moduleName: "pages/siteform/siteform-page",
            context: site
        });    
    }    
      
}