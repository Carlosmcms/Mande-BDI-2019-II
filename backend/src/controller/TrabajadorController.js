const { pool } = require('./bdconnect');
const { getUsuario } = require('./UsuarioController');

const getTrabajador = async ( celular ) =>{
    try{
        
        const text =
         `Select * FROM trabajador WHERE celular=$1`;  
                
        const tr = await pool.query(text, [celular]);
        const t = tr.rows[0];

        return t;
    }catch(e){
        
       console.log(e);
    }
}

const getTrabajadoxlabor = async ( labor, celularCliente ) =>{
    
    try{
        const u = await getUsuario(celularCliente);
        
           //RETORNA TODOS LOS TRABAJADORES QUE ESTEN EN UN RADIO DE 3KM
        const text =
          `SELECT *,ST_AsTEXT(direccion) as direccionText FROM 
              (SELECT *,100000*ST_DISTANCE (ST_GEOMFROMTEXT ('POINT(${u.direccion})',4326),
                  ST_GEOMFROMTEXT (ST_AsTEXT(direccion),4326)) AS distancia
                 FROM laborestrabajador) AS dis 
              WHERE distancia<=3000 and nombre_labor='${labor}' and estado=true
              ORDER BY promedio`;  
                   
        const l= await pool.query(text);

        const laboArray = l.rows;
        let labores = [];
        for(i = 0; i< laboArray.length; i++){
            labores[i]=laboArray[i];
        }
        console.log(labores);

        return labores;
        
    }catch(e) {
        console.log(e);
        return undefined;   
    }
}

module.exports = {
   getTrabajador,
   getTrabajadoxlabor
};