const { pool } = require('./bdconnect');

const getLabores = async () => {
  try {
    const text = `SELECT descripcion, codlabor AS codigo, nombre
         FROM labor `;

    const l = await pool.query(text);
    const labores = l.rows;

    return labores;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const CrearLabor = async (labor) => {
  try {
    const text = `INSERT INTO labor (codlabor, nombre, descripcion) 
      VALUES ($1, $2, $3)`;

    const values = [labor.codigo, labor.nombre, labor.descripcion];
    await pool.query(text, values);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
module.exports = {
  CrearLabor,
  getLabores,
};
