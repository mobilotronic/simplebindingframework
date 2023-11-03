import  expressJS = require("express")
import http = require("http");
import path = require("path");

export class SBFDemo{
    private webApp: expressJS.Express;
    private server: http.Server;

    private initialize(){
        this.webApp = expressJS();
        this.webApp.set("views",path.resolve(__dirname,"./views"));
        this.webApp.set("view engine","pug");
        this.webApp.set("port",8081);
        this.webApp.use(expressJS.static(__dirname)); 
        this.webApp.get("/",async (req,res)=>{
            try{
                res.render("demo");
            }
            catch(e){
                res.render("error_500");
            }
        });        
    }

    constructor(){
        try{
            this.initialize();
            this.server = this.webApp.listen(8081,"0.0.0.0");
        }
        catch(e){
            console.log(e);
            throw e;
        }
    }
}

new SBFDemo();