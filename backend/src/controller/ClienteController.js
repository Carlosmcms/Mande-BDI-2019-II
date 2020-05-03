const { pool } = require('./bdconnect');

const createClient =  async ( trabajador ) =>{
    try{
    //   const text =
    //    `INSERT INTO trabajador (usuario, estado, cantServicios, fotoCedula, fotoPerfil, promedio)
    //    VALUES($1, $2, $3, $4,  ST_GeomFromText('POINT( $5 )',4326), $6) `;//Este es el que se debe de usar
        const text =
         `INSERT INTO cliente (recibo, usuario) 
        VALUES ($1, $2) `;//Pruebas
       
       const values = [
           cliente.recibo,
           cliente.usuario
       ]
       await pool.query(text, values);
       return true;   

    } catch(e) {
        return false;
        console.log(e);
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
   createClient
};