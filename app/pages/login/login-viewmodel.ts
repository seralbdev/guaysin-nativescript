import observable = require("data/observable");
import appSettings = require("application-settings");
import dialogs = require("ui/dialogs");
import frameModule = require("ui/frame");

export class LoginViewModel extends observable.Observable {
    
    password:string;
    
    constructor() {
        super();
    }
    
    private showLoginError(){
        dialogs.alert({
        title: "ERROR",
        message: "Incorrect password",
        okButtonText: "OK"
        });        
    }
       
    public onLogOn(){
        if(appSettings.hasKey("PASSWORD")){
            //Compare
            if(this.password==appSettings.getString("PASSWORD")){
                //TODO:Navigate to sitelist
                var topmost = frameModule.topmost();
                topmost.navigate("pages/sitelist/sitelist-page");     
            }
            else{
                this.showLoginError();    
            }
        }else{
            //First time.Assign this one as pwd
            appSettings.setString("PASSWORD",this.password);
        }
    }
}