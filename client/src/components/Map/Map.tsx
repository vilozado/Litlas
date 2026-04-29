import "./Map.css";
import "leaflet/dist/leaflet.css";
import type { Feature, GeoJsonObject, Geometry } from "geojson";
import { MapContainer, GeoJSON } from "react-leaflet";
import worldGeoJSON from "../../assets/worldGeoJSON.json";
import countryLiteratureMap from "../../data/countryLiteratureMap";
import type { Layer, StyleFunction } from "leaflet";
import { useState, useMemo } from "react";
import BookModal from "../BookModal/BookModal";
import { useBookContext } from "../../context/useBookContext";
import Legend from "../Legend/Legend";

type CountryProps = { name: string };
type CountryFeature = Feature<Geometry, CountryProps>;

export default function Map() {
  const [showBookModal, setShowBookModal] = useState(false);
  const { setBookByCountry, readingList, exploredSubjects } = useBookContext();

  const handleCountryClick = async (feature: CountryFeature) => {
    const countryName = feature.properties.name;
    const entry = countryLiteratureMap[countryName]; // Check if the country is in countryLiteratureMap

    if (!entry) return; // won't open the modal if the country is not mapped in countryLiteratureMap

    try {
      await setBookByCountry(countryName, entry.subject);
      setShowBookModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const savedSubjects = useMemo(() => {
    const saved = new Set<string>();
    for (const book of readingList) {
      if (book.status === "to be read") saved.add(book.subject);
    }
    return saved;
  }, [readingList]);

  const getCountryStyle: StyleFunction<CountryProps> = (feature) => {
    if (!feature) {
      return {
        fillColor: "#fbf9f6",
        fillOpacity: 0.95,
        color: "#696d74f8",
        weight: 1,
      };
    }

    const countryName = feature.properties.name; //ex: "France"
    const subject = countryLiteratureMap[countryName]?.subject; //ex: "French Literature"
    const isMapped = Boolean(countryName && subject); // Check if the country is mapped in countryLiteratureMap
    const isSaved = subject ? savedSubjects.has(subject) : false;
    const isRead = subject ? exploredSubjects.has(subject) : false;

    return {
      fillColor: isSaved
        ? "#e7c25a"
        : isRead
          ? "#243447"
          : isMapped
            ? "#fdf3d8"
            : "#fbf9f6",
      fillOpacity: 0.95,
      color: "#696d74f8",
      weight: 1,
    };
  };

  const onEachFeature = (feature: Feature, layer: Layer) => {
    const f = feature as CountryFeature;
    const countryName = f.properties.name;

    layer.bindTooltip(countryName, {
      permanent: false,
      direction: "center",
      className: "country-tooltip",
    });

    layer.on("click", () => handleCountryClick(f));
  };

  return (
    <div>
      <BookModal open={showBookModal} onClose={() => setShowBookModal(false)} />
      <MapContainer
        className="map-container"
        center={[25, 30]}
        zoom={3}
        scrollWheelZoom={false}
        zoomControl={true}
        keyboard={true}
        style={{ height: "100vh", width: "100%", backgroundColor: "#a7cdf2" }}
      >
        <Legend />
        <GeoJSON
          data={worldGeoJSON as GeoJsonObject}
          style={getCountryStyle}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
}
