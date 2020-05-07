const { pool } = require('./bdconnect');
const { getUsuario, invertirUbic } = require('./UsuarioController');

const getTrabajador = async ( celular ) =>{
    try{
        
        const text =
         `SELECT * FROM trabajador WHERE celular='${celular}'`;  
                
        const tr = await pool.query(text);
        const t = tr.rows[0];

        return t;
    }catch(e){
        
       console.log(e);
    }
}

const getTrabajadoxlabor = async ( labor, celularCliente) =>{
    
    try{
        const u = await getUsuario(celularCliente);
        
        const ubic = invertirUbic(u.direccion); 
           //RETORNA TODOS LOS TRABAJADORES QUE ESTEN EN UN RADIO DE 3KM y que coincidan
          //con la labor y, si precio es true, ordena de mayor a menor       
        const text =
          `SELECT *,ST_AsTEXT(direccion) as direccionText FROM 
              (SELECT *,100000*ST_DISTANCE (ST_GEOMFROMTEXT ('POINT(${ubic})',4326),
                  ST_GEOMFROMTEXT (ST_AsTEXT(direccion),4326)) AS distancia
                 FROM laborestrabajador) AS dis 
            WHERE distancia<=3000 and nombre_labor='${labor}' and estado=true 
            ORDER BY promedio desc`;             
                        
        const l= await pool.query(text);
    
        let labores = [];
        for(i = 0; i< l.rows.length; i++){
            let u = l.rows[i].direcciontext;
            u = u.substring(u.indexOf("(")+1, u.indexOf(")")); 
            u = invertirUbic(u);
            let d = l.rows[i].distancia+" ";
            d = d.substring(0, d.indexOf("."))+ "Metros";
            labores[i]=l.rows[i];
            labores[i].direcciontext = u;
            labores[i].distancia = d;          
        }
        return labores;
        
    }catch(e) {
        console.log(e);
        return [];   
    }
}

module.exports = {
   getTrabajador,
   getTrabajadoxlabor
};