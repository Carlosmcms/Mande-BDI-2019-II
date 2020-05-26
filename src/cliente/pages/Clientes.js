import React from 'react';

import WrapLeft from '../../shared/components/WrapLeft/WrapLeft';
import Mapa from '../../shared/components/Mapa/Mapa';

const Clientes = () => {
    return (
        <div>
            <div className="wrap-mande-left">
            </div>
            <div id="wrap-left" className="float"></div>
            <div className="float">
                <Mapa />
            </div>   
        </div>
    );
};

export default Clientes;