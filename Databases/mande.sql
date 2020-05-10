
-- Sólo se ha creado la estructura principal con llaves primarias y foráneas.
-- Agregada restricciones NOT NULL y UNIQUE.
-- Agregar encriptación

CREATE TABLE Usuario (
    -- Encriptar contraseña
    celular CHAR(10),
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    direccion geometry(POINT,4326) NOT NULL,--MODIFIQUE EL TIPO DE ESTE DATO
    contrasena VARCHAR NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    cedula CHAR(10) NOT NULL UNIQUE,
    CONSTRAINT Usuario_PK PRIMARY KEY (celular)
);
 
 
CREATE TABLE Cliente (
    celular CHAR(10),
    -- Se especifica el valor de 100 por la longitud máxima de directorio en SO: Linux(255), MS-DOS(260), MacOS(257).
    recibo VARCHAR(200) NOT NULL UNIQUE,
 
    CONSTRAINT Cliente_PK PRIMARY KEY (celular),
    CONSTRAINT Cliente_FK FOREIGN KEY (celular) REFERENCES Usuario(celular)
);
 
CREATE TABLE Trabajador (
    celular CHAR(10),
    cantServicios INT,
    promedio NUMERIC(3,2),
    estado BOOLEAN,
    fotoPerfil VARCHAR(200),
    fotoCedula VARCHAR(200),
 
    CONSTRAINT Trabajador_PK PRIMARY KEY (celular),
    CONSTRAINT Trabajador_FK FOREIGN KEY (celular) REFERENCES Usuario(celular)
); 
 
CREATE TABLE Labor (
    codLabor CHAR(6),
    nombre VARCHAR(20),
    descripcion VARCHAR(60),
 
    CONSTRAINT Labor_PK PRIMARY KEY (codLabor)
);
 
 CREATE TABLE TarjetaCredito ( 
    cvc CHAR(4),
    fVencimiento DATE,
    numeroTarjeta VARCHAR,
    banco VARCHAR(20),
    celular VARCHAR(10),
    CONSTRAINT TarjetaCredito_PK PRIMARY KEY (numeroTarjeta),
    CONSTRAINT TarjetaCredito_Cliente_FK FOREIGN KEY (celular) REFERENCES Cliente(celular)
);
CREATE TABLE Servicio (
    codServicio CHAR(10),
    calificacion NUMERIC(3,2)  NOT NULL,
    horaInicio TIME  NOT NULL,
    horaFinal TIME  NOT NULL,
    fecha DATE  NOT NULL,
    costo NUMERIC (8,2)  NOT NULL,
    celularCli CHAR(10)  NOT NULL,
    celularTra CHAR(10)  NOT NULL,
    codLabor CHAR(6)  NOT NULL,
    numTarjetaCred CHAR(6),
 
    CONSTRAINT Servicio_PK PRIMARY KEY (codServicio),
    CONSTRAINT Servicio_Cliente_FK FOREIGN KEY (celularCli) REFERENCES Cliente(celular),
    CONSTRAINT Servicio_Trabajador_FK FOREIGN KEY (celularTra) REFERENCES Trabajador(celular),
    CONSTRAINT Servicio_Labor_FK FOREIGN KEY (codLabor) REFERENCES Labor(codLabor),
    CONSTRAINT Servicio_TarjetaCredito_FK FOREIGN KEY (numTarjetaCred) REFERENCES TarjetaCredito(numeroTarjeta),
);
 
-- Relaciones
-- Realiza: Trabajador-Labor
CREATE TABLE Realiza (
    celularTra CHAR(10),
    codLabor CHAR(6),
    precioXHora NUMERIC(8,2),

 
    CONSTRAINT Realiza_Trabajador_FK FOREIGN KEY (celularTra) REFERENCES Trabajador(celular),
    CONSTRAINT Realiza_Labor_FK FOREIGN KEY (codLabor) REFERENCES Labor(codLabor)
);
 
CREATE VIEW laboresTrabajador as
SELECT
usuario.nombre as nombre_trabajador,
labor.nombre as nombre_labor, 
realiza.precioxhora as precio, 
labor.descripcion, trabajador.celular,
trabajador.promedio, trabajador.fotoperfil,
trabajador.estado, usuario.direccion as direccion
FROM trabajador,realiza, labor, usuario
WHERE 
trabajador.celular=usuario.celular
and trabajador.celular=realiza.celulartra 
and labor.codlabor = realiza.codlabor;
 
 
CREATE VIEW Login as --Cree esta vista
SELECT celular, contrasena 
FROM Usuario;





