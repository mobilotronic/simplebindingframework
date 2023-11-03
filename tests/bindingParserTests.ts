import 'mocha';
import {assert} from "chai";
import {SBFBindingsParser} from "../src/common/sbfBindingsParser";
import {SBFObservable} from "../src";
import {SBF_CURRENT_BINDING_CONTEXT, SBFBindingHandlersRepository} from "../src/common/sbfCommon";
import {SBFValueBindingHandler} from "../src";
import {JSDOM} from "jsdom";
import {SBFAttributeBindingHandler} from "../src";
import {SBFEventBindingHandler} from "../src";
import {SBFClickBindingHandler} from "../src";
import {SBFForEachBindingHandler} from "../src";
import * as fs from "fs";
import * as path from "path";
import {SBFVisibleBindingHandler} from "../src";
import {SBFTextBindingHandler} from "../src";
import {ISBFClickHandlerOptions, ISBFForeachHandlerOptions, ISBFLocalization, ISBFSelectHandlerOptions} from "../src/common/interfaces";
import {SBFSelectBindingHandler} from "../src";
import {SBFManager} from "../src";
import {ISBFValueBindingHandlerOptions} from "../src/common/interfaces";

const DOM = new JSDOM(fs.readFileSync(path.join(__dirname,"./SBFTestPage.html"),"utf8"));
const locales = require('./sbf.Tests.json');
// @ts-ignore
// noinspection JSConstantReassignment
global.window = DOM.window;
// @ts-ignore
// noinspection JSConstantReassignment
global.document = DOM.window.document;
// @ts-ignore
// noinspection JSConstantReassignment,JSUnusedGlobalSymbols
global.MutationObserver = class {
    constructor() {}
    disconnect() {}
    observe() {}
};
const multiBindingOptions="value:{observable:SearchValue,keyboardTriggersChange:true};attr:{placeholder:Type Search,title:TitleAttribute};events:{keydown:inputSearchKeyDown}";
const valueBindingString = "value:SearchValue";
const attributeBindingString = "attr:{placeholder:Type Search,title:Search}"
const clickBindingString = "click:inputClick";
const eventsBindingString = "events:{keydown:inputSearchKeyDown,mousedown:inputMouseDown}";
const foreachBindingString = "foreach:TempData";
const visibleBindingString = "visible:IsVisible";
const textBindingString = "text:Hello";
const selectBindingString = "select:{data:TempData,valueField:id,displayField:code,value:SelectValue,selectionLabel:Choose an item}";
const subPropertiesBindingString = "value:options.configuration.textValue";

// noinspection JSUnusedGlobalSymbols
const viewModel = {
    SearchValue:new SBFObservable(null),
    TitleAttribute : new SBFObservable("Search"),
    inputSearchKeyDown:()=>{},
    inputClick:()=>{},
    inputMouseDown:()=>{},
    TempData:[
        {id:1,code:"0001",description:"item0001"},
        {id:2,code:"0002",description:"item0002"}
    ],
    IsVisible:new SBFObservable(true),
    SelectValue:new SBFObservable(null),
    options:{
        configuration:{
            textValue:new SBFObservable("subPropertiesBindingString")
        }
    }
};

