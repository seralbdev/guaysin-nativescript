import {Observable} from "data/observable";
import dialogs = require("ui/dialogs");
import {Site} from "../../services/site";
import {SiteBackend} from "../../services/sitebackend";
import frameModule = require("ui/frame");

export class SiteFormViewModel extends Observable {
    
    public site:Site;
    public pwdsecure:boolean=true;
    
    public constructor(site:Site){
        super();
        this.site = site;
    }
    
    public SaveChanges(){
        SiteBackend.SaveSite(this.site).then(()=>{
            frameModule.topmost().goBack();
        });
    }
    
    public DeleteSite(){
        dialogs.confirm("Cofirm deletion").then(result => {
            if(result){
                SiteBackend.DeleteSite(this.site).then(()=>{
                    frameModule.topmost().goBack(); 
                });             
            }
        });        
   
    }
    
    public UpdateUi(){
        console.log(this.pwdsecure);
        this.notifyPropertyChange("pwdsecure",this.pwdsecure);    
    }    
    
    public ChangePwdSecurity(){
        console.log("change secure");
        this.pwdsecure = !this.pwdsecure;
        this.UpdateUi();
    }          
}