import {Sites} from "./site";
//var ObservableArray = require("data/observable-array").ObservableArray<T>;
import {ObservableArray} from "data/observable-array";

export module SiteBackend{
    
    export function LoadSites(filter:string):ObservableArray<Sites.Site>{
        var data:Sites.Site[]=[];
        data.push(new Sites.Site("Site1","www.site1.com","User1","Pwd1"));
        data.push(new Sites.Site("Site2","www.site2.com","User2","Pwd2"));        
        var source = new ObservableArray(data);
        return source;
    } 
}
