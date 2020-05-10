const { pool } = require('./bdconnect');

const CrearLabor = async (labor) => {
    try {
        const text =
         `INSERT INTO labor (codlabor, nombre, descripcion) 
        VALUES ($1, $2, $3)`;

        const values =
        [
            labor.codigo,
            labor.nombre,
            labor.descripcion
        ]
        await pool.query(text, values);
        return true;
    
    } catch(e) {
        console.log(e);
        return false;
    }
}


const getLabor = async ( codLabor ) =>{
    try{
        
        const text =
         `Select * FROM labor WHERE codLabor =$1`;  
                
        const tr = await pool.query(text, [codLabor]);
        const t = tr.rows[0];

        return t;
    }catch(e){
        // TODO: mandarlo al que hace la petición, por que solo la estas viendo tú
       console.log(e);
    }
}



module.exports = {
    CrearLabor,
    getLabor
 };