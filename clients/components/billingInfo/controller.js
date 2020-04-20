const nanoid = require('nanoid/async'); 

module.exports = function(injectedStore, remoteAfip){
    let store = injectedStore;
    let afip = remoteAfip;

    const TABLE = 'contacts_billing'

    if(!store){
        store = require('../../../store/mysql');
    }

    if(!afip){
        afip = require('../../../store/afip');
    }

    async function list() {
        users = await store.list(TABLE);
        return users;
    }

    function get(id) {
        return store.get(TABLE, id);
    }

    async function search_info(cuit) {

        let afipInfo = await afip.search(cuit);
        
        if (afipInfo.error) {
            throw new error("no se pudo optener la informacion del afip");
        }

        let formated_info = format_afip_data(afipInfo.body);

        return formated_info;
        
    }

    async function upsert(body){
       
        const billingInfo = {
            contact_id: body.contact_id,
            document_type: body.document_type,
            document_number: body.document_number
        }

        if (body.legal_name) {
            billingInfo.legal_name = body.legal_name;
        }

        if (body.fiscal_addres.direccion) {
            billingInfo.legal_address = body.fiscal_addres.direccion;
        }

        if (body.fiscal_addres.codPostal) {
            billingInfo.postal_code = body.fiscal_addres.codPostal;
        }

        if (body.fiscal_addres.idProvincia !== undefined  ) {
            billingInfo.province = body.fiscal_addres.idProvincia;
        }

        if (body.fiscal_addres.descripcionProvincia) {
            billingInfo.city =  body.fiscal_addres.descripcionProvincia;
        }
        
        if (body.tax_condition) {
            billingInfo.legal_name = body.legal_name;
        }

        if (body.fantasy_name) {
            billingInfo.legal_name = body.legal_name;
        }

        if (body.billing_mail) {
            billingInfo.legal_name = body.legal_name;
        }

        if (body.default_invoice_type) {
            billingInfo.legal_name = body.legal_name;
        }
        
        if (body.id){
            billingInfo.id = body.id 
        }
        
        return store.upsert(TABLE, billingInfo);
    }

    function format_afip_data(InfoAfip) {

        let requiredInformation = {};

        if (InfoAfip.tipoDocumento) {
            requiredInformation.document_type = InfoAfip.tipoDocumento;
        }

        if (InfoAfip.numeroDocumento) {
            requiredInformation.document_number = InfoAfip.numeroDocumento;
        }

        if (InfoAfip.tipoClave) {
            requiredInformation.password_type = InfoAfip.tipoClave;
        }

        if (InfoAfip.tipoPersona) {
            requiredInformation.person_type = InfoAfip.tipoPersona;
        }

        if (InfoAfip.nombre) {
            requiredInformation.name = InfoAfip.nombre;
        }

        if (InfoAfip.apellido) {
            requiredInformation.last_name = InfoAfip.apellido;
        }

        if (InfoAfip.razonSocial) {
            requiredInformation.legal_name = InfoAfip.razonSocial;
        }

        if (InfoAfip.domicilio) {

            let legal_addresses = InfoAfip.domicilio; 
            
            let fiscal_addres = [];
            
            legal_addresses.forEach(address => {
                 if (address.tipoDomicilio == 'FISCAL') {
                    fiscal_addres = address;
                 } 
            });

            requiredInformation.fiscal_addres = fiscal_addres;

        }

        
        
        return requiredInformation;
    }
    
    return {
        list,
        get,
        upsert,
        search_info
    };
}