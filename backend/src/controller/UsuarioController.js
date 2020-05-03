const { pool } = require('./bdconnect');

const verificar = async (celular) => {
    try{

       const text =`SELECT * FROM login where celular=$1`
       const cuentas = await pool.query(text,[celular]); //login es una vista 
      
       const c = cuentas.rows[0];
       if(c!=null){
           return true;
       }else {
           return false;
       }
    } catch (e){
        console.log(e);
        return false;
    }
}
const login = async (celular, contrasena) =>{
    try{
        const text = `SELECT (contrasena = crypt($1, contrasena)) AS contrasena 
        FROM login where celular=$2`

       const cuentas = await pool.query(text,[contrasena,celular]);     
       const c = cuentas.rows[0];             
       return c.contrasena;  

    } catch (e){     
        console.log(e);
        return false;
    }
}

const createUser =  async ( usuario ) =>{
    try{
    //   const text =
    //     `INSERT INTO usuario(celular, nombre, apellido, direccion, contrasena, email, cedula) 
    //    VALUES($1, $2, $3, ST_GeomFromText('POINT( $4 )',4326), crypt ('12345', gen_salt ('md5')),$6, $7) `;
    //Este es el que se debe de usar
        const text =
         `INSERT INTO usuario (celular, nombre, apellido, direccion, contrasena, email, cedula) 
        VALUES ($1, $2, $3, $4, crypt ($5, gen_salt ('md5')), $6, $7) `;//Pruebas
       
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
        console.log(e);
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