import React, { useEffect, useState } from 'react';
import { MapComponent } from './components/Map';
import { IsOn } from './components/IsOn';
import { InfoBox } from './components/Infos';
import { AddServiceButton } from './components/AddService';
import './Home.css';
import fetchData from '../services/fetchData';

type status = {
  status: "on" | 'off'
}


type HomeProps = {};

export const Home: React.FC<HomeProps> = () => {
  const [status, setStatus] = useState<"on" | "off">("off");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const correctState = "on"
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetchData<status>('http://18.226.165.77:5000/status');
        setStatus(response.data.status);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <MapComponent pinState={status === correctState} />
      <div className='absolute_content'>
        <div className='content'>

        <IsOn isOnState={status === correctState} />
        <InfoBox />
        </div>
      </div>
      <AddServiceButton />
    </>
  );
};
