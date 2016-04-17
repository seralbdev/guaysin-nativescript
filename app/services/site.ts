
export module Sites{
    
    export class Site{       
        public constructor(public Name:string,public Url:string,public User:string,public Password:string,public Tags:string[]=[]){  
        }
        
        public Serialize():string{
            return JSON.stringify(this);    
        }
        
        public static Deserialize(Payload:string):Site{
            var site:Site = JSON.parse(Payload);
            return site;
        }
    }
}