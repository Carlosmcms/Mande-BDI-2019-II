const { pool } = require('./bdconnect');

const crearTarjetaCredit = async (credito) =>{
    try {

        console.log(credito);
        const text = 
        `INSERT INTO tarjetacredito (numeroTarjeta, cvc, fVencimiento,banco, celular) VALUES ('${credito.numerotarjeta}', 
        '${credito.cvc}',
        '${credito.fvencimiento}','${credito.banco}','${credito.celular}')`;

        await pool.query(text);
        return true; 
    }catch(e)
    {
        console.log(e);
        return false;
    }
}



module.exports = {
   crearTarjetaCredit
 };