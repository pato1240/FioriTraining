import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Controller from "sap/ui/core/mvc/Controller";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import DateFormat from "sap/ui/core/format/DateFormat";
import values from "sap/base/util/values";


export default {
    ticketTypeText: function(this:Controller, type:string) {
        const resource = (this.getOwnerComponent()?.getModel("i18n") as ResourceModel).getResourceBundle() as ResourceBundle;

        switch(type) {
            case '1': return resource.getText("tipoInterno");
            case '2': return resource.getText("tipoExterno");
            default:
                return type;
        }
    },

    processText: function(this:Controller, type:string) {
        const resource = (this.getOwnerComponent()?.getModel("i18n") as ResourceModel).getResourceBundle() as ResourceBundle;

        switch(type) {
            case '1': return resource.getText("entrada");
            case '2': return resource.getText("salida");
            case '3': return resource.getText("traslados");
            case '4': return resource.getText("venta");
            case '5': return resource.getText("pesaje");
            case '6': return resource.getText("otros");
            default:
                return "";
        }
    },

    dateFormat: function(this:Controller, date:string) {
        if(!date || date.length !==15) {
            return "";
        }

        const year = date.substring(0, 4);
        const month = date.substring(4, 6);
        const day = date.substring(6, 8);
        const hour = date.substring(9, 11);
        const minute = date.substring(11, 13);
        const second = date.substring(13, 15);

        return `${day}/${month}/${year}\n${hour}:${minute}:${second}`;
    }
}