"use strict";
var sitelist_viewmodel_1 = require("./sitelist-viewmodel");
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new sitelist_viewmodel_1.SiteListViewModel();
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=sitelist-page.js.map