const { pool } = require('./bdconnect');

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

const getTrabajadoxlabor = async ( labor, promedio, precio ) =>{
    
    try{
        let text;
        let args;
        if(promedio===undefined&&precio===undefined){
            text =
          `SELECT * FROM laboresTrabajador 
          WHERE nombre_labor=$1 and estado=true
          ORDER BY promedio`;  
          args = [labor];
        } else if(precio===undefined){
            text =
            `SELECT * FROM laboresTrabajador 
            WHERE nombre_labor=$1 
            and promedio=$2
            and estado=true
            ORDER BY promedio`;  
            args = [labor, promedio];
        } else if(promedio===undefined){
            text =
            `SELECT * FROM laboresTrabajador 
            WHERE nombre_labor=$1 
            and precio=$2
            and estado=true
            ORDER BY promedio`;
            args = [labor, precio];
        }else {
            text =
            `SELECT * FROM laboresTrabajador 
            WHERE nombre_labor=$1 
            and precio=$2
            and promedio=$3
            and estado=true
            ORDER BY promedio`;
            args = [labor,promedio, precio];
        }
                 
        const l= await pool.query(text, args);

        const laboArray = l.rows;
        let labores = [];
        for(i = 0; i< laboArray.length; i++){
            labores[i]=laboArray[i];
        }
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