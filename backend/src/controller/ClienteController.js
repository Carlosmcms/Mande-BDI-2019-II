const { pool } = require('./bdconnect');

const getCliente = async ( celular ) =>{
    try{
        const text =
         `Select * FROM cliente WHERE celular=$1 `;         
         const cl = await pool.query(text, [celular]);
         const a = cl.rows[0];
         return a;
    }catch(e){
        console.log(e);
    }
}

module.exports = {
   getCliente
};