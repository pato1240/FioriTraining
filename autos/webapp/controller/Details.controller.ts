import Controller from "sap/ui/core/mvc/Controller";
import Component from "../Component";
import Router from "sap/f/routing/Router";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import View from "sap/ui/core/mvc/View";
import History from "sap/ui/core/routing/History";

/**
 * @namespace vro.training.autos.controller
 */
export default class Details extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        const router = (this.getOwnerComponent() as Component).getRouter() as Router;
        router.getRoute("RouteDetails")?.attachPatternMatched(this.onObjectMatched, this);
    }

    public onObjectMatched(event: Route$PatternMatchedEvent): void {
        const arg = event.getParameter("arguments") as any;
        const folio = arg.numFolio as string;
        const view = this.getView() as View;

        view.bindElement({
            path: `/Folio('${folio}')`,
            model: "zservice",
        });
    }

    public navToBack(): void {
        const history = History.getInstance();
        const prevouiosHash = history.getPreviousHash();
        
        if (prevouiosHash !== undefined){
            window.history.go(-1);
        }else{
            const router = (this.getOwnerComponent() as Component).getRouter() as Router;
            router.navTo("RouteMain");
        }
    }


    
}