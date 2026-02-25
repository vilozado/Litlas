import './Map.css';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
// import worldGeoJSON from '../../assets/worldGeoJSON.json';


export default function Map() {
  return (
    <div>
      <MapContainer className='map-container' center={[30, 10]} zoom={2} scrollWheelZoom={false} style={{ height: '600px', width: '100%' }}>
        <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      </MapContainer>
    </div>
  )
}
