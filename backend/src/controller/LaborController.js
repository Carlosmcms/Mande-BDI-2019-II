const { pool } = require('./bdconnect');

const getLabores = async () =>{
    try{
      const text =
        `SELECT descripcion, codlabor AS codigo, nombre
         FROM labor `;             
                  
      const l= await pool.query(text);
      const labores = l.rows;

      return labores;

    }catch(e){        
        
        console.log(e);
        return [];
    }
}

module.exports = {
    getLabores
 };