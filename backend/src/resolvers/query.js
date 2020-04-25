const { IResolvers } = require( 'graphql-tools');
const  UserC = require('../controller/UsuarioController');

const query = {
    Query:{
        login(__, { celular, contrasena }){
           return  UserC.login(celular, contrasena);
        }
    }
}

module.exports ={ query };
