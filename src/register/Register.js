import React from 'react';
 
const Register = props => {
    if(props.isCliente){
        switch(props.Selected){
            case '0': return <DatosPersonales />;
            case '1': return <Contrasena />;
            case '2': return <Tarjeta />;
            case '3': return <Direccion />;
            case '4': return <FotoRecibo />;
        };
    } else {
        switch(props.Selected){
            case '0': return <DatosPersonales />;
            case '1': return <Contrasena />;
            case '2': return <Direccion />;
            case '3': return <FotoCedula />;
            case '4': return <FotoPerfil />;
        };
    };
};

export default Register;
