const { pool } = require('./bdconnect');

const createWorker =  async ( trabajador ) =>{
    try{
    //   const text =
    //    `INSERT INTO trabajador (usuario, estado, cantServicios, fotoCedula, fotoPerfil, promedio)
    //    VALUES($1, $2, $3, $4,  ST_GeomFromText('POINT( $5 )',4326), $6) `;//Este es el que se debe de usar
        const text =
         `INSERT INTO trabajador (celular, estado, cantServicios, fotoCedula, fotoPerfil, promedio) 
        VALUES ($1, $2, $3, $4, $5, $6) `;//Pruebas
      
       const values = [
           trabajador.celular,
           trabajador.estado,
           trabajador.cantservicios,
           trabajador.fotocedula,
           trabajador.fotoperfil,
           trabajador.promedio
       ]
       await pool.query(text, values);
       return true;   

    } catch(e) {
        console.log(e);
        return false;
        
    }
}

const CambiarEstadoTrab = async ( celular, boolean ) => {
    try{
        
        const text = 
        'UPDATE trabajador SET estado = $1 WHERE celular = $2';
        
        const values = [
            boolean,
            celular
        ]
        console.log(values);
        await pool.query(text, values);
        return true;
    } catch(e) {
        console.log(e);
        return false;
        
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


const registrarTrabajo = async (celular, codigoLabor, precioxHora) => {

    try{

        console.log(celular, codigoLabor, precioxHora);
        const text = 
        `INSERT INTO realiza (celulartra, codLabor, precioxHora) VALUES ('${celular}', '${codigoLabor}', ${precioxHora})`

        await pool.query(text);
        return true;

    }catch (e) {
        console.log(e);
        return false;
    }
}

const eliminarTrabajo = async (celular, codigoLabor) => {
    try{

        const text = 
        `DELETE from realiza WHERE celulartra = '${celular}' and codlabor = '${codigoLabor}'`
        await pool.query(text);
        return true;

    }catch (e) {
        console.log(e);
        return false;
    }
}

const calificarTrabajador = async (celular, promedio, calificacion) => {
    try{

        promedio = (promedio + calificacion) /2;

        const text =
        `UPDATE trabajador SET promedio = ${promedio} WHERE celular = '${celular}'`
        await pool.query(text);
        return promedio;

    }catch (e) {
        console.log(e);
        return false;
    }
}



module.exports = {
   getTrabajador,
   createWorker,
   CambiarEstadoTrab,
   calificarTrabajador,
   registrarTrabajo,
   eliminarTrabajo
};