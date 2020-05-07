const { IResolvers } = require( 'graphql-tools');
const  userC = require('../controller/UsuarioController');
const  clienteC = require('../controller/ClienteController');
const trabajadorC = require('../controller/TrabajadorController');
const servicioC = require('../controller/ServicioController');
const laborC = require('../controller/LaborController');


const query = {
    Query:{
        //Usuario-------------------------------------------------
        async login(__, { celular, contrasena }){
           return  await userC.login(celular, contrasena);
        },

        async verificarCelular(__, { celular }){
            return await userC.verificar(celular);
        },
        //Cliente-------------------------------------------------

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
        //trabajador-------------------------------------------------
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
        },
        async buscarTrabajador(__, { labor, celularCliente }){
            const t = await trabajadorC.getTrabajadoxlabor( labor, celularCliente);
            
            if(t===[]){
                return { mensaje: 'No se encontro ningun trabajador' };
            }
            return t;
        },
        //Servicio--------------------------------------------------------------
        async pago(__, { codServicio }){
            const p = await servicioC.getPago( codServicio );
            return p;
        },
        //Labor-----------------------------------------------------------------
        async labor(__,{ nombre }){
            const t = await laborC.getLabores();
            
            if(t===[]){
                return [{ mensaje: 'No se encontro ninguna labor'}];
            }
            return t;
        }

    }
}

module.exports ={ query };
