const validator = require('./middleware/validator');


module.exports = function(InjectedAfip){

    let afip = InjectedAfip;

    async function generateCae(body) {
        
        return await afip.ElectronicBilling.createVoucher(body);
    
    }

    //Devuelve los datos del contribuyente correspondiente al identificador 20111111111 
    async function search_cuit(cuit) {

        const taxpayerDetails = await afip.RegisterScopeFour.getTaxpayerDetails(cuit);

        console.log(taxpayerDetails);

        return taxpayerDetails;

    }

    return {
        generateCae,
        search_cuit
    }


}