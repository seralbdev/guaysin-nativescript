"use strict";
var sitelist_viewmodel_1 = require("./sitelist-viewmodel");
function navigatingTo(args) {
    var page = args.object;
    var vm = new sitelist_viewmodel_1.SiteListViewModel();
    vm.LoadSites();
    page.bindingContext = vm;
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=sitelist-page.js.map