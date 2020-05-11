const { pool } = require('./bdconnect');
const { getUsuario, invertirUbic } = require('./UsuarioController');

const createWorker = async (trabajador) => {
  try {
    const text = `INSERT INTO trabajador (celular, estado, cantServicios, fotoCedula, fotoPerfil, promedio) 
      VALUES ($1, $2, $3, $4, $5, $6) `;

    const values = [
      trabajador.celular,
      trabajador.estado,
      trabajador.cantservicios,
      trabajador.fotocedula,
      trabajador.fotoperfil,
      trabajador.promedio,
    ];
    await pool.query(text, values);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const getTrabajador = async (celular) => {
  try {
    const text = `SELECT * FROM trabajador WHERE celular='${celular}'`;

    const tr = await pool.query(text);
    const t = tr.rows[0];

    return t;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

const getTrabajadoxlabor = async (labor, celularCliente) => {
  try {
    const u = await getUsuario(celularCliente);

    const ubic = invertirUbic(u.direccion);
    //RETORNA TODOS LOS TRABAJADORES QUE ESTEN EN UN RADIO DE 3KM y que coincidan
    //con la labor y, si precio es true, ordena de mayor a menor
    const text = `SELECT *,ST_AsTEXT(direccion) as direccionText FROM 
              (SELECT *,100000*ST_DISTANCE (ST_GEOMFROMTEXT ('POINT(${ubic})',4326),
                  ST_GEOMFROMTEXT (ST_AsTEXT(direccion),4326)) AS distancia
                 FROM laborestrabajador) AS dis 
            WHERE distancia<=3000 and nombre_labor='${labor}' and estado=true 
            ORDER BY promedio desc`;

    const l = await pool.query(text);

    let labores = [];
    for (i = 0; i < l.rows.length; i++) {
      let u = l.rows[i].direcciontext;
      u = u.substring(u.indexOf('(') + 1, u.indexOf(')'));
      u = invertirUbic(u);
      let d = l.rows[i].distancia + ' ';
      d = d.substring(0, d.indexOf('.')) + ' Metros';
      labores[i] = l.rows[i];
      labores[i].direcciontext = u;
      labores[i].distancia = d;
    }
    return labores;
  } catch (e) {
    console.log(e);
    return [];
  }
};
const misLabores = async (celular) => {
  try {
    const text = `SELECT * FROM laborestrabajador WHERE celular='${celular}'`;

    const tr = await pool.query(text);
    const t = tr.rows;

    return t;
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
const CambiarEstadoTrab = async (celular, boolean) => {
  try {
    const text = 'UPDATE trabajador SET estado = $1 WHERE celular = $2';

    const values = [boolean, celular];
    console.log(values);
    await pool.query(text, values);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const registrarTrabajo = async (celular, codigoLabor, precioxHora) => {
  try {
    console.log(celular, codigoLabor, precioxHora);
    const text = `INSERT INTO realiza (celulartra, codLabor, precioxHora) VALUES ('${celular}', '${codigoLabor}', ${precioxHora})`;

    await pool.query(text);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const eliminarTrabajo = async (celular, codigoLabor) => {
  try {
    const text = `DELETE from realiza WHERE celulartra = '${celular}' and codlabor = '${codigoLabor}'`;
    await pool.query(text);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const calificarTrabajador = async (celular, promedio, calificacion) => {
  try {
    promedio = (promedio + calificacion) / 2;

    const text = `UPDATE trabajador SET promedio = ${promedio} WHERE celular = '${celular}'`;
    await pool.query(text);
    return promedio;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = {
  getTrabajador,
  getTrabajadoxlabor,
  misLabores,
  createWorker,
  CambiarEstadoTrab,
  calificarTrabajador,
  registrarTrabajo,
  eliminarTrabajo,
};
