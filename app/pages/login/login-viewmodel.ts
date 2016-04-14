import observable = require("data/observable");
import appSettings = require("application-settings");
import dialogs = require("ui/dialogs");
import frameModule = require("ui/frame")
var CryptoJS = require("crypto-js");

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
            //Password already saved
            //Decrypt it and compare
            //console.log(this.password);
            var encryptedpwd = appSettings.getString("PASSWORD");
            //console.log(encryptedpwd);
            var plainsavedpwdhex = CryptoJS.AES.decrypt(encryptedpwd, this.password);
            var plainsavedpwd =plainsavedpwdhex.toString(CryptoJS.enc.Utf8);  
            //console.log(plainsavedpwd);
            if(this.password==plainsavedpwd){
                var topmost = frameModule.topmost();
                topmost.navigate("pages/sitelist/sitelist-page");     
            }
            else{
                this.showLoginError();    
            }
        }else{
            //First time.Assign this one as pwd
            var ciphertexthex = CryptoJS.AES.encrypt(this.password,this.password);
            //console.log(ciphertexthex);
            var ciphertext = ciphertexthex.toString();
            //console.log(ciphertext);
            appSettings.setString("PASSWORD",ciphertext);
        }
    }
}