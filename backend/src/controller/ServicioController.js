const { pool } = require('./bdconnect');

const getPago = async ( codigoServicio ) =>{
    try{
        const text =
         `SELECT costo FROM servicio WHERE codservicio=$1 `;         
         const cl = await pool.query(text, [codigoServicio]);
         const a = cl.rows[0];
         return a.costo;
    }catch(e){        
        console.log(e);
        return null;
    }
}

module.exports = {
   getPago
};