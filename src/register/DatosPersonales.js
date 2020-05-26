import React from 'react';

// Componentes
import Mapa from '../components/Mapa/Mapa';
import Fulldiv from '../components/Fulldiv/Fulldiv';

// Tiene el primer intento de maqueta
const DatosPersonales = props => {
    return (
        <div className="container-total-mande fondo">
            <Mapa />
            <Fulldiv />
        </div>
    );
};

export default DatosPersonales;