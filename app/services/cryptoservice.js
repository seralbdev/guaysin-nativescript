"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appSettings = require("application-settings");
var CryptoJS = require("crypto-js");
var CryptoServices;
(function (CryptoServices) {
    var secret;
    function GetEncryptedSecret() {
        return appSettings.getString("SECRET");
    }
    function SetEncryptedSecret(ciphertext) {
        appSettings.setString("SECRET", ciphertext);
    }
    function UnblockSecret(Password) {
        var encryptedsecret = GetEncryptedSecret();
        var secrethex = CryptoJS.AES.decrypt(encryptedsecret, Password);
        var sec = secrethex.toString(CryptoJS.enc.Utf8);
        if (!sec) {
            return false;
        }
        secret = sec;
        return true;
    }
    CryptoServices.UnblockSecret = UnblockSecret;
    function CreateSecret(Password) {
        var randomstring = Math.random().toString(36).slice(-16);
        var ciphertexthex = CryptoJS.AES.encrypt(randomstring, Password);
        var ciphertext = ciphertexthex.toString();
        appSettings.setString("SECRET", ciphertext);
        secret = randomstring;
    }
    CryptoServices.CreateSecret = CreateSecret;
    function Encode(Payload) {
        if (!secret)
            throw new Error("Secret not ublocked");
        return CryptoJS.AES.encrypt(Payload, secret);
    }
    CryptoServices.Encode = Encode;
    function Decode(Payload) {
        if (!secret)
            throw new Error("Secret not ublocked");
        return CryptoJS.AES.decrypt(Payload, secret).toString(CryptoJS.enc.Utf8);
    }
    CryptoServices.Decode = Decode;
})(CryptoServices = exports.CryptoServices || (exports.CryptoServices = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyeXB0b3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrREFBcUQ7QUFDckQsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRXBDLElBQWMsY0FBYyxDQXlDM0I7QUF6Q0QsV0FBYyxjQUFjO0lBQ3BCLElBQUksTUFBYSxDQUFDO0lBRWxCO1FBQ0ksTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELDRCQUE0QixVQUFpQjtRQUN6QyxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsdUJBQThCLFFBQWU7UUFDekMsSUFBSSxlQUFlLEdBQUcsa0JBQWtCLEVBQUUsQ0FBQztRQUMzQyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEUsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELEVBQUUsQ0FBQSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQztZQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFUZSw0QkFBYSxnQkFTNUIsQ0FBQTtJQUVELHNCQUE2QixRQUFlO1FBQ3hDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekQsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLElBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQyxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBQyxVQUFVLENBQUMsQ0FBQztRQUMzQyxNQUFNLEdBQUcsWUFBWSxDQUFDO0lBQzFCLENBQUM7SUFOZSwyQkFBWSxlQU0zQixDQUFBO0lBRUQsZ0JBQXVCLE9BQWM7UUFDakMsRUFBRSxDQUFBLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDUCxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBQyxNQUFNLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBSmUscUJBQU0sU0FJckIsQ0FBQTtJQUVELGdCQUF1QixPQUFjO1FBQ2pDLEVBQUUsQ0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUplLHFCQUFNLFNBSXJCLENBQUE7QUFDVCxDQUFDLEVBekNhLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBeUMzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcHBTZXR0aW5ncyA9IHJlcXVpcmUoXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiKTtcbnZhciBDcnlwdG9KUyA9IHJlcXVpcmUoXCJjcnlwdG8tanNcIik7XG5cbmV4cG9ydCBtb2R1bGUgQ3J5cHRvU2VydmljZXN7XG4gICAgICAgIHZhciBzZWNyZXQ6c3RyaW5nO1xuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gR2V0RW5jcnlwdGVkU2VjcmV0KCk6c3RyaW5ne1xuICAgICAgICAgICAgcmV0dXJuIGFwcFNldHRpbmdzLmdldFN0cmluZyhcIlNFQ1JFVFwiKTsgICBcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIFNldEVuY3J5cHRlZFNlY3JldChjaXBoZXJ0ZXh0OnN0cmluZyl7XG4gICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJTRUNSRVRcIixjaXBoZXJ0ZXh0KTsgICAgXG4gICAgICAgIH1cblxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gVW5ibG9ja1NlY3JldChQYXNzd29yZDpzdHJpbmcpOmJvb2xlYW4ge1xuICAgICAgICAgICAgdmFyIGVuY3J5cHRlZHNlY3JldCA9IEdldEVuY3J5cHRlZFNlY3JldCgpO1xuICAgICAgICAgICAgdmFyIHNlY3JldGhleCA9IENyeXB0b0pTLkFFUy5kZWNyeXB0KGVuY3J5cHRlZHNlY3JldCwgUGFzc3dvcmQpO1xuICAgICAgICAgICAgdmFyIHNlYyA9IHNlY3JldGhleC50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XG4gICAgICAgICAgICBpZighc2VjKXsgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VjcmV0ID0gc2VjO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7ICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGV4cG9ydCBmdW5jdGlvbiBDcmVhdGVTZWNyZXQoUGFzc3dvcmQ6c3RyaW5nKTp2b2lkIHtcbiAgICAgICAgICAgIHZhciByYW5kb21zdHJpbmcgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgtMTYpO1xuICAgICAgICAgICAgdmFyIGNpcGhlcnRleHRoZXggPSBDcnlwdG9KUy5BRVMuZW5jcnlwdChyYW5kb21zdHJpbmcsUGFzc3dvcmQpO1xuICAgICAgICAgICAgdmFyIGNpcGhlcnRleHQgPSBjaXBoZXJ0ZXh0aGV4LnRvU3RyaW5nKCk7ICAgICAgICAgICAgXG4gICAgICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJTRUNSRVRcIixjaXBoZXJ0ZXh0KTtcbiAgICAgICAgICAgIHNlY3JldCA9IHJhbmRvbXN0cmluZzsgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gRW5jb2RlKFBheWxvYWQ6c3RyaW5nKTpzdHJpbmd7XG4gICAgICAgICAgICBpZighc2VjcmV0KVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNlY3JldCBub3QgdWJsb2NrZWRcIik7XG4gICAgICAgICAgICByZXR1cm4gQ3J5cHRvSlMuQUVTLmVuY3J5cHQoUGF5bG9hZCxzZWNyZXQpOyAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZXhwb3J0IGZ1bmN0aW9uIERlY29kZShQYXlsb2FkOnN0cmluZyk6c3RyaW5ne1xuICAgICAgICAgICAgaWYoIXNlY3JldClcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTZWNyZXQgbm90IHVibG9ja2VkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIENyeXB0b0pTLkFFUy5kZWNyeXB0KFBheWxvYWQsc2VjcmV0KS50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7ICAgICAgICAgICAgIFxuICAgICAgICB9ICAgICBcbn1cblxuIl19