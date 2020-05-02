const { IResolvers } = require( 'graphql-tools');
const  userC = require('../controller/UsuarioController');
const  clienteC = require('../controller/ClienteController');
const trabajadorC = require('../controller/TrabajadorController');

const query = {
    Query:{
        login(__, { celular, contrasena }){
           return  userC.login(celular, contrasena);
        },

        verificarCelular(__, { celular }){
            return userC.verificar(celular);
        },

        cliente(__,{ celular }){
        
            const r = (clienteC.getCliente(celular)).recibo;
        
            return  {
                recibo: r,
                usuario: userC.getUsuario( celular),
            }
        },
        
        trabajador(__,{ celular }){
            const t = trabajadorC.getTrabajador(celular);
                    
            return {
                usuario: userC.getUsuario( celular),
                estado: t.estado,
                cantservicios: t.cantservicios,
                fotocedula: t.fotocedula,
                fotoperfil: t.fotoperfil,
                promedio: t.promedio          
            }
        }
    }
}

module.exports ={ query };
