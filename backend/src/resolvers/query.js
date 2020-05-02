const { IResolvers } = require( 'graphql-tools');
const  userC = require('../controller/UsuarioController');
const  clienteC = require('../controller/ClienteController');
const trabajadorC = require('../controller/TrabajadorController');

const query = {
    Query:{
        async login(__, { celular, contrasena }){
           return  await userC.login(celular, contrasena);
        },

        async verificarCelular(__, { celular }){
            return await userC.verificar(celular);
        },

        async cliente(__,{ celular }){   
            const r = await clienteC.getCliente( celular );
            if ( r === undefined ) {
                return null
            } 
                  
            return  {
                recibo: r.recibo,
                usuario: userC.getUsuario(celular),
            }
        },
        
        async trabajador(__,{ celular }){
            const t = await trabajadorC.getTrabajador(celular);
            
            if ( t === undefined ) {
                return null
            } 

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
