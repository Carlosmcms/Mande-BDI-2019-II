const { pool } = require('./bdconnect');

const getTarjetaCredito = async (celular) => {
  try {
    const text = `SELECT *
    FROM TarjetaCredito 
    WHERE celular='${celular}'`;

    //FALTA DESENCRIPTAR LOS DATOS DE LA TARJETA DE CREDITO
    const tr = await pool.query(text);
    if (tr.rows[0] == []) {
      return undefined;
    }
    return tr.rows[0];
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
module.exports = {
  getTarjetaCredito,
};
