import {Observable} from "data/observable";
import {ObservableArray} from "data/observable-array";
import dialogs = require("ui/dialogs");
import {Site} from "../../services/site";
import {SiteBackend} from "../../services/sitebackend";
import frameModule = require("ui/frame");

export class SiteListViewModel extends Observable {
    
    private _sites:ObservableArray<Site>;
    public filter:string;
    
    public get Sites():ObservableArray<Site>{
        return this._sites;
    }
    
    public LoadSites(query:string=""):void{
        var data = SiteBackend.LoadSites(query);
        this._sites = data;
    }
    
    public SelectSite(EventData){
        console.log(EventData.index);
        var site = this._sites.getItem(EventData.index);
        console.log(site);
        frameModule.topmost().navigate({
            moduleName: "pages/siteform/siteform-page",
            context: site
        });    
    }
    
    public AddSite(EventData){
        console.log("AddSite");
        let site = new Site("","","","");
        console.log(site);
        frameModule.topmost().navigate({
            moduleName: "pages/siteform/siteform-page",
            context: site
        });    
    }

    public ExportToFile(EventData){
        console.log("export");
        SiteBackend.ExportToFile().then(() => {
            console.log("saved!");
        },error =>{
            console.log("ERROR!: ",error);
        });
    }
    
    public Search(EventData){
        console.log("search");
        this.LoadSites(this.filter);
        this.notifyPropertyChange("Sites",this._sites);        
    }    

    public onImport(){
        SiteBackend.ImportFromFile().then(()=>{
            dialogs.confirm("Import finished OK");    
        });
    }       
}