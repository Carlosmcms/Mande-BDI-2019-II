const { pool } = require('./bdconnect');

const createWorker =  async ( trabajador ) =>{
    try{
    //   const text =
    //    `INSERT INTO trabajador (usuario, estado, cantServicios, fotoCedula, fotoPerfil, promedio)
    //    VALUES($1, $2, $3, $4,  ST_GeomFromText('POINT( $5 )',4326), $6) `;//Este es el que se debe de usar
        const text =
         `INSERT INTO trabajador (usuario, estado, cantServicios, fotoCedula, fotoPerfil, promedio) 
        VALUES ($1, $2, $3, $4, $5, $6) `;//Pruebas
       
       const values = [
           trabajador.usuario,
           trabajador.estado,
           trabajador.cantServicios,
           trabajador.fotocedula,
           trabajador.fotoperfil,
           trabajador.promedio
       ]
       await pool.query(text, values);
       return true;   

    } catch(e) {
        return false;
        console.log(e);
    }
}

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
   getTrabajador,
   createWorker
};