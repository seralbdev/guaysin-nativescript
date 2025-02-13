import {Site} from "./site";
import {ObservableArray} from "data/observable-array";
import {File,Folder,path} from "file-system";
import {CryptoServices} from "./cryptoservice";
var Sqlite = require("nativescript-sqlite");

export module SiteBackend{
                  
    export function Initialize():Promise<any>{
        return new Promise<any>((resolve,reject) =>{
            var sentence = `CREATE TABLE Site (
                            Id INTEGER PRIMARY KEY AUTOINCREMENT,
                            LastChange NUMERIC NOT NULL,
                            InSync NUMERIC NOT NULL,
                            Name TEXT NOT NULL,
                            Url	TEXT NOT NULL,
                            User TEXT,
                            Password TEXT,
                            Tags TEXT);`;
                            
            (new Sqlite("guaysin.db")).then(db => {
                    db.execSQL(sentence).then(id => {
                        db.close();
                        resolve();
                    },error => {
                        reject(error);
                    });
                }, error => {
                    reject(error);
                });     
        });                       
    }
       
    export function LoadSites(filter:string):ObservableArray<Site>{
        let sentence = "SELECT * FROM Site";
        let data = new ObservableArray<Site>();
        let regexp:RegExp;
        if(filter)
            regexp = new RegExp(`.*${filter}.*`);
            
        (new Sqlite("guaysin.db")).then(db => {
            db.all(sentence).then(rows => {
                for(let row in rows) {
                    let r=rows[row];
                    //let site = new Site(r[3],r[4],r[5],r[6],r[0]);
                    let site = new Site(CryptoServices.Decode(r[3]),
                                        CryptoServices.Decode(r[4]),
                                        CryptoServices.Decode(r[5]),
                                        CryptoServices.Decode(r[6]),
                                        r[0]);
                    if(regexp){
                        if(regexp.test(site.Name))                                       
                            data.push(site);
                    }else{
                        data.push(site);    
                    }                                         
                }
                db.close();
            },error => {
                throw new Error(error.message);
            })
        });
        
        return data;
    }
    
    export function SaveSite(site:Site):Promise<any>{
        return new Promise<any>((resolve,reject)=>{
            let sentence:string;
            
            if(site.Id==undefined){
                sentence = "INSERT INTO Site (LastChange, InSync, Name, Url, User, Password) VALUES (?,?,?,?,?,?);";    
            }else{
                sentence = `UPDATE Site SET LastChange=?,InSync=?,Name=?,Url=?,User=?,Password=? WHERE Id=${site.Id};`;     
            }
            
            let params = [  1,2,  
                            CryptoServices.Encode(site.Name),
                            CryptoServices.Encode(site.Url),
                            CryptoServices.Encode(site.User),
                            CryptoServices.Encode(site.Password)
                        ];
            
            (new Sqlite("guaysin.db")).then(db => {
                    db.execSQL(sentence, params).then(id => {
                        db.close();
                        resolve();
                    }, error => {
                        reject(error);
                    });                
                },error => {
                    reject(error);
            }); 
        });
    }
    
    export function DeleteSite(site:Site):Promise<any>{
        return new Promise<any>((resolve,reject)=>{
            if(site.Id!=undefined){
                let sentence = `DELETE FROM Site WHERE Id=${site.Id};`;
                (new Sqlite("guaysin.db")).then(db => {
                    db.execSQL(sentence).then(id => {
                        db.close();
                        resolve();
                    }, error => {
                        reject(error);
                    });                                    
                },error => {
                    reject(error);
                });             
            } 
        });
    }

    function CleanSites():Promise<any>{
        return new Promise<any>((resolve,reject)=>{
            let sentence = `DELETE FROM Site;`;
            (new Sqlite("guaysin.db")).then(db => {
                db.execSQL(sentence).then(id => {
                    db.close();
                    resolve();
                }, error => {
                    reject(error);
                });                
            },error => {
                reject(error);
            });              
        });
    }

    function GetBackupFile():File{
        let downloadsFolderPath = path.join(android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).getAbsolutePath().toString());
        let downloadsFolder = Folder.fromPath(downloadsFolderPath);
        let file = downloadsFolder.getFile("guaysindata.json");
        return file;        
    }

    export function ExportToFile():Promise<any>{
        let sentence = "SELECT * FROM Site";

        return new Promise<any>((resolve,reject) =>{
            //get all sites and create array
            (new Sqlite("guaysin.db")).then(db => {
                db.all(sentence).then(rows => {
                    let data: Site[] = [];
                    for(let row in rows) {
                        let r=rows[row];
                        let site = new Site(CryptoServices.Decode(r[3]),
                                            CryptoServices.Decode(r[4]),
                                            CryptoServices.Decode(r[5]),
                                            CryptoServices.Decode(r[6]),
                                            r[0]);                                           
                        data.push(site);
                    }

                    db.close();

                    //let secret:string = CryptoServices.GetEncryptedSecret();
                    //let payload = {'secret':secret,'sites':data};

                    //prepare target file
                    let file = GetBackupFile();

                    //save and return
                    file.writeText(JSON.stringify(data)).then(() =>{
                        resolve();
                    },error =>{
                        reject(error);
                    })                      
                },error => {
                    reject(error);
                })
            });                       
        });        
    }

    export function ImportFromFile():Promise<any>{
        return new Promise<any>((resolve,reject)=>{
            let file = GetBackupFile();
            //1.Read JSON file
            file.readText().then((jsondata)=>{
                //let data = JSON.parse(jsondata);
                //let secret:string = data.secret;
                let sites:Site[] = JSON.parse(jsondata);
                //2.Clean DB
                CleanSites().then(()=>{
                    //3.Insert sites
                    sites.forEach((site)=>{
                        site.Id = undefined;
                        SaveSite(site);    
                    });
                    resolve();
                });
            });
        });
    }       
}
