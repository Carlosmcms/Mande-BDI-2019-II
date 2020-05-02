const { pool } = require('./bdconnect');

const getTrabajador = async ( celular ) =>{
    try{
        
        const text =
         `Select * FROM trabajador WHERE celular=$1`;  
                
        const tr = await pool.query(text, [celular]);
        const t = tr.rows[0];

        return t;
    }catch(e){
        // TODO: mandarlo al que hace la petición, por que solo la estas viendo tú
       console.log(e);
    }
}



module.exports = {
   getTrabajador
};