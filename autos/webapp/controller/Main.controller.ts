import Controller from "sap/ui/core/mvc/Controller";
import Input, { Input$LiveChangeEvent } from "sap/m/Input";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import Component from "../Component";
import Router from "sap/f/routing/Router";
import Event from "sap/ui/base/Event";
import ColumnListItem from "sap/m/ColumnListItem";
import Context from "sap/ui/model/odata/v2/Context";
import Table from "sap/m/Table";
import ListBinding from "sap/ui/model/ListBinding";
import DatePicker from "sap/m/DatePicker";


/**
 * @namespace vro.training.autos.controller
 */
export default class Main extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {

    }

    public onFilter (): void {

        const filters = [];

        const folio = (this.byId("folio") as Input).getValue();
        const centroEnt = (this.byId("centroEnt") as Input).getValue();
        let ticket = (this.byId("ticket") as Input).getValue();
        const centroSal = (this.byId("centroSal") as Input).getValue();
        const material = (this.byId("material") as Input).getValue();
        const numeroDoc = (this.byId("numeroDoc") as Input).getValue();
        const placa = (this.byId("placa") as Input).getValue();
        let entradaBascula = (this.byId("entradaBascula") as DatePicker).getValue();
        let salidaBascula = (this.byId("salidaBascula") as DatePicker).getValue();

        switch (ticket) {
            case "interno":
                ticket = "1"
                break;
            case "externo":
                    ticket = "2"
                    break;
            default: ""
                break;
        }

        if(entradaBascula){
            entradaBascula = this.formatDateToFilter(entradaBascula);
        }

        if (salidaBascula){
            salidaBascula = this.formatDateToFilter(salidaBascula);
        }


        if(folio){
            filters.push(new Filter("Folio", FilterOperator.EQ, folio));
        }
        if(centroEnt){
            filters.push(new Filter("CentroEnt", FilterOperator.EQ, centroEnt));
        }
        if(ticket){
            filters.push(new Filter("Tipoticket", FilterOperator.EQ, ticket));
        }
        if(centroSal){
            filters.push(new Filter("CentroSal", FilterOperator.EQ, centroSal));
        }
        if(material){
            filters.push(new Filter("Material", FilterOperator.Contains, material));
        }
        if(numeroDoc){
            filters.push(new Filter("NumeroDoc", FilterOperator.EQ, numeroDoc));
        }
        if(placa){
            filters.push(new Filter("Placa", FilterOperator.EQ, placa));
        }
        if(entradaBascula){
            filters.push(new Filter("FechaEntBas", FilterOperator.Contains, entradaBascula));
        }
        if(salidaBascula){
            filters.push(new Filter("FechaSalBas", FilterOperator.Contains, salidaBascula));
        }

        const resultsTable = this.byId("tablaResultado") as Table;
        const binding = resultsTable.getBinding("items") as ListBinding;
        binding.filter(filters);
    }

    private formatDateToFilter(fecha: string): string {
        const split = fecha.split("/");
            let mes = split[0];
            let dia = split[1];
            let anio = "20" + split[2];

            if (mes.length === 1){
                mes = "0" + mes
            }

            if (dia.length === 1){
                dia = "0" + dia
            }

            fecha = anio + mes + dia;

            return fecha;
    }

    public onAdaptFilters(): void {
        (this.byId("folio") as Input).setValue("");
        (this.byId("centroEnt") as Input).setValue("");
        (this.byId("ticket") as Input).setValue("");
        (this.byId("centroSal") as Input).setValue("");
        (this.byId("material") as Input).setValue("");
        (this.byId("numeroDoc") as Input).setValue("");
        (this.byId("placa") as Input).setValue("");
        (this.byId("entradaBascula") as DatePicker).setValue("");
        (this.byId("salidaBascula") as DatePicker).setValue("");

        const resultsTable = this.byId("tablaResultado") as Table;
        const binding = resultsTable.getBinding("items") as ListBinding;
        binding.filter([]);
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