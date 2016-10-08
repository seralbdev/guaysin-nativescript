import {Observable} from "data/observable";
import {ObservableArray} from "data/observable-array";
import dialogs = require("ui/dialogs");
import {Site} from "../../services/site";
import {SiteBackend} from "../../services/sitebackend";
import frameModule = require("ui/frame");
var Toast = require("nativescript-toast");


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
   
    public Search(EventData){
        console.log("search");
        this.LoadSites(this.filter);
        this.notifyPropertyChange("Sites",this._sites);        
    }    

    public ExportBackup(EventData){
        SiteBackend.ExportToFile().then(() => {
            let toast = Toast.makeText("Export finished");
            toast.show();             
        },error =>{
            dialogs.alert("Backup failed!");
        });
    }

    public ImportBackup(EventData){
        dialogs.confirm("Restore backup?").then(result => {
            if(result){
                SiteBackend.ImportFromFile().then(()=>{
                    let toast = Toast.makeText("Restore finished");
                    toast.show();
                    frameModule.topmost().navigate({
                        moduleName: "pages/login/login-page"
                    });                         
                },error=>{
                    dialogs.alert("Restore failed!");
                });            
            }
        }); 
    }       
}