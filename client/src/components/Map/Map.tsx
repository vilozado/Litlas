import './Map.css';
import 'leaflet/dist/leaflet.css';
import type { Feature, GeoJsonObject } from 'geojson';
import { MapContainer, GeoJSON } from 'react-leaflet';
import worldGeoJSON from '../../assets/worldGeoJSON.json';
import countryLiteratureMap from '../../data/countryLiteratureMap';
import type { Layer } from 'leaflet';
import { useState } from 'react';
import BookModal from '../BookModal/BookModal';
import { useBookContext } from '../../context/useBookContext';

export default function Map() {
  const [showBookModal, setShowBookModal] = useState(false);
  const { setBookByCountry, readingList } = useBookContext();


  const handleCountryClick = async (feature: Feature) => {
    const countryName = feature?.properties?.name;
    const entry = countryLiteratureMap[countryName];

    if (!entry) return;

    try {
      await setBookByCountry(countryName, entry.subject)
      setShowBookModal(true)
    } catch (error) {
      console.log(error);
    }
  }

  const getCountryStyle = (feature?: Feature) => {
    const countryName = feature?.properties?.name;
    const subject = countryLiteratureMap[countryName]?.subject;
    const isMapped = countryName && subject;
    const isSaved = readingList.some(book => book.status === 'to be read' && book.subject === subject);
    const isRead = readingList.some(book => book.status === 'read' && book.subject === subject);

    return {
      fillColor: isSaved ? '#ffe46b' : isRead ? '#1E2A38' : isMapped ? '#fff5cf' : '#fbf9f6',
      fillOpacity: 1,
      color: '#75797ff8',
      weight: 1
    }
  }

  const onEachFeature = (feature: Feature, layer: Layer) => {
    const countryName = feature?.properties?.name;

    layer?.bindTooltip(countryName, {
      permanent: false,
      direction: 'center',
      className: 'country-tooltip',
    });

    layer?.on('click', () => handleCountryClick(feature));
  }


  return (
    <div>
      <BookModal open={showBookModal} onClose={() => setShowBookModal(false)} />
      <MapContainer className='map-container' center={[25, 30]} zoom={3} scrollWheelZoom={false} zoomControl={true} keyboard={true} style={{ height: '700px', width: '100%', backgroundColor: '#a7cdf2' }}>
        <GeoJSON key={readingList.length} data={worldGeoJSON as GeoJsonObject} style={getCountryStyle} onEachFeature={onEachFeature} />
      </MapContainer>
    </div>
  )
}
