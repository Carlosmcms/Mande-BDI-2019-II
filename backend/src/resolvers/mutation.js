const { IResolvers } = require('graphql-tools');
const UserC = require('../controller/UsuarioController');
const clienteC = require('../controller/ClienteController');
const trabajadorC = require('../controller/TrabajadorController');
const laborC = require('../controller/LaborController');
const realizaC = require('../controller/RealizaController');
const tarjetaC = require('../controller/TarjetaCreditoController');
const servicioC = require('../controller/ServicioController');

const mutation = {
  Mutation: {
    async CrearUsuario(__, { usuario }) {
      const u = {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        celular: usuario.celular,
        contrasena: usuario.contrasena,
        direccion: usuario.direccion,
        email: usuario.email,
        cedula: usuario.cedula,
      };
      return await UserC.createUser(u);
    },
    async CrearTrabajador(__, { trabajador }) {
      const u = {
        celular: trabajador.celular,
        estado: trabajador.estado,
        cantservicios: trabajador.cantservicios,
        fotocedula: trabajador.fotocedula,
        fotoperfil: trabajador.fotoperfil,
        promedio: trabajador.promedio,
      };
      return await trabajadorC.createWorker(u);
    },

    async CrearCliente(__, { cliente }) {
      const u = {
        recibo: cliente.recibo,
        celular: cliente.celular,
      };
      return await clienteC.CrearCliente(u);
    },

    async CambiarEstadoTrab(__, { celular, estado }) {
      console.log(celular, estado);
      return await trabajadorC.CambiarEstadoTrab(celular, estado);
    },

    async CrearLabor(__, { labor }) {
      const u = {
        codigo: labor.codigo,
        nombre: labor.nombre,
        descripcion: labor.descripcion,
      };
      return await laborC.CrearLabor(u);
    },

    async registrarTrabajo(__, { celular, codigoLabor, precioxHora }) {
      return await trabajadorC.registrarTrabajo(
        celular,
        codigoLabor,
        precioxHora
      );
    },

    async eliminarTrabajo(__, { celular, codigoLabor }) {
      return await realizaC.eliminarTrabajo(celular, codigoLabor);
    },

    async calificarTrabajador(__, { celular, promedio, calificacion }) {
      return await realizaC.calificarTrabajador(
        celular,
        promedio,
        calificacion
      );
    },

    async crearTarjetaCredit(__, { credito }) {
      return await tarjetaC.crearTarjetaCredit(credito);
    },

    async crearServicio(__, { servicio }) {
      return await servicioC.crearServicio(servicio);
    },
  },
};

module.exports = { mutation };
