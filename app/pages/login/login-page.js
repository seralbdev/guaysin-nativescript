"use strict";
var login_viewmodel_1 = require("./login-viewmodel");
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new login_viewmodel_1.LoginViewModel();
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=login-page.js.map