import {Observable} from "data/observable";
import {ObservableArray} from "data/observable-array";
import dialogs = require("ui/dialogs");
import {Sites} from "../../services/site";
import {SiteBackend} from "../../services/sitebackend";

export class SiteListViewModel extends Observable {
    
    private _sites:ObservableArray<Sites.Site>;
    
    public get Sites():ObservableArray<Sites.Site>{
        return this._sites;
    }
    
    public LoadSites():void{
        var data = SiteBackend.LoadSites("");
        this._sites = data;
    }
    
    public OnSelectSite(EventData){
        console.log(EventData);    
    }
      
}