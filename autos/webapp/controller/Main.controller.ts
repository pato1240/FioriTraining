import Controller from "sap/ui/core/mvc/Controller";
import { Input$LiveChangeEvent } from "sap/m/Input";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import Component from "../Component";
import Router from "sap/f/routing/Router";
import Event from "sap/ui/base/Event";
import ColumnListItem from "sap/m/ColumnListItem";
import Context from "sap/ui/model/odata/v2/Context";
import Path from "sap/suite/ui/commons/statusindicator/Path";


/**
 * @namespace vro.training.autos.controller
 */
export default class Main extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {

    }

    public onLiveChange(event: Input$LiveChangeEvent): void {
        const value = event.getParameter("value");
        console.log(value);

        const filters = [];
        if(value){
            filters.push(new Filter("Folio", FilterOperator.Contains, value));
        }

    }

    public onNavToDetails(event: Event): void {
        const router = (this.getOwnerComponent() as Component).getRouter() as Router;
        const item = event.getSource() as ColumnListItem;
        const binding = item.getBindingContext("zservice") as Context;
        const numFolio = binding.getProperty("Folio");
        
        router.navTo("RouteDetails", {
            numFolio: numFolio
        });
    }


}