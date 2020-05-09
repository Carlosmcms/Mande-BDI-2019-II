const { pool } = require('./bdconnect');

const verificar = async (celular) => {
  try {
    const text = `SELECT * FROM login WHERE celular='${celular}'`;
    const cuentas = await pool.query(text); //login es una vista

    const c = cuentas.rows[0];
    if (c != null) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};
const login = async (celular, contrasena) => {
  try {
    const text = `SELECT (contrasena = crypt('${contrasena}', contrasena)) AS contrasena 
        FROM login where celular='${celular}'`;

    const cuentas = await pool.query(text);
    const c = cuentas.rows[0];
    return c.contrasena;
  } catch (e) {
    console.log(e);
    return false; 
  }
};

const createUser = async (usuario) => {
  try {
    //Invierte la ubicacion debido a que postgis recibo longlat en lugar de latlong
    const ubic = invertirUbic(usuario.direccion);
    const text = `INSERT INTO usuario(celular, nombre, apellido, direccion, contrasena, email, cedula) 
           VALUES('${usuario.celular}', '${usuario.nombre}', '${usuario.apellido}', 
            ST_GeomFromText('POINT(${ubic})',4326), 
            crypt ('${usuario.contrasena}', gen_salt ('md5')),'${usuario.email}', '${usuario.cedula}') `;

    await pool.query(text);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const getUsuario = async (celular) => {
  try {
    const text = `SELECT *,ST_AsTEXT(direccion) AS direccionText 
         FROM usuario WHERE celular='${celular}'`;
    const user = await pool.query(text);

    let d = user.rows[0].direcciontext;
    d = d.substring(d.indexOf('(') + 1, d.indexOf(')'));
    d = invertirUbic(d);
    const informacion = {
      celular: user.rows[0].celular,
      nombre: user.rows[0].nombre,
      direccion: d,
      email: user.rows[0].email,
      cedula: user.rows[0].cedula,
    };
    return informacion;
  } catch (e) {
    console.log(e);
    return null;
  }
};
//----- Metodo auxiliar
const invertirUbic = (direccion) => {
  let ubic;
  const pos = direccion.indexOf(' ');
  ubic = direccion.substring(pos + 1);
  ubic += ' ' + direccion.substring(0, pos);
  return ubic;
};
module.exports = {
  verificar,
  login,
  createUser,
  getUsuario,
  invertirUbic,
};