describe("Binding parser tests",()=>{
    it("Multi binding options string",()=>{
        return new Promise<void>((resolve,reject)=>{
            let bindingsParser = new SBFBindingsParser();
            let element = document.createElement("INPUT");
            let bindingHandlers = bindingsParser.parseBindingOptions(multiBindingOptions,SBFBindingHandlersRepository,viewModel,element);
            try {
                element[SBF_CURRENT_BINDING_CONTEXT] = viewModel;
                for (let bindingHandler in bindingHandlers) {
                    // noinspection JSUnfilteredForInLoop
                    let bindingHandlerOptions = bindingHandlers[bindingHandler];
                    // noinspection JSUnfilteredForInLoop,JSUnfilteredForInLoop
                    switch (bindingHandler) {
                        case "value": {
                            //result = bindingsParser.bindingStringToOptions<ISBFValueBindingHandlerOptions>(bindingOptions[bindingHandler], viewModel);
                            let bindingHandler = new SBFValueBindingHandler(element, bindingHandlerOptions);
                            //testing handler accepting a binding options object.
                            // noinspection JSUnfilteredForInLoop
                            assert.equal(bindingHandler.bindingOptions.keyboardTriggersChange, true);
                            break;
                        }
                        case "attr":{
                            new SBFAttributeBindingHandler(element, bindingHandlerOptions);
                            //testing handler accepting a binding options object.
                            assert.equal(element.getAttribute("placeholder"),"Type Search");
                            assert.equal(element.getAttribute("title"),"Search");
                            break;
                        }
                        case "events":{
                            let bindingHandler = new SBFEventBindingHandler(element,bindingHandlerOptions);
                            // noinspection JSUnfilteredForInLoop
                            assert.equal((<any>bindingHandler).eventListenerProxies.length,1);
                            break;
                        }
                    }
                }
                resolve();
            }
            catch (error){
                assert.fail(error.message);
                reject();
            }
        });
    });
    it("Single Attribute binding string",()=>{
        return new Promise<void>((resolve,reject)=>{
            let bindingsParser = new SBFBindingsParser();
            let element = document.createElement("INPUT");
            let bindingOptions = bindingsParser.parseBindingOptions(attributeBindingString,SBFBindingHandlersRepository,viewModel,element);
            try{
                element[SBF_CURRENT_BINDING_CONTEXT] = viewModel;
                new SBFAttributeBindingHandler(element, bindingOptions["attr"]);
                //testing handler accepting a binding options object.
                assert.equal(element.getAttribute("placeholder"),"Type Search");
                assert.equal(element.getAttribute("title"),"Search");
                resolve();
            }
            catch (error){
                assert.fail(error.message);
                reject();
            }
        });
    });
    it("Single Click binding string",()=>{
        return new Promise<void>((resolve,reject)=>{
            let bindingsParser = new SBFBindingsParser();
            let element = document.createElement("INPUT");
            let bindingOptions = bindingsParser.parseBindingOptions(clickBindingString,SBFBindingHandlersRepository,viewModel,element);
            try{
                element[SBF_CURRENT_BINDING_CONTEXT] = viewModel;
                let bindingHandler = new SBFClickBindingHandler(element, <ISBFClickHandlerOptions>bindingOptions["click"]);
                assert.equal((<any>bindingHandler).clickEventHandler,viewModel.inputClick);
                resolve();
            }
            catch (error){
                assert.fail(error.message);
                reject();
            }
        });
    });
    it("Single Events binding string",()=>{
        return new Promise<void>((resolve,reject)=>{
            let bindingsParser = new SBFBindingsParser();
            let element = document.createElement("INPUT");
            let bindingOptions = bindingsParser.parseBindingOptions(eventsBindingString,SBFBindingHandlersRepository,viewModel,element);
            try{
                element[SBF_CURRENT_BINDING_CONTEXT] = viewModel;
                let bindingHandler = new SBFEventBindingHandler(element, bindingOptions["events"]);
                assert.equal((<any>bindingHandler).eventListenerProxies.length,2);
                assert.equal((<any>bindingHandler).eventListenerProxies[0].eventName,"keydown");
                assert.equal((<any>bindingHandler).eventListenerProxies[1].eventName,"mousedown");
                resolve();
            }
            catch (error){
                assert.fail(error.message);
                reject();
            }
        });
    });
    it("Single Foreach binding string",()=>{
        return new Promise<void>((resolve,reject)=>{
            let bindingsParser = new SBFBindingsParser();
            let element = document.createElement("UL");
            let bindingOptions = bindingsParser.parseBindingOptions(foreachBindingString,SBFBindingHandlersRepository,viewModel,element);
            try{
                element[SBF_CURRENT_BINDING_CONTEXT] = viewModel;
                let childElement = document.createElement("li");
                for(let i=0;i<=2;i++){
                    let spanElement = document.createElement("SPAN");
                    switch (i){
                        case 0:{spanElement.setAttribute("data-bind-sbf","text:id");break;}
                        case 1:{spanElement.setAttribute("data-bind-sbf","text:{observable:code,treatNumericStringsAsNumbers:false}");break;}
                        case 2:{spanElement.setAttribute("data-bind-sbf","text:description");break;}
                    }
                    childElement.appendChild(spanElement);
                }
                element.setAttribute("data-bind-sbf","foreach:TempData");
                element.appendChild(childElement);
                 new SBFForEachBindingHandler(element, <ISBFForeachHandlerOptions>bindingOptions["foreach"]);
                assert.equal(element.children.length,viewModel.TempData.length);
                for(let i=0;i<=element.children.length-1;i++){
                    assert.equal(element.children[i].children[0].textContent,viewModel.TempData[i].id.toString());
                    assert.equal(element.children[i].children[1].textContent,viewModel.TempData[i].code);
                    assert.equal(element.children[i].children[2].textContent,viewModel.TempData[i].description);
                }
                resolve();
            }
            catch (error){
                assert.fail(error.message);
                reject();
            }
        });
    });
    it("Single Template/Localization binding string",()=>{
        return new Promise<void>((resolve,reject)=>{
            // let bindingsParser = new SBFBindingsParser();
            // let bindingOptions = bindingsParser.parseBindingOptions(eventsBindingString,SBFBindingHandlersRepository,viewModel);
            try{
                let translator = <ISBFLocalization>{translate:(key:string)=>{
                        let splitted = key.split("@");
                        return locales[splitted[1]];
                    }
                };
                SBFManager.applyBindings(<HTMLElement>document.getElementById("bindingRoot"),viewModel,translator);
                let tbody = document.querySelector("tbody");
                let thead = document.querySelector("thead");
                if(thead){//testing localization
                    assert.equal(thead.querySelectorAll("th")[0].getAttribute("title"),"Id");
                }
                if(tbody){
                    assert.equal(tbody.querySelectorAll("tr").length,2);
                    assert.equal(tbody.querySelectorAll("tr")[0].querySelectorAll("td").length,3);
                    assert.equal(tbody.querySelectorAll("tr")[1].querySelectorAll("td").length,3);
                }
                resolve();
            }
            catch (error){
                assert.fail(error.message);
                reject();
            }
        });
    });
    it("Single Value binding string",()=>{
        return new Promise<void>((resolve,reject)=>{
            let bindingsParser = new SBFBindingsParser();
            let element = document.createElement("INPUT");
            let bindingOptions = bindingsParser.parseBindingOptions(valueBindingString,SBFBindingHandlersRepository,viewModel,element);
            try{
                element[SBF_CURRENT_BINDING_CONTEXT] = viewModel;
                let bindingHandler = new SBFValueBindingHandler(element, bindingOptions["value"]);
                assert.equal(bindingHandler.bindingOptions.keyboardTriggersChange, true);
                resolve();
            }
            catch (error){
                assert.fail(error.message);
                reject();
            }
        });
    });
    it("Single Visible binding string",()=>{
        return new Promise<void>((resolve,reject)=>{
            let bindingsParser = new SBFBindingsParser();
            let element = document.createElement("INPUT");
            let bindingOptions = bindingsParser.parseBindingOptions(visibleBindingString,SBFBindingHandlersRepository,viewModel,element);
            try{
                element[SBF_CURRENT_BINDING_CONTEXT] = viewModel;
                let bindingHandler = new SBFVisibleBindingHandler(element, bindingOptions["visible"]);
                assert.equal( bindingHandler.bindingOptions.observable ? bindingHandler.bindingOptions.observable.value : false,true);
                resolve();
            }
            catch (error){
                assert.fail(error.message);
                reject();
            }
        });
    });
    it("Single Text binding string",()=>{
        return new Promise<void>((resolve,reject)=>{
            let bindingsParser = new SBFBindingsParser();
            let element = document.createElement("INPUT");
            let bindingOptions = bindingsParser.parseBindingOptions(textBindingString,SBFBindingHandlersRepository,viewModel,element);
            try{
                element[SBF_CURRENT_BINDING_CONTEXT] = viewModel;
                let bindingHandler = new SBFTextBindingHandler(element, bindingOptions["text"]);
                assert.equal(bindingHandler.bindingOptions.observable ? bindingHandler.bindingOptions.observable.value : "Not Hello","Hello");
                resolve();
            }
            catch (error){
                assert.fail(error.message);
                reject();
            }
        });
    });
    it("Single Select binding string",()=>{
        return new Promise<void>((resolve,reject)=>{
            let bindingsParser = new SBFBindingsParser();
            let element = document.createElement("SELECT");
            let bindingOptions = bindingsParser.parseBindingOptions(selectBindingString,SBFBindingHandlersRepository,viewModel,element);
            try{
                element[SBF_CURRENT_BINDING_CONTEXT] = viewModel;
                // noinspection JSUnusedLocalSymbols
                let bindingHandler = new SBFSelectBindingHandler(element, <ISBFSelectHandlerOptions>bindingOptions["select"]);
                assert.equal(element.children.length,3);
                assert.equal(element.children[1].getAttribute("value"),"1");
                assert.equal(element.children[1].textContent,"0001");
                assert.equal(element.children[2].getAttribute("value"),"2");
                assert.equal(element.children[2].textContent,"0002");
                resolve();
            }
            catch (error){
                assert.fail(error.message);
                reject();
            }
        });
    });
    it("Sub properties binding string",()=>{
        return new Promise<void>((resolve,reject)=>{
            let bindingsParser = new SBFBindingsParser();
            let element : HTMLInputElement = <HTMLInputElement>document.createElement("INPUT");
            let bindingOptions = bindingsParser.parseBindingOptions(subPropertiesBindingString,SBFBindingHandlersRepository,viewModel,element);
            try{
                element[SBF_CURRENT_BINDING_CONTEXT] = viewModel;
                // noinspection JSUnusedLocalSymbols
                let bindingHandler = new SBFValueBindingHandler(element, <ISBFValueBindingHandlerOptions>bindingOptions["value"]);
                assert.equal(element.value,"subPropertiesBindingString");
                resolve();
            }
            catch (error){
                assert.fail(error.message);
                reject();
            }
        });
    });
});