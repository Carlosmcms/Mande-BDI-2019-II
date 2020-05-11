const { pool } = require('./bdconnect');

const crearTarjetaCredit = async (credito) => {
  try {
    //FALTA ENCRIPTAR LOS DATOS DE LA TARJETA DE CREDITO
    console.log(credito);
    const text = `INSERT INTO tarjetacredito (numeroTarjeta, cvc, fVencimiento,banco, celular) VALUES ('${credito.numerotarjeta}', 
      '${credito.cvc}',
      '${credito.fvencimiento}','${credito.banco}','${credito.celular}')`;

    await pool.query(text);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

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
  crearTarjetaCredit,
};
