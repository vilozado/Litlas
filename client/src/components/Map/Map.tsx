import './Map.css';
import 'leaflet/dist/leaflet.css';
import type { Feature } from 'geojson';
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';
import worldGeoJSON from '../../assets/worldGeoJSON.json';
import countryLiteratureMap from '../../countryLiteratureMap';
import type { Layer } from 'leaflet';

// !TODO: connect mockBooks to country

export default function Map() {

  const renderCountryName = (feature?: Feature, layer?: Layer) => {
    const countryName = feature?.properties?.name;

    layer?.bindTooltip(countryName, {
      permanent: false,
      direction: 'center',
      className: 'country-tooltip',
    });

  }

  const getCountryStyle = (feature?: Feature) => {
    const countryName = feature?.properties?.name;
    const isMapped = countryName && countryLiteratureMap[countryName];
    return {
      fillColor: isMapped ? '#1F5E57' : '#bdbebe',
      fillOpacity: 0.8,
      color: '#f5f5f5',
      weight: 1
    }
  }

  return (
    <div>
      <MapContainer className='map-container' center={[25, 30]} zoom={3} scrollWheelZoom={false} zoomControl={true} keyboard={true} style={{ height: '722px', width: '100%', backgroundColor: '#F8F7F4' }}>
        {/* <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" /> */}
        <GeoJSON data={worldGeoJSON as any} style={getCountryStyle} onEachFeature={renderCountryName} />
      </MapContainer>
    </div>
  )
}
