const { pool } = require('./bdconnect');

const crearServicio = async (servicio) =>{
    
    try{

        const text = 
        `INSERT INTO servicio (codServicio, calificacion, horaInicio, horaFinal, fecha, costo, celularCli, celularTra,
            codLabor, numTarjetaCred) VALUES ('${servicio.codServicio}', '${servicio.calificacion}', ${servicio.horaInicio},
            '${servicio.horaFinal}', '${servicio.fecha}', '${servicio.costo}', '${servicio.celularCli}', '${servicio.celularTra}')`

        await pool.query(text);
        return true;

    }catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = {
    crearServicio
}