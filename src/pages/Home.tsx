import React, { useEffect, useState } from 'react';
import { MapComponent } from './components/Map';
import { IsOn } from './components/IsOn';
import { InfoBox } from './components/Infos';
import './Home.css';
import fetchData from '../services/fetchData';
import { FloatingButton, IconButton } from '../components/Buttons/Buttons';
import { FaTools } from 'react-icons/fa';
import { PercentBar } from './../components/PercentBar/PercentBar';
import InputField from '../components/Input/InputField';
import Popup from '../components/Popup/Popup';

type status = {
  status: "on" | 'off'
  score: number
}


type HomeProps = {};

export const Home: React.FC<HomeProps> = () => {
  const [status, setStatus] = useState<"on" | "off">("off");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const correctState = "on"


  const [isAddServiceOpen, setAddServiceOpen] = useState(false)



  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetchData<status>('https://back-autoguardian.online/status');
        console.log(response.data)
        setStatus(response.data.status);
        setScore(response.data.score);

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
      <MapComponent pinState={status == status} />
      <div className='absolute_content'>
        <div className='content'>
        <div className='hands'></div>
        <IsOn isOnState={status == status} />
        <h2>Seu score: <span>{score}/100</span></h2>
        <PercentBar percent={score}/>
        <InfoBox />
        </div>
      </div>
      <Popup show={isAddServiceOpen} handleClose={() => setAddServiceOpen(false) }>
          <>
          <div>
          <h1>🛠️ Adcionar novo serviço!</h1>
          </div>
          <InputField label={'Data do Serviço'} value={''} onChange={(e)=>{ } }></InputField>
          <InputField label={'Quilometragem do Veículo'} value={''} onChange={(e)=>{ } }></InputField>
          <InputField label={'Descriçao de Serviço'} value={''} onChange={(e)=>{ } }></InputField>
          <InputField label={'Peças Substituídas'} value={''} onChange={(e)=>{ } }></InputField>
          <InputField label={'Contato do Serviço'} value={''} onChange={(e)=>{ } }></InputField>


          </>
      </Popup>
      <FloatingButton onClick={()=>setAddServiceOpen(true)} type='contrast' >
        <FaTools size={24}></FaTools>
      </FloatingButton>
    </>
  );
};
