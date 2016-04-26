//import {CryptoServices} from "./cryptoservice";
   
export class Site{       
    public constructor(public Name:string,public Url:string,public User:string,public Password:string,public Id?:number,public Tags:string[]=[]){  
    }
    
/*    public Encrypt():Site{
        let copy = new Site(CryptoServices.Encode(this.Name),
                            CryptoServices.Encode(this.Url),
                            CryptoServices.Encode(this.User),
                            CryptoServices.Encode(this.Password),
                            this.Id,this.Tags);
        return copy;
    }
    
    public static Decrypt(site:Site):Site{
        let copy = new Site(CryptoServices.Decode(site.Name),
                            CryptoServices.Decode(site.Url),
                            CryptoServices.Decode(site.User),
                            CryptoServices.Decode(site.Password),
                            site.Id,site.Tags);
        return copy;
    } */

       
    public Serialize():string{
        return JSON.stringify(this);    
    }
    
    public static Deserialize(Payload:string):Site{
        var site:Site = JSON.parse(Payload);
        return site;
    }
}