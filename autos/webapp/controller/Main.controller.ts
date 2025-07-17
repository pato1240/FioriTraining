import Controller from "sap/ui/core/mvc/Controller";
import { Input$LiveChangeEvent } from "sap/m/Input";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";

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


}