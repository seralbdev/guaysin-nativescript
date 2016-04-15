import observable = require("data/observable");
import appSettings = require("application-settings");
import dialogs = require("ui/dialogs");
import frameModule = require("ui/frame");
import {CryptoServices} from "../../services/cryptoservice";

export class LoginViewModel extends observable.Observable {
    
    password:string;
    
    constructor() {
        super();
    }
    
    private showLoginError(msg:string){
        dialogs.alert({
        title: "ERROR",
        message: msg,
        okButtonText: "OK"
        });        
    }
       
    public onLogOn(){       
        if(appSettings.hasKey("SECRET")){
            //Secret already saved
            //Try to Decrypt it
            try{
                if(CryptoServices.CryptoService.UnblockSecret(this.password)){
                    frameModule.topmost().navigate("pages/sitelist/sitelist-page");                   
                }else{
                    this.showLoginError("Incorrect password");    
                }
                    
            }catch(e){
                this.showLoginError("Unexpected error");    
            }
        }else{
            //First time.
            //Generate random secret, encrypt with pwd and save as app-setting
            CryptoServices.CryptoService.CreateSecret(this.password);
            frameModule.topmost().navigate("pages/sitelist/sitelist-page");            
        }
    }
}