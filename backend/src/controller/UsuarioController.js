const { pool } = require('./bdconnect');

const verificar = async (celular) => {
     try{
       const cuentas = await pool.query('SELECT * FROM login'); //login es una vista       
       const c = cuentas.rows;
       let found = false;
       for(i = 0; i< c.length; i++){
           if(c[i].celular== celular) {                   
               found= true;
               break;
           }
       }
       return found; 

    } catch (e){
        console.log(e);
    }
}
const login = async (celular, contrasena) =>{
    try{      
       const cuentas = await pool.query('SELECT * FROM login');     
       const c = cuentas.rows;       

       let found = false;

       for(i = 0; i< c.length; i++){
           if(c[i].celular== celular 
               && c[i].contrasena==contrasena) {                   
               found= true;
               break;
           }
       }
       return found;      

    } catch (e){
        console.log(e);
    }
}

const createUser =  async ( usuario ) =>{
    try{
       const text =
         `INSERT INTO usuario(celular, nombre, apellido, direccion, contrasena, email, cedula) 
           VALUES('${usuario.celular}', '${usuario.nombre}', '${usuario.apellido}', 
            ST_GeomFromText('POINT(${usuario.direccion})',4326), 
            crypt ('${usuario.contrasena}', gen_salt ('md5')),'${usuario.email}', '${usuario.cedula}') `;
 
       await pool.query(text);
       
       return true;   
 
    } catch(e) {
        console.log(e);
        return false;       
    }
}


const getUsuario = async ( celular ) =>{
    try{
        const text =
         `Select * FROM usuario WHERE celular=$1 `;         
         const user = await pool.query(text, [celular]);
         const c = user.rows[0];
         return c;
    }catch(e){
        console.log(e);
    }
}


module.exports = {
  verificar,
  login,
  createUser,
  getUsuario
  };