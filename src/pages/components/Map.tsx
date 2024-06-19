import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

// Importar ícones diretamente
import pinOn from '/png/Pin.png';
import pinOff from '/png/PinOff.png';

import apiRequest from '../../services/fetchData';


// Fix default icon issue for markers
const customIcon = (iconUrl: string) => new L.Icon({
  iconUrl: iconUrl, // Caminho para a imagem do ícone
  iconSize: [60, 80], // Tamanho do ícone
  iconAnchor: [30, 80], // Centralizando o ícone na largura e posicionando na parte inferior
  popupAnchor: [0, -80], // Posição do popup em relação ao ícone
});


interface Location {
  latitude: number;
  longitude: number;
  created_at: string;
  device_id: string;
}

type MapComponentProps = {
  pinState: boolean
};

export const MapComponent: React.FC<MapComponentProps> = ({pinState}) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await apiRequest<Location>('http://18.226.165.77:5000/map/data'); // Substitua pela URL da sua API
        setLocation(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    // Ensure the map container resizes correctly
    window.dispatchEvent(new Event('resize'));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="map-container">
      {location && (
        <MapContainer center={[location.latitude -0.001, location.longitude]} zoom={17} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhhbGVzdnByIiwiYSI6ImNseG04MHl1YjA1MmwyanByZ2Q3OXExOTQifQ.xMlazd0kpv7XuK_UDdZPuQ`}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[location.latitude, location.longitude]} icon={customIcon(pinState? pinOn : pinOff)}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}; 
