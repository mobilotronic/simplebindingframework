import * as i18next from "i18next";
import * as i18nextHttp from "i18next-http-backend";
import {ISBFLocalization,SBFManager} from "@mobilotronic/sbf";
import { DemoViewModel } from "./demoViewModel";


export class SBFDemo{
    private static demoViewModel : DemoViewModel;
    public static Initialize(){
        i18next.use(<any>i18nextHttp)
        .init({
            ns:["sbf.Demo"],
            nsSeparator:"@",
            fallbackLng:"en",
            lng: navigator.language || (<any>navigator).browserLanguage,
            supportedLngs:["el","en"],
            load:"languageOnly",
            backend:{
                loadPath: "locales/{{lng}}/{{ns}}.json"
            }
        }).then(()=>{
            let translator = <ISBFLocalization>{translate:(key:string)=>{ return i18next.t(key);}};
            SBFDemo.demoViewModel = new DemoViewModel(translator);
            SBFManager.applyBindings(document.documentElement,SBFDemo.demoViewModel,translator);
        });
    }
}

window.addEventListener("DOMContentLoaded", (event) => {
    SBFDemo.Initialize();
    window['SBFDemo'] = SBFDemo;
    window['SBFManager'] = SBFManager;
});