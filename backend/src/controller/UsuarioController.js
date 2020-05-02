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
        status(500).send({
            status: 'Error',
            message: e.message,
        });
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
        status(500).send({
            status: 'Error',
            message: e.message,
        });
    }
}

const createUser =  async ( usuario ) =>{
    try{
    //   const text =
    //     `INSERT INTO usuario(celular, nombre, apellido, direccion, contrasena, email, cedula) 
    //    VALUES($1, $2, $3, $4,  ST_GeomFromText('POINT( $5 )',4326), $6) `;//Este es el que se debe de usar
        const text =
         `INSERT INTO usuario (celular, nombre, apellido, direccion, contrasena, email, cedula) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) `;//Pruebas
       
       const values = [
           usuario.celular,
           usuario.nombre,
           usuario.apellido,
           usuario.direccion,
           usuario.contrasena,
           usuario.email,
           usuario.cedula,
       ]
       await pool.query(text, values);
       return true;   

    } catch(e) {
        return false;
        status(500).send({
            status: 'Error',
            message: e.message,
        });
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
        status(500).send({
          status: 'Error',
          message: e.message,
        });
    }
}

module.exports = {
  verificar,
  login,
  createUser,
  getUsuario
  };