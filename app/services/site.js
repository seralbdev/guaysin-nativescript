//import {CryptoServices} from "./cryptoservice";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsaURBQWlEOzs7QUFFakQ7SUFDSSxjQUEwQixJQUFXLEVBQVEsR0FBVSxFQUFRLElBQVcsRUFBUSxRQUFlLEVBQVEsRUFBVSxFQUFRLElBQWdCO1FBQWhCLHFCQUFBLEVBQUEsU0FBZ0I7UUFBakgsU0FBSSxHQUFKLElBQUksQ0FBTztRQUFRLFFBQUcsR0FBSCxHQUFHLENBQU87UUFBUSxTQUFJLEdBQUosSUFBSSxDQUFPO1FBQVEsYUFBUSxHQUFSLFFBQVEsQ0FBTztRQUFRLE9BQUUsR0FBRixFQUFFLENBQVE7UUFBUSxTQUFJLEdBQUosSUFBSSxDQUFZO0lBQzNJLENBQUM7SUFFTDs7Ozs7Ozs7Ozs7Ozs7OztZQWdCUTtJQUdHLHdCQUFTLEdBQWhCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVhLGdCQUFXLEdBQXpCLFVBQTBCLE9BQWM7UUFDcEMsSUFBSSxJQUFJLEdBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FBQyxBQS9CRCxJQStCQztBQS9CWSxvQkFBSSIsInNvdXJjZXNDb250ZW50IjpbIi8vaW1wb3J0IHtDcnlwdG9TZXJ2aWNlc30gZnJvbSBcIi4vY3J5cHRvc2VydmljZVwiO1xuICAgXG5leHBvcnQgY2xhc3MgU2l0ZXsgICAgICAgXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHB1YmxpYyBOYW1lOnN0cmluZyxwdWJsaWMgVXJsOnN0cmluZyxwdWJsaWMgVXNlcjpzdHJpbmcscHVibGljIFBhc3N3b3JkOnN0cmluZyxwdWJsaWMgSWQ/Om51bWJlcixwdWJsaWMgVGFnczpzdHJpbmdbXT1bXSl7ICBcbiAgICB9XG4gICAgXG4vKiAgICBwdWJsaWMgRW5jcnlwdCgpOlNpdGV7XG4gICAgICAgIGxldCBjb3B5ID0gbmV3IFNpdGUoQ3J5cHRvU2VydmljZXMuRW5jb2RlKHRoaXMuTmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ3J5cHRvU2VydmljZXMuRW5jb2RlKHRoaXMuVXJsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDcnlwdG9TZXJ2aWNlcy5FbmNvZGUodGhpcy5Vc2VyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDcnlwdG9TZXJ2aWNlcy5FbmNvZGUodGhpcy5QYXNzd29yZCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5JZCx0aGlzLlRhZ3MpO1xuICAgICAgICByZXR1cm4gY29weTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHN0YXRpYyBEZWNyeXB0KHNpdGU6U2l0ZSk6U2l0ZXtcbiAgICAgICAgbGV0IGNvcHkgPSBuZXcgU2l0ZShDcnlwdG9TZXJ2aWNlcy5EZWNvZGUoc2l0ZS5OYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDcnlwdG9TZXJ2aWNlcy5EZWNvZGUoc2l0ZS5VcmwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENyeXB0b1NlcnZpY2VzLkRlY29kZShzaXRlLlVzZXIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENyeXB0b1NlcnZpY2VzLkRlY29kZShzaXRlLlBhc3N3b3JkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXRlLklkLHNpdGUuVGFncyk7XG4gICAgICAgIHJldHVybiBjb3B5O1xuICAgIH0gKi9cblxuICAgICAgIFxuICAgIHB1YmxpYyBTZXJpYWxpemUoKTpzdHJpbmd7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzKTsgICAgXG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBzdGF0aWMgRGVzZXJpYWxpemUoUGF5bG9hZDpzdHJpbmcpOlNpdGV7XG4gICAgICAgIHZhciBzaXRlOlNpdGUgPSBKU09OLnBhcnNlKFBheWxvYWQpO1xuICAgICAgICByZXR1cm4gc2l0ZTtcbiAgICB9XG59Il19