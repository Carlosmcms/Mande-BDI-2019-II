const { IResolvers } = require( 'graphql-tools');
const  UserC = require('../controller/UsuarioController');
const mutation = {
    Mutation: {
        CrearUsuario(__, { usuario }){
            const u = {
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                celular: usuario.celular,
                contrasena: usuario.contrasena,
                direccion: usuario.direccion,
                email:  usuario.email,
                cedula: usuario.cedula
            }
            return  UserC.createUser(u);
        }
    }
}

module.exports ={ mutation };