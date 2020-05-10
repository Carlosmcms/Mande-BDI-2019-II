const { pool } = require('./bdconnect');

const CrearCliente =  async ( cliente ) =>{
    try{
        const text =
         `INSERT INTO cliente (recibo, celular) 
         VALUES (${cliente.recibo}, ${cliente.celular}) `;
       
       await pool.query(text);
       return true;   
    } catch(e) {
        console.log(e);
        return false;
    }
}

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
   getCliente,
   CrearCliente
};