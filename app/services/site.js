//import {CryptoServices} from "./cryptoservice";
"use strict";
var Site = (function () {
    function Site(Name, Url, User, Password, Id, Tags) {
        if (Tags === void 0) { Tags = []; }
        this.Name = Name;
        this.Url = Url;
        this.User = User;
        this.Password = Password;
        this.Id = Id;
        this.Tags = Tags;
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
    Site.prototype.Serialize = function () {
        return JSON.stringify(this);
    };
    Site.Deserialize = function (Payload) {
        var site = JSON.parse(Payload);
        return site;
    };
    return Site;
}());
exports.Site = Site;
//# sourceMappingURL=site.js.map