import {Site} from "./site";
import {ObservableArray} from "data/observable-array";
import {CryptoServices} from "./cryptoservice";
var Sqlite = require("nativescript-sqlite");

export module SiteBackend{
                  
    export function Initialize(){
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
                    console.log("db created!");
                    db.close();
                },error => {
                    throw new Error("Error intializing DB: ${error}");
                });
            }, error => {
                throw new Error("Error creating DB: ${error}");
            });                            
    }
       
    export function LoadSites(filter:string):ObservableArray<Site>{

        let sentence = "SELECT * FROM Site";
        let data = new ObservableArray<Site>();
        (new Sqlite("guaysin.db")).then(db => {
            db.all("SELECT * FROM Site;").then(rows => {
                for(let row in rows) {
                    let r=rows[row];
                    //let site = new Site(r[3],r[4],r[5],r[6],r[0]);
                    let site = new Site(CryptoServices.Decode(r[3]),
                                        CryptoServices.Decode(r[4]),
                                        CryptoServices.Decode(r[5]),
                                        CryptoServices.Decode(r[6]),
                                        r[0]);                   
                    data.push(site);                     
                }
            db.close();
            },error => {
                console.log("SELECT ERROR", error);
                throw new Error(error.message);
            })
        });
        
        return data;
    }
    
    export function SaveSite(site:Site){
              
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
                            console.log("INSERT RESULT", id);
                        }, error => {
                            console.log("INSERT ERROR", error);
                        });                
            
                db.close();
            },error => {
                throw new Error("Error opening DB: ${error}");
            }); 
    }
    
    export function DeleteSite(site:Site){
        if(site.Id!=undefined){
            let sentence = `DELETE FROM Site WHERE Id=${site.Id};`;
            (new Sqlite("guaysin.db")).then(db => {
                    db.execSQL(sentence).then(id => {
                                console.log("DELETE RESULT", id);
                            }, error => {
                                console.log("DELETE ERROR", error);
                            });                
                
            db.close();
            },error => {
                throw new Error("Error opening DB: ${error}");
            });             
        }      
    }   
}
