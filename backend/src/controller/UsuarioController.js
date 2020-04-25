const { pool } = require('./bdconnect');


const login = async (celular, contrasena) =>{
    try{
       
       const cuentas = await pool.query('SELECT * FROM login'); //login es una vista       
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
        const text =
        `INSERT INTO usuario(celular, nombre, apellido, direccion, contrasena, email, cedula) 
       VALUES($1, $2, $3, $4,  POINT( $5 ), $6) `;
       console.log(usuario);
       const values = [
           usuario.celular,
           usuario.nombre,
           usuario.apellido,
           usuario.direccion,
           usuario.contrasena,
           usuario.email,
           usuario.cedula,
       ]
       pool.query(text, values);
       return true;

       throw(e);

    } catch(e) {
        return false;
        status(500).send({
            status: 'Error',
            message: e.message,
        });
    }
}
module.exports = {
  login,
  createUser
  };