const { IResolvers } = require( 'graphql-tools');
const  UserC = require('../controller/UsuarioController');
const  clienteC = require('../controller/ClienteController');
const trabajadorC = require('../controller/TrabajadorController');

const mutation = {
    Mutation: {
        async CrearUsuario(__, { usuario }){
            const u = {
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                celular: usuario.celular,
                contrasena: usuario.contrasena,
                direccion: usuario.direccion,
                email:  usuario.email,
                cedula: usuario.cedula
            }
            return  await UserC.createUser(u);
        }
    }
}

module.exports ={ mutation };