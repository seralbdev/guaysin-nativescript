"use strict";
var siteform_viewmodel_1 = require("./siteform-viewmodel");
function navigatingTo(args) {
    var page = args.object;
    var site = page.navigationContext;
    console.log(site);
    var vm = new siteform_viewmodel_1.SiteFormViewModel(site);
    page.bindingContext = vm;
    vm.UpdateUi();
}
exports.navigatingTo = navigatingTo;
//# sourceMappingURL=siteform-page.js.map