import './Map.css';
import 'leaflet/dist/leaflet.css';
import type { Feature } from 'geojson';
import { MapContainer, GeoJSON } from 'react-leaflet';
import worldGeoJSON from '../../assets/worldGeoJSON.json';
import countryLiteratureMap from '../../data/countryLiteratureMap';
import type { Layer } from 'leaflet';
import { useState } from 'react';
import BookModal from '../BookModal/BookModal';
import { fetchBooks } from '../../utils/fetchBooks';
import type { Book } from '../../types/book';

export default function Map() {
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  const onEachFeature = (feature: Feature, layer: Layer) => {
    const countryName = feature?.properties?.name;

    layer?.bindTooltip(countryName, {
      permanent: false,
      direction: 'center',
      className: 'country-tooltip',
    });

    layer?.on('click', () => handleCountryClick(feature));
  }

  const handleCountryClick = async (feature: Feature) => {
    const countryName = feature?.properties?.name;
    const entry = countryLiteratureMap[countryName];

    if (!entry) return;
    setSelectedCountry(countryName);

    try {
      const res = await fetchBooks(entry.subject);
      setBooks(res);
      setShowBookModal(true);
    } catch (error) {
      console.log(error);
    }
  }

  const getCountryStyle = (feature?: Feature) => {
    const countryName = feature?.properties?.name;
    const isMapped = countryName && countryLiteratureMap[countryName];
    return {
      fillColor: isMapped ? '#1E2A38' : '#f8f2e0',
      fillOpacity: 1,
      color: '#5f6368f8',
      weight: 1
    }
  }

  return (
    <div>
      <BookModal open={showBookModal} onClose={() => setShowBookModal(false)} country={selectedCountry} books={books} />
      <MapContainer className='map-container' center={[25, 30]} zoom={3} scrollWheelZoom={false} zoomControl={true} keyboard={true} style={{ height: '652px', width: '100%', backgroundColor: '#F8F7F4' }}>
        <GeoJSON data={worldGeoJSON as any} style={getCountryStyle} onEachFeature={onEachFeature} />
      </MapContainer>
    </div>
  )
}
