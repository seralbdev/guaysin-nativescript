"use strict";
var site_1 = require("./site");
var observable_array_1 = require("data/observable-array");
var file_system_1 = require("file-system");
var cryptoservice_1 = require("./cryptoservice");
var Sqlite = require("nativescript-sqlite");
var SiteBackend;
(function (SiteBackend) {
    function Initialize() {
        var sentence = "CREATE TABLE Site (\n                        Id INTEGER PRIMARY KEY AUTOINCREMENT,\n                        LastChange NUMERIC NOT NULL,\n                        InSync NUMERIC NOT NULL,\n                        Name TEXT NOT NULL,\n                        Url\tTEXT NOT NULL,\n                        User TEXT,\n                        Password TEXT,\n                        Tags TEXT);";
        (new Sqlite("guaysin.db")).then(function (db) {
            db.execSQL(sentence).then(function (id) {
                console.log("db created!");
                db.close();
            }, function (error) {
                throw new Error("Error intializing DB: ${error}");
            });
        }, function (error) {
            throw new Error("Error creating DB: ${error}");
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
                console.log("SELECT ERROR", error);
                throw new Error(error.message);
            });
        });
        return data;
    }
    SiteBackend.LoadSites = LoadSites;
    function SaveSite(site) {
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
                console.log("INSERT RESULT", id);
            }, function (error) {
                console.log("INSERT ERROR", error);
            });
            db.close();
        }, function (error) {
            throw new Error("Error opening DB: ${error}");
        });
    }
    SiteBackend.SaveSite = SaveSite;
    function DeleteSite(site) {
        if (site.Id != undefined) {
            var sentence_1 = "DELETE FROM Site WHERE Id=" + site.Id + ";";
            (new Sqlite("guaysin.db")).then(function (db) {
                db.execSQL(sentence_1).then(function (id) {
                    console.log("DELETE RESULT", id);
                }, function (error) {
                    console.log("DELETE ERROR", error);
                });
                db.close();
            }, function (error) {
                throw new Error("Error opening DB: ${error}");
            });
        }
    }
    SiteBackend.DeleteSite = DeleteSite;
    function ExportToFile() {
        var sentence = "SELECT * FROM Site";
        return new Promise(function (resolve, reject) {
            //get all sites and create array
            (new Sqlite("guaysin.db")).then(function (db) {
                db.all(sentence).then(function (rows) {
                    var data = [];
                    console.log("enumerating records..");
                    for (var row in rows) {
                        console.log("new record..");
                        var r = rows[row];
                        var site = new site_1.Site(cryptoservice_1.CryptoServices.Decode(r[3]), cryptoservice_1.CryptoServices.Decode(r[4]), cryptoservice_1.CryptoServices.Decode(r[5]), cryptoservice_1.CryptoServices.Decode(r[6]), r[0]);
                        console.log("site: " + site.Name);
                        data.push(site);
                        console.log("push done");
                    }
                    console.log("closing db..");
                    db.close();
                    console.log("preparing file..");
                    //prepare target file
                    //let downloadsFolderPath = path.join(android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString());
                    var downloadsFolderPath = file_system_1.path.join(android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).getAbsolutePath().toString());
                    console.log(downloadsFolderPath);
                    var downloadsFolder = file_system_1.Folder.fromPath(downloadsFolderPath);
                    console.log(downloadsFolder.name);
                    var file = downloadsFolder.getFile("guaysindata.json");
                    console.log("saving file..");
                    //save and return
                    file.writeText(JSON.stringify(data)).then(function () {
                        console.log("done file!");
                        resolve();
                    }, function (error) {
                        console.log("FS ERROR " + error);
                        reject();
                    });
                }, function (error) {
                    console.log("SELECT ERROR " + error);
                    reject();
                });
            });
        });
    }
    SiteBackend.ExportToFile = ExportToFile;
})(SiteBackend = exports.SiteBackend || (exports.SiteBackend = {}));
//# sourceMappingURL=sitebackend.js.map