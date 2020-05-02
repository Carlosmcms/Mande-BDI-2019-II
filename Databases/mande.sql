
-- Sólo se ha creado la estructura principal con llaves primarias y foráneas.
-- Agregada restricciones NOT NULL y UNIQUE.
-- Agregar encriptación

CREATE TABLE Usuario (
    -- Encriptar contraseña
    celular CHAR(10),
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(20) NOT NULL,
    direccion geometry(POINT,4326) NOT NULL,--MODIFIQUE EL TIPO DE ESTE DATO
    contrasena VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    cedula CHAR(10) NOT NULL UNIQUE,
    CONSTRAINT Usuario_PK PRIMARY KEY (celular)
);
CREATE VIEW Login as --Cree esta vista
SELECT celular, contrasena 
FROM Usuario;

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
    precioXHora NUMERIC(8,2),
    nombre VARCHAR(20),
    descripcion VARCHAR(60),

    CONSTRAINT Labor_PK PRIMARY KEY (codLabor)
);

CREATE TABLE Tarjeta (
    -- Encriptar numTarjeta
    numTarjeta CHAR(6),
    banco VARCHAR(20),
    celular VARCHAR(10),

    CONSTRAINT Tarjeta_PK PRIMARY KEY (numTarjeta),
    CONSTRAINT Tarjeta_Cliente_FK FOREIGN KEY (celular) REFERENCES Cliente(celular)
);

CREATE TABLE Debito (
    numTarjeta CHAR(6),
    saldo NUMERIC(10,2),

    CONSTRAINT Debito_PK PRIMARY KEY (numTarjeta),
    CONSTRAINT Debito_FK FOREIGN KEY (numTarjeta) REFERENCES Tarjeta(numTarjeta)
);

CREATE TABLE Credito (
    numTarjeta CHAR(6),
    cvc CHAR(20),
    fVencimiento DATE,

    CONSTRAINT Credito_PK PRIMARY KEY (numTarjeta),
    CONSTRAINT Credito_FK FOREIGN KEY (numTarjeta) REFERENCES Tarjeta(numTarjeta)
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
    numTarjetaDeb CHAR(6),

    CONSTRAINT Servicio_PK PRIMARY KEY (codServicio),
    CONSTRAINT Servicio_Cliente_FK FOREIGN KEY (celularCli) REFERENCES Cliente(celular),
    CONSTRAINT Servicio_Trabajador_FK FOREIGN KEY (celularTra) REFERENCES Trabajador(celular),
    CONSTRAINT Servicio_Labor_FK FOREIGN KEY (codLabor) REFERENCES Labor(codLabor),
    CONSTRAINT Servicio_Credito_FK FOREIGN KEY (numTarjetaCred) REFERENCES Credito(numTarjeta),
    CONSTRAINT Servicio_Debito_FK FOREIGN KEY (numTarjetaDeb) REFERENCES Debito(numTarjeta)
);

-- Relaciones
-- Realiza: Trabajador-Labor
CREATE TABLE Realiza (
    celularTra CHAR(10),
    codLabor CHAR(6),

    CONSTRAINT Realiza_Trabajador_FK FOREIGN KEY (celularTra) REFERENCES Trabajador(celular),
    CONSTRAINT Realiza_Labor_FK FOREIGN KEY (codLabor) REFERENCES Labor(codLabor)
);






















