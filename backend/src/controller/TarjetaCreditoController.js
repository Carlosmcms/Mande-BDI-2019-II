const { pool } = require('./bdconnect');

const crearTarjetaCredit = async (credito) => {
  try {
    //La encriptacion y desencriptacion deben de ser ejecutada desde un trigger

    const text = `INSERT INTO tarjetacredito (numeroTarjeta, cvc, fVencimiento,banco, celular) 
    VALUES (encrypt('${credito.numerotarjeta}', 'password','3des'), 
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
    const text = `SELECT encode(decrypt(numeroTarjeta::bytea,'password','3des'::text), 'escape'::text) AS numeroTarjeta, 
    cvc, fVencimiento,banco, celular
    FROM TarjetaCredito 
    WHERE celular='${celular}'`;

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
