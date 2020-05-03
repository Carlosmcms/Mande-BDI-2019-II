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
        },

        async CrearTrabajador(__, { trabajador }){
            const u = {
                usuario: trabajador.usuario,
                estado: trabajador.estado,
                cantservicios: trabajador.cantservicios,
                fotocedula: trabajador.fotocedula,
                fotoperfil: trabajador.fotoperfil,
                promedio: trabajador.promedio
            }
            return await trabajadorC.createWorker(u);
        },

        async CrearCliente(__, { cliente }){
            const u = {
                recibo: cliente.recibo,
                usuario: cliente.usuario
            }
            return await clienteC.createClient(u);
        },

        async CambiarEstadoTrab(__, { trabajador, estado }){
            trabajador.estado = estado
        },

        async AgregarLabor(__, { laborIn }){
            const u = {
                trabajador: labor.trabajador,
                labor: labor.labor

            }
        }
    }
}

module.exports ={ mutation };