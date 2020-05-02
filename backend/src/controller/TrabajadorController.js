const { pool } = require('./bdconnect');

const getTrabajador = async ( celular ) => {
    try{
        const text =
         `Select * FROM trabajador WHERE celular=$1 `;         
         const user = await pool.query(text, [celular]);
         const c = user.rows[0];
         return c;
    }catch(e){
        status(500).send({
          status: 'Error',
          message: e.message,
        });
    }
}


module.exports = {
   getTrabajador
};