import {Site} from "./site";
//var ObservableArray = require("data/observable-array").ObservableArray<T>;
import {ObservableArray} from "data/observable-array";
var Sqlite = require("nativescript-sqlite");

export module SiteBackend{
    
    var data:Site[]=[new Site("Site1","www.site1.com","User1","Pwd1"),
                    new Site("Site2","www.site2.com","User2","Pwd2")];
                    
    var appDb;
                    
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
                    appDb = db;
                    console.log("db created!");
                },error => {
                    throw new Error("Error intializing DB: ${error}");
                });
            }, error => {
                throw new Error("Error creating DB: ${error}");
            });                            
    }
       
    export function LoadSites(filter:string):ObservableArray<Site>{      
        var source = new ObservableArray(data);
        return source;
    }
    
    export function SaveSite(site:Site){
        data.push(site);
        
        var sentence = "INSERT INTO Site (LastChange, InSync, Name, Url, User, Password) VALUES (?,?,?,?,?,?)";
        
        (new Sqlite("guaysin.db")).then(db => {
                db.execSQL(sentence, [1,2,site.Name,site.Url,site.User,site.Password]).then(id => {
                            console.log("INSERT RESULT", id);
                        }, error => {
                            console.log("INSERT ERROR", error);
                        });                
            
                db.close();
            },error => {
                throw new Error("Error opening DB: ${error}");
            }); 
    } 
}
