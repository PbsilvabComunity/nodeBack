const Controller = require('../index');

module.exports = function checkData() {
    let PersonaAfip;

    function middleware(req, res, next) {

        
        if( !req.body.CantReg ) {
            req.body.CantReg = 1;
        }  
        
        if( !req.body.PtoVta ) {
            throw new Error("El punto de venta debe ser Configurado");
        }  
        
        if( !req.body.CbteTipo ) {
            throw new Error("El punto de venta debe ser Configurado");
        }  
        
        if( !req.body.Concepto ) {
            throw new Error("El concepto no debe estar vacio");
        }  
        
        if( !req.body.DocTipo ) {
            throw new Error("Tipo de documento no configurado");
        }  
        
        if( !req.body.DocNro === undefined || !req.body.DocNro === null ||  !req.body.DocNro === false ) {
            throw new Error("Nro de Documento");
        }  
        
        // si son masde 1 comprobante se pone el numero de primero
        if( !req.body.CbteDesde ) {
            req.body.CbteDesde = 1;
        }  

        // si son masde 1 comprobante se pone el numero de ultimo
        if( !req.body.CbteHasta ) {
            req.body.CbteDesde = 1;
        }  
        
        if( !req.body.CbteFch ) {
            throw new Error("Debe seleccionar una fecha de comprobante");
        }  
        
        // la suma del importe neto mas todos los otros importes
        if( !req.body.ImpTotal ) { 
            throw new Error("El importe total debe ser mayor a 0");
        }  
        
        // la suma del importe neto no grabado
        if( !req.body.ImpTotConc ) {
            req.body.ImpTotConc = 0;
        }  
        
        if( !req.body.ImpNeto ) {
            throw new Error("El importe neto debe ser mayor a 0");
        }  
        
        //importe excento de iva 
        if( !req.body.ImpOpEx ) {
            req.body.ImpOpEx = 0;
        }  
        
        // importe total de iva
        if( !req.body.ImpIVA ) {
            req.body.ImpIVA = 0;
        }  
        
        //importe total de tributos
        if( !req.body.ImpTrib ) {
            req.body.ImpTrib = 0;
        }  
        
        //moneda en la que se emite el comprobante
        if( !req.body.MonId ) {
            req.body.MonId = 'PES';
        }  

        //monto de cotizacion de la moneda. si es PESO se usa 1
        if( !req.body.MonCotiz && req.body.MonId == 'PES' ) {
            req.body.MonCotiz = 1;
        }  

        // ivas definidos para el comprobante. formato: { id: 5 , baseImp: 100 , 'Importe' 	: 21 }
        // id: 5 => 21% ver tipos de ivas 
        if( !req.body.Iva && (req.body.ImpTotal != req.body.ImpNeto)) { 
            throw new Error("El importe no puede ser distinto al importe total y no tener iva");
        }  else {
            req.body.Iva = req.body.Iva || [];
        }
       
        next();
    }


    function findPersona (cuit) {
       
        Controller.search_cuit(req.params.cuit)
        .then((persona)=>{
            return   persona;
        })
        .catch(next);
    }

    return middleware;
}