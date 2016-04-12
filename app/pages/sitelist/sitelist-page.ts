import { EventData } from "data/observable";
import { Page } from "ui/page";
import { SiteListViewModel } from "./sitelist-viewmodel" 

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new SiteListViewModel();
}