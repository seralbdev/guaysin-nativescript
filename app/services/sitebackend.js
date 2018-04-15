"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var site_1 = require("./site");
var observable_array_1 = require("data/observable-array");
var file_system_1 = require("file-system");
var cryptoservice_1 = require("./cryptoservice");
var Sqlite = require("nativescript-sqlite");
var http = require("http");
var SiteBackend;
(function (SiteBackend) {
    var CLOUD_BACKEND_PUSH_URL = "https://guaysinbackend1.azurewebsites.net/api/PushSites?code=8wgbzg4wovpMM9iLNgH96ApcK2YRi8nKwxj6OQag5EoHW6CwUkkVoQ==";
    var CLOUD_BACKEND_PULL_URL = "https://guaysinbackend1.azurewebsites.net/api/GetSites?code=mCb9xgHzd6f8x83awc8aqbWlOi74y7Djyt2iIB/tyxReYkCaBoiy8w==";
    function Initialize() {
        return new Promise(function (resolve, reject) {
            var sentence = "CREATE TABLE Site (\n                            Id INTEGER PRIMARY KEY AUTOINCREMENT,\n                            LastChange NUMERIC NOT NULL,\n                            InSync NUMERIC NOT NULL,\n                            Name TEXT NOT NULL,\n                            Url\tTEXT NOT NULL,\n                            User TEXT,\n                            Password TEXT,\n                            Tags TEXT);";
            (new Sqlite("guaysin.db")).then(function (db) {
                db.execSQL(sentence).then(function (id) {
                    db.close();
                    resolve();
                }, function (error) {
                    reject(error);
                });
            }, function (error) {
                reject(error);
            });
        });
    }
    SiteBackend.Initialize = Initialize;
    function LoadSites(filter) {
        var sentence = "SELECT * FROM Site";
        var data = new observable_array_1.ObservableArray();
        var regexp;
        if (filter)
            regexp = new RegExp(".*" + filter + ".*");
        (new Sqlite("guaysin.db")).then(function (db) {
            db.all(sentence).then(function (rows) {
                for (var row in rows) {
                    var r = rows[row];
                    //let site = new Site(r[3],r[4],r[5],r[6],r[0]);
                    var site = new site_1.Site(cryptoservice_1.CryptoServices.Decode(r[3]), cryptoservice_1.CryptoServices.Decode(r[4]), cryptoservice_1.CryptoServices.Decode(r[5]), cryptoservice_1.CryptoServices.Decode(r[6]), r[0]);
                    if (regexp) {
                        if (regexp.test(site.Name))
                            data.push(site);
                    }
                    else {
                        data.push(site);
                    }
                }
                db.close();
            }, function (error) {
                throw new Error(error.message);
            });
        });
        return data;
    }
    SiteBackend.LoadSites = LoadSites;
    function SaveSite(site) {
        return new Promise(function (resolve, reject) {
            var sentence;
            if (site.Id == undefined) {
                sentence = "INSERT INTO Site (LastChange, InSync, Name, Url, User, Password) VALUES (?,?,?,?,?,?);";
            }
            else {
                sentence = "UPDATE Site SET LastChange=?,InSync=?,Name=?,Url=?,User=?,Password=? WHERE Id=" + site.Id + ";";
            }
            var params = [1, 2,
                cryptoservice_1.CryptoServices.Encode(site.Name),
                cryptoservice_1.CryptoServices.Encode(site.Url),
                cryptoservice_1.CryptoServices.Encode(site.User),
                cryptoservice_1.CryptoServices.Encode(site.Password)
            ];
            (new Sqlite("guaysin.db")).then(function (db) {
                db.execSQL(sentence, params).then(function (id) {
                    db.close();
                    resolve();
                }, function (error) {
                    reject(error);
                });
            }, function (error) {
                reject(error);
            });
        });
    }
    SiteBackend.SaveSite = SaveSite;
    function DeleteSite(site) {
        return new Promise(function (resolve, reject) {
            if (site.Id != undefined) {
                var sentence_1 = "DELETE FROM Site WHERE Id=" + site.Id + ";";
                (new Sqlite("guaysin.db")).then(function (db) {
                    db.execSQL(sentence_1).then(function (id) {
                        db.close();
                        resolve();
                    }, function (error) {
                        reject(error);
                    });
                }, function (error) {
                    reject(error);
                });
            }
        });
    }
    SiteBackend.DeleteSite = DeleteSite;
    function CleanSites() {
        return new Promise(function (resolve, reject) {
            var sentence = "DELETE FROM Site;";
            (new Sqlite("guaysin.db")).then(function (db) {
                db.execSQL(sentence).then(function (id) {
                    db.close();
                    resolve();
                }, function (error) {
                    reject(error);
                });
            }, function (error) {
                reject(error);
            });
        });
    }
    function GetBackupFile() {
        var downloadsFolderPath = file_system_1.path.join(android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).getAbsolutePath().toString());
        var downloadsFolder = file_system_1.Folder.fromPath(downloadsFolderPath);
        var file = downloadsFolder.getFile("guaysindata.json");
        return file;
    }
    function ExportToFile() {
        var sentence = "SELECT * FROM Site";
        return new Promise(function (resolve, reject) {
            //get all sites and create array
            (new Sqlite("guaysin.db")).then(function (db) {
                db.all(sentence).then(function (rows) {
                    var data = [];
                    for (var row in rows) {
                        var r = rows[row];
                        var site = new site_1.Site(cryptoservice_1.CryptoServices.Decode(r[3]), cryptoservice_1.CryptoServices.Decode(r[4]), cryptoservice_1.CryptoServices.Decode(r[5]), cryptoservice_1.CryptoServices.Decode(r[6]), r[0]);
                        data.push(site);
                    }
                    db.close();
                    //let secret:string = CryptoServices.GetEncryptedSecret();
                    //let payload = {'secret':secret,'sites':data};
                    //prepare target file
                    var file = GetBackupFile();
                    //save and return
                    file.writeText(JSON.stringify(data)).then(function () {
                        resolve();
                    }, function (error) {
                        reject(error);
                    });
                }, function (error) {
                    reject(error);
                });
            });
        });
    }
    SiteBackend.ExportToFile = ExportToFile;
    function ImportFromFile() {
        return new Promise(function (resolve, reject) {
            var file = GetBackupFile();
            //1.Read JSON file
            file.readText().then(function (jsondata) {
                //let data = JSON.parse(jsondata);
                //let secret:string = data.secret;
                var sites = JSON.parse(jsondata);
                //2.Clean DB
                CleanSites().then(function () {
                    //3.Insert sites
                    sites.forEach(function (site) {
                        site.Id = undefined;
                        SaveSite(site);
                    });
                    resolve();
                });
            });
        });
    }
    SiteBackend.ImportFromFile = ImportFromFile;
    function ExportToCloud() {
        var sentence = "SELECT * FROM Site";
        return new Promise(function (resolve, reject) {
            //get all sites and create array
            (new Sqlite("guaysin.db")).then(function (db) {
                db.all(sentence).then(function (rows) {
                    var data = [];
                    for (var row in rows) {
                        var r = rows[row];
                        data.push({
                            SiteName: r[3],
                            SiteUrl: r[4],
                            SiteUser: r[5],
                            SitePassword: r[6] //password                       
                        });
                    }
                    db.close();
                    var secret = cryptoservice_1.CryptoServices.GetEncryptedSecret();
                    http.request({
                        url: CLOUD_BACKEND_PUSH_URL,
                        method: "POST",
                        headers: { 'Token': 'token1', 'MasterS': secret, 'Content-Type': 'application/json' },
                        content: JSON.stringify(data)
                    }).then(function (response) {
                        console.log(response.statusCode);
                        resolve();
                    }, function (e) {
                        console.log("Error occurred " + e);
                        reject(e);
                    });
                }, function (error) {
                    reject(error);
                });
            });
        });
    }
    SiteBackend.ExportToCloud = ExportToCloud;
    function ImportFromCloud() {
        return new Promise(function (resolve, reject) {
            //get site data from backend
            http.request({
                url: CLOUD_BACKEND_PULL_URL,
                method: "GET",
                headers: { 'Token': 'token1', 'Content-Type': 'application/json' }
            }).then(function (response) {
                //read secret from header in response
                var secret = response.headers["MasterS"];
                cryptoservice_1.CryptoServices.SetEncryptedSecret(secret);
                //parse JSON array in response body
                var cloudsites = JSON.parse(response.content);
                //Clean current DB content
                CleanSites().then(function () {
                    //Insert sites
                    cloudsites.forEach(function (cloudsite) {
                        var site = new site_1.Site(cryptoservice_1.CryptoServices.Decode(cloudsite.SiteName), cryptoservice_1.CryptoServices.Decode(cloudsite.SiteUrl), cryptoservice_1.CryptoServices.Decode(cloudsite.SiteUser), cryptoservice_1.CryptoServices.Decode(cloudsite.SitePassword), undefined);
                        SaveSite(site);
                    });
                    resolve();
                }, function (error) {
                    reject(error);
                });
            }, function (error) {
                reject(error);
            });
        });
    }
    SiteBackend.ImportFromCloud = ImportFromCloud;
})(SiteBackend = exports.SiteBackend || (exports.SiteBackend = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZWJhY2tlbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaXRlYmFja2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUE0QjtBQUM1QiwwREFBc0Q7QUFDdEQsMkNBQTZDO0FBQzdDLGlEQUErQztBQUMvQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUM1QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFM0IsSUFBYyxXQUFXLENBcVJ4QjtBQXJSRCxXQUFjLFdBQVc7SUFFckIsSUFBSSxzQkFBc0IsR0FBVSx1SEFBdUgsQ0FBQztJQUM1SixJQUFJLHNCQUFzQixHQUFVLHNIQUFzSCxDQUFDO0lBRzNKO1FBQ0ksTUFBTSxDQUFDLElBQUksT0FBTyxDQUFNLFVBQUMsT0FBTyxFQUFDLE1BQU07WUFDbkMsSUFBSSxRQUFRLEdBQUcsdWFBUWEsQ0FBQztZQUU3QixDQUFDLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtnQkFDMUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO29CQUN4QixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ1gsT0FBTyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQyxFQUFDLFVBQUEsS0FBSztvQkFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxFQUFFLFVBQUEsS0FBSztnQkFDSixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUF2QmUsc0JBQVUsYUF1QnpCLENBQUE7SUFFRCxtQkFBMEIsTUFBYTtRQUNuQyxJQUFJLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQztRQUNwQyxJQUFJ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SztvQkFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxFQUFDLFVBQUEsS0FBSztnQkFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUF2Q2UsMkJBQWUsa0JBdUM5QixDQUFBO0FBQ0wsQ0FBQyxFQXJSYSxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQXFSeEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NpdGV9IGZyb20gXCIuL3NpdGVcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZUFycmF5fSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQge0ZpbGUsRm9sZGVyLHBhdGh9IGZyb20gXCJmaWxlLXN5c3RlbVwiO1xuaW1wb3J0IHtDcnlwdG9TZXJ2aWNlc30gZnJvbSBcIi4vY3J5cHRvc2VydmljZVwiO1xudmFyIFNxbGl0ZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc3FsaXRlXCIpO1xudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcblxuZXhwb3J0IG1vZHVsZSBTaXRlQmFja2VuZHtcblxuICAgIHZhciBDTE9VRF9CQUNLRU5EX1BVU0hfVVJMOnN0cmluZyA9IFwiaHR0cHM6Ly9ndWF5c2luYmFja2VuZDEuYXp1cmV3ZWJzaXRlcy5uZXQvYXBpL1B1c2hTaXRlcz9jb2RlPTh3Z2J6ZzR3b3ZwTU05aUxOZ0g5NkFwY0syWVJpOG5Ld3hqNk9RYWc1RW9IVzZDd1Vra1ZvUT09XCI7XG4gICAgdmFyIENMT1VEX0JBQ0tFTkRfUFVMTF9VUkw6c3RyaW5nID0gXCJodHRwczovL2d1YXlzaW5iYWNrZW5kMS5henVyZXdlYnNpdGVzLm5ldC9hcGkvR2V0U2l0ZXM/Y29kZT1tQ2I5eGdIemQ2Zjh4ODNhd2M4YXFiV2xPaTc0eTdEanl0MmlJQi90eXhSZVlrQ2FCb2l5OHc9PVwiO1xuICAgIFxuICAgICAgICAgICAgICAgICAgXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEluaXRpYWxpemUoKTpQcm9taXNlPGFueT57XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLHJlamVjdCkgPT57XG4gICAgICAgICAgICB2YXIgc2VudGVuY2UgPSBgQ1JFQVRFIFRBQkxFIFNpdGUgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMYXN0Q2hhbmdlIE5VTUVSSUMgTk9UIE5VTEwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSW5TeW5jIE5VTUVSSUMgTk9UIE5VTEwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmFtZSBURVhUIE5PVCBOVUxMLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVybFx0VEVYVCBOT1QgTlVMTCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVc2VyIFRFWFQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFzc3dvcmQgVEVYVCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUYWdzIFRFWFQpO2A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAobmV3IFNxbGl0ZShcImd1YXlzaW4uZGJcIikpLnRoZW4oZGIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkYi5leGVjU1FMKHNlbnRlbmNlKS50aGVuKGlkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRiLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pOyAgICAgXG4gICAgICAgIH0pOyAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgfVxuICAgICAgIFxuICAgIGV4cG9ydCBmdW5jdGlvbiBMb2FkU2l0ZXMoZmlsdGVyOnN0cmluZyk6T2JzZXJ2YWJsZUFycmF5PFNpdGU+e1xuICAgICAgICBsZXQgc2VudGVuY2UgPSBcIlNFTEVDVCAqIEZST00gU2l0ZVwiO1xuICAgICAgICBsZXQgZGF0YSA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8U2l0ZT4oKTtcbiAgICAgICAgbGV0IHJlZ2V4cDpSZWdFeHA7XG4gICAgICAgIGlmKGZpbHRlcilcbiAgICAgICAgICAgIHJlZ2V4cCA9IG5ldyBSZWdFeHAoYC4qJHtmaWx0ZXJ9LipgKTtcbiAgICAgICAgICAgIFxuICAgICAgICAobmV3IFNxbGl0ZShcImd1YXlzaW4uZGJcIikpLnRoZW4oZGIgPT4ge1xuICAgICAgICAgICAgZGIuYWxsKHNlbnRlbmNlKS50aGVuKHJvd3MgPT4ge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgcm93IGluIHJvd3MpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHI9cm93c1tyb3ddO1xuICAgICAgICAgICAgICAgICAgICAvL2xldCBzaXRlID0gbmV3IFNpdGUoclszXSxyWzRdLHJbNV0scls2XSxyWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpdGUgPSBuZXcgU2l0ZShDcnlwdG9TZXJ2aWNlcy5EZWNvZGUoclszXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ3J5cHRvU2VydmljZXMuRGVjb2RlKHJbNF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENyeXB0b1NlcnZpY2VzLkRlY29kZShyWzVdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDcnlwdG9TZXJ2aWNlcy5EZWNvZGUocls2XSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgclswXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlZ2V4cCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZWdleHAudGVzdChzaXRlLk5hbWUpKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaChzaXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2goc2l0ZSk7ICAgIFxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGIuY2xvc2UoKTtcbiAgICAgICAgICAgIH0sZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIFxuICAgIGV4cG9ydCBmdW5jdGlvbiBTYXZlU2l0ZShzaXRlOlNpdGUpOlByb21pc2U8YW55PntcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUscmVqZWN0KT0+e1xuICAgICAgICAgICAgbGV0IHNlbnRlbmNlOnN0cmluZztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoc2l0ZS5JZD09dW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICBzZW50ZW5jZSA9IFwiSU5TRVJUIElOVE8gU2l0ZSAoTGFzdENoYW5nZSwgSW5TeW5jLCBOYW1lLCBVcmwsIFVzZXIsIFBhc3N3b3JkKSBWQUxVRVMgKD8sPyw/LD8sPyw/KTtcIjsgICAgXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBzZW50ZW5jZSA9IGBVUERBVEUgU2l0ZSBTRVQgTGFzdENoYW5nZT0/LEluU3luYz0/LE5hbWU9PyxVcmw9PyxVc2VyPT8sUGFzc3dvcmQ9PyBXSEVSRSBJZD0ke3NpdGUuSWR9O2A7ICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHBhcmFtcyA9IFsgIDEsMiwgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENyeXB0b1NlcnZpY2VzLkVuY29kZShzaXRlLk5hbWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENyeXB0b1NlcnZpY2VzLkVuY29kZShzaXRlLlVybCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ3J5cHRvU2VydmljZXMuRW5jb2RlKHNpdGUuVXNlciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ3J5cHRvU2VydmljZXMuRW5jb2RlKHNpdGUuUGFzc3dvcmQpXG4gICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAobmV3IFNxbGl0ZShcImd1YXlzaW4uZGJcIikpLnRoZW4oZGIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkYi5leGVjU1FMKHNlbnRlbmNlLCBwYXJhbXMpLnRoZW4oaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGIuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0sZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7IFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgZXhwb3J0IGZ1bmN0aW9uIERlbGV0ZVNpdGUoc2l0ZTpTaXRlKTpQcm9taXNlPGFueT57XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLHJlamVjdCk9PntcbiAgICAgICAgICAgIGlmKHNpdGUuSWQhPXVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgbGV0IHNlbnRlbmNlID0gYERFTEVURSBGUk9NIFNpdGUgV0hFUkUgSWQ9JHtzaXRlLklkfTtgO1xuICAgICAgICAgICAgICAgIChuZXcgU3FsaXRlKFwiZ3VheXNpbi5kYlwiKSkudGhlbihkYiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRiLmV4ZWNTUUwoc2VudGVuY2UpLnRoZW4oaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGIuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSxlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gQ2xlYW5TaXRlcygpOlByb21pc2U8YW55PntcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUscmVqZWN0KT0+e1xuICAgICAgICAgICAgbGV0IHNlbnRlbmNlID0gYERFTEVURSBGUk9NIFNpdGU7YDtcbiAgICAgICAgICAgIChuZXcgU3FsaXRlKFwiZ3VheXNpbi5kYlwiKSkudGhlbihkYiA9PiB7XG4gICAgICAgICAgICAgICAgZGIuZXhlY1NRTChzZW50ZW5jZSkudGhlbihpZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRiLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSxlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pOyAgICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIEdldEJhY2t1cEZpbGUoKTpGaWxle1xuICAgICAgICBsZXQgZG93bmxvYWRzRm9sZGVyUGF0aCA9IHBhdGguam9pbihhbmRyb2lkLm9zLkVudmlyb25tZW50LmdldEV4dGVybmFsU3RvcmFnZVB1YmxpY0RpcmVjdG9yeShhbmRyb2lkLm9zLkVudmlyb25tZW50LkRJUkVDVE9SWV9ET1dOTE9BRFMpLmdldEFic29sdXRlUGF0aCgpLnRvU3RyaW5nKCkpO1xuICAgICAgICBsZXQgZG93bmxvYWRzRm9sZGVyID0gRm9sZGVyLmZyb21QYXRoKGRvd25sb2Fkc0ZvbGRlclBhdGgpO1xuICAgICAgICBsZXQgZmlsZSA9IGRvd25sb2Fkc0ZvbGRlci5nZXRGaWxlKFwiZ3VheXNpbmRhdGEuanNvblwiKTtcbiAgICAgICAgcmV0dXJuIGZpbGU7ICAgICAgICBcbiAgICB9XG5cbiAgICBleHBvcnQgZnVuY3Rpb24gRXhwb3J0VG9GaWxlKCk6UHJvbWlzZTxhbnk+e1xuICAgICAgICBsZXQgc2VudGVuY2UgPSBcIlNFTEVDVCAqIEZST00gU2l0ZVwiO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLHJlamVjdCkgPT57XG4gICAgICAgICAgICAvL2dldCBhbGwgc2l0ZXMgYW5kIGNyZWF0ZSBhcnJheVxuICAgICAgICAgICAgKG5ldyBTcWxpdGUoXCJndWF5c2luLmRiXCIpKS50aGVuKGRiID0+IHtcbiAgICAgICAgICAgICAgICBkYi5hbGwoc2VudGVuY2UpLnRoZW4ocm93cyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhOiBTaXRlW10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCByb3cgaW4gcm93cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHI9cm93c1tyb3ddO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNpdGUgPSBuZXcgU2l0ZShDcnlwdG9TZXJ2aWNlcy5EZWNvZGUoclszXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENyeXB0b1NlcnZpY2VzLkRlY29kZShyWzRdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ3J5cHRvU2VydmljZXMuRGVjb2RlKHJbNV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDcnlwdG9TZXJ2aWNlcy5EZWNvZGUocls2XSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJbMF0pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaChzaXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGRiLmNsb3NlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgc2VjcmV0OnN0cmluZyA9IENyeXB0b1NlcnZpY2VzLkdldEVuY3J5cHRlZFNlY3JldCgpO1xuICAgICAgICAgICAgICAgICAgICAvL2xldCBwYXlsb2FkID0geydzZWNyZXQnOnNlY3JldCwnc2l0ZXMnOmRhdGF9O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vcHJlcGFyZSB0YXJnZXQgZmlsZVxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZSA9IEdldEJhY2t1cEZpbGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAvL3NhdmUgYW5kIHJldHVyblxuICAgICAgICAgICAgICAgICAgICBmaWxlLndyaXRlVGV4dChKU09OLnN0cmluZ2lmeShkYXRhKSkudGhlbigoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSxlcnJvciA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0sZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB9KTsgICAgICAgIFxuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBJbXBvcnRGcm9tRmlsZSgpOlByb21pc2U8YW55PntcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUscmVqZWN0KT0+e1xuICAgICAgICAgICAgbGV0IGZpbGUgPSBHZXRCYWNrdXBGaWxlKCk7XG4gICAgICAgICAgICAvLzEuUmVhZCBKU09OIGZpbGVcbiAgICAgICAgICAgIGZpbGUucmVhZFRleHQoKS50aGVuKChqc29uZGF0YSk9PntcbiAgICAgICAgICAgICAgICAvL2xldCBkYXRhID0gSlNPTi5wYXJzZShqc29uZGF0YSk7XG4gICAgICAgICAgICAgICAgLy9sZXQgc2VjcmV0OnN0cmluZyA9IGRhdGEuc2VjcmV0O1xuICAgICAgICAgICAgICAgIGxldCBzaXRlczpTaXRlW10gPSBKU09OLnBhcnNlKGpzb25kYXRhKTtcbiAgICAgICAgICAgICAgICAvLzIuQ2xlYW4gREJcbiAgICAgICAgICAgICAgICBDbGVhblNpdGVzKCkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICAgICAvLzMuSW5zZXJ0IHNpdGVzXG4gICAgICAgICAgICAgICAgICAgIHNpdGVzLmZvckVhY2goKHNpdGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXRlLklkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgU2F2ZVNpdGUoc2l0ZSk7ICAgIFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBleHBvcnQgZnVuY3Rpb24gRXhwb3J0VG9DbG91ZCgpOlByb21pc2U8YW55PntcbiAgICAgICAgbGV0IHNlbnRlbmNlID0gXCJTRUxFQ1QgKiBGUk9NIFNpdGVcIjtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSxyZWplY3QpID0+e1xuICAgICAgICAgICAgLy9nZXQgYWxsIHNpdGVzIGFuZCBjcmVhdGUgYXJyYXlcbiAgICAgICAgICAgIChuZXcgU3FsaXRlKFwiZ3VheXNpbi5kYlwiKSkudGhlbihkYiA9PiB7XG4gICAgICAgICAgICAgICAgZGIuYWxsKHNlbnRlbmNlKS50aGVuKHJvd3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHJvdyBpbiByb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcj1yb3dzW3Jvd107ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2l0ZU5hbWU6clszXSwgICAgICAvL25hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXRlVXJsOnJbNF0sICAgICAgIC8vdXJsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU2l0ZVVzZXI6cls1XSwgICAgICAvL3VzZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaXRlUGFzc3dvcmQ6cls2XSAgIC8vcGFzc3dvcmQgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBkYi5jbG9zZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWNyZXQ6c3RyaW5nID0gQ3J5cHRvU2VydmljZXMuR2V0RW5jcnlwdGVkU2VjcmV0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaHR0cC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDpDTE9VRF9CQUNLRU5EX1BVU0hfVVJMLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsnVG9rZW4nOid0b2tlbjEnLCdNYXN0ZXJTJzpzZWNyZXQsJ0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL2pzb24nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXNDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igb2NjdXJyZWQgXCIgKyBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSxlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pOyAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIH0pOyAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIGV4cG9ydCBmdW5jdGlvbiBJbXBvcnRGcm9tQ2xvdWQoKTpQcm9taXNlPGFueT57XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUscmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIC8vZ2V0IHNpdGUgZGF0YSBmcm9tIGJhY2tlbmRcbiAgICAgICAgICAgIGh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsOkNMT1VEX0JBQ0tFTkRfUFVMTF9VUkwsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsnVG9rZW4nOid0b2tlbjEnLCdDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi9qc29uJ31cbiAgICAgICAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy9yZWFkIHNlY3JldCBmcm9tIGhlYWRlciBpbiByZXNwb25zZVxuICAgICAgICAgICAgICAgIHZhciBzZWNyZXQgPSByZXNwb25zZS5oZWFkZXJzW1wiTWFzdGVyU1wiXTtcbiAgICAgICAgICAgICAgICBDcnlwdG9TZXJ2aWNlcy5TZXRFbmNyeXB0ZWRTZWNyZXQoc2VjcmV0KTtcblxuICAgICAgICAgICAgICAgIC8vcGFyc2UgSlNPTiBhcnJheSBpbiByZXNwb25zZSBib2R5XG4gICAgICAgICAgICAgICAgdmFyIGNsb3Vkc2l0ZXMgPSBKU09OLnBhcnNlKHJlc3BvbnNlLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vQ2xlYW4gY3VycmVudCBEQiBjb250ZW50XG4gICAgICAgICAgICAgICAgQ2xlYW5TaXRlcygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL0luc2VydCBzaXRlc1xuICAgICAgICAgICAgICAgICAgICBjbG91ZHNpdGVzLmZvckVhY2goKGNsb3Vkc2l0ZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzaXRlID0gbmV3IFNpdGUoQ3J5cHRvU2VydmljZXMuRGVjb2RlKGNsb3Vkc2l0ZS5TaXRlTmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBDcnlwdG9TZXJ2aWNlcy5EZWNvZGUoY2xvdWRzaXRlLlNpdGVVcmwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgQ3J5cHRvU2VydmljZXMuRGVjb2RlKGNsb3Vkc2l0ZS5TaXRlVXNlciksXG4gICAgICAgICAgICAgICAgICAgICAgICBDcnlwdG9TZXJ2aWNlcy5EZWNvZGUoY2xvdWRzaXRlLlNpdGVQYXNzd29yZCksXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgU2F2ZVNpdGUoc2l0ZSk7ICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuXG4gICAgICAgICAgICAgICAgfSxlcnJvciA9PntcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sZXJyb3I9PntcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0gICAgXG59XG4iXX0=