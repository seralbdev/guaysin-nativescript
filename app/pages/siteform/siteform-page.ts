import { EventData } from "data/observable";
import { Page } from "ui/page";
import { Site } from "../../services/site";
import { SiteFormViewModel } from "./siteform-viewmodel"; 

export function navigatingTo(args: EventData) {
    
    var page = <Page>args.object;
    var site = <Site>page.navigationContext;
    console.log(site);    
    var vm = new SiteFormViewModel(site);
    page.bindingContext = vm;
    vm.UpdateUi();
}