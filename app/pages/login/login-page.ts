import { EventData } from "data/observable";
import { Page } from "ui/page";
import { LoginViewModel } from "./login-viewmodel" 

export function navigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = new LoginViewModel();
}