import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';

import './Mapa.css';

const Mapa = () => {
    return (
        <Map id="fondo" center={[3.375920,-76.529732]} zoom={14}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </Map>
    );
};

export default Mapa;