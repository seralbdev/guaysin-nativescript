import {Site} from "./site";
//var ObservableArray = require("data/observable-array").ObservableArray<T>;
import {ObservableArray} from "data/observable-array";

export module SiteBackend{
    
    var data:Site[]=[new Site("Site1","www.site1.com","User1","Pwd1"),
                    new Site("Site2","www.site2.com","User2","Pwd2")];    
    
    export function LoadSites(filter:string):ObservableArray<Site>{      
        var source = new ObservableArray(data);
        return source;
    }
    
    export function SaveSite(site:Site){
        data.push(site);    
    } 
}
