const { pool } = require('./bdconnect');

const crearServicio = async (servicio) => {
  try {
    const text = `INSERT INTO servicio (codServicio, calificacion, horaInicio, horaFinal, fecha, costo, celularCli, celularTra,
          codLabor, numTarjetaCred) VALUES ('${servicio.codServicio}', '${servicio.calificacion}', ${servicio.horaInicio},
          '${servicio.horaFinal}', '${servicio.fecha}', '${servicio.costo}', '${servicio.celularCli}', '${servicio.celularTra}')`;

    await pool.query(text);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const getPago = async (codigoServicio) => {
  try {
    const text = `SELECT costo FROM servicio WHERE codservicio=$1 `;
    const cl = await pool.query(text, [codigoServicio]);
    const a = cl.rows[0];
    return a.costo;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

module.exports = {
  getPago,
  crearServicio,
};
