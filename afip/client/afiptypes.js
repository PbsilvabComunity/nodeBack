module.exports = function (AfipInstance) {

    let afip = AfipInstance;

    //Para mas información acerca de este método ver el item 4.4 de la especificación del Web service
    async function voucherTypes() {
        return await afip.ElectronicBilling.getVoucherTypes();
    }

    // Obtener tipos de conceptos disponibles
    async function conceptTypes() {
        return await afip.ElectronicBilling.getConceptTypes();
    }

    // Obtener tipos de documentos disponibles
    async function documentTypes() {
        return await afip.ElectronicBilling.getDocumentTypes();
    }

    // Obtener tipos de alícuotas disponibles
    async function aloquotTypes() {
        return await afip.ElectronicBilling.getAliquotTypes();
    }

    //   Obtener tipos de monedas disponibles
    async function currenciesTypes() {
        return await afip.ElectronicBilling.getCurrenciesTypes();
    }

    // Obtener tipos de opciones disponibles para el comprobante
    async function optionTypes() {
        return await afip.ElectronicBilling.getOptionsTypes();
    }

    //Obtener tipos de tributos disponibles
    async function taxTypes() {
        return await afip.ElectronicBilling.getTaxTypes();
    }
    //  Para mas información acerca de este método ver el item 4.10 de la especificación del Web service

    // Transformar formato de fecha que utiliza AFIP (yyyymmdd) a yyyy-mm-dd
    //  Para esto utilizaremos el método formatDate pasándole la fecha como parámetro

    async function date() {
        afip.ElectronicBilling.formatDate('19970508'); //Nos devuelve 1997-05-08
    }



    return {
        voucherTypes,
        conceptTypes,
        documentTypes,
        aloquotTypes,
        currenciesTypes,
        optionTypes,
        taxTypes,
        date
    }

}