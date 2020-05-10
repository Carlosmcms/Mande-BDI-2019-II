const { pool } = require('./bdconnect');

const registrarTrabajo = async (celular, codigoLabor, precioxHora) => {

    try{

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

module.exports = {
   registrarTrabajo,
   eliminarTrabajo
 };