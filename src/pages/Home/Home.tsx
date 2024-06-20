import React, { useEffect, useState } from 'react';
import { MapComponent } from './components/Map';
import { IsOn } from './components/IsOn';
import { InfoBox } from './components/Infos';
import './Home.css';
import fetchData from '../../services/fetchData';
import { Button, FloatingButton } from '../../components/Buttons/Buttons';
import { FaTools } from 'react-icons/fa';
import { PercentBar } from '../../components/PercentBar/PercentBar';
import InputField from '../../components/Input/InputField';
import Popup from '../../components/Popup/Popup';
import { CircularProgressIndicator } from '../../components/CircularIndicator/CircularIndicator';

type status = {
  status: "on" | 'off';
  score: number;
};

type HomeProps = {};

type Service = {
  date: string;
  mileage: string;
  description: string;
  parts: string;
  contact: string;
};

export const Home: React.FC<HomeProps> = () => {
  const [status, setStatus] = useState<"on" | "off">("off");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddServiceOpen, setAddServiceOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState<Service>({
    date: '',
    mileage: '',
    description: '',
    parts: '',
    contact: ''
  });

  const correctState = "on";

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetchData<status>('https://back-autoguardian.online/status');
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServices([...services, formData]);
    setFormData({ date: '', mileage: '', description: '', parts: '', contact: '' });
    setAddServiceOpen(false);
  };

  if (loading) {
    return <CircularProgressIndicator />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <MapComponent pinState={correctState == status} />
      <div className='absolute_content'>
        <div className='content'>
          <div className='hands'></div>
          <IsOn isOnState={correctState == status} />
          <h2>Seu score: <span>{score}/100</span></h2>
          <PercentBar percent={score} />
          <div className='services-list'>
        <h2>Serviços Adicionados:</h2>
        <ul>
          {services.map((service, index) => (
            <li key={index}>
              <span className='lbl'>Data:</span> {service.date}<br />
              <span className='lbl'>Quilometragem:</span> {service.mileage}<br />
              <span className='lbl'>Descrição:</span> {service.description}<br />
              <span className='lbl'>Peças:</span> {service.parts}<br />
              <span className='lbl'>Contato:</span> {service.contact}
            </li>
          ))}
        </ul>
      </div>
        </div>
      </div>
      <Popup show={isAddServiceOpen} handleClose={() => setAddServiceOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div>
            <h1>🛠️ Adicionar novo serviço!</h1>
          </div>
          <InputField
            label={'Data do Serviço'}
            name='date'
            value={formData.date}
            onChange={handleInputChange}
          />
          <InputField
            label={'Quilometragem do Veículo'}
            name='mileage'
            value={formData.mileage}
            onChange={handleInputChange}
          />
          <InputField
            label={'Descrição de Serviço'}
            name='description'
            value={formData.description}
            onChange={handleInputChange}
          />
          <InputField
            label={'Peças Substituídas'}
            name='parts'
            value={formData.parts}
            onChange={handleInputChange}
          />
          <InputField
            label={'Contato do Serviço'}
            name='contact'
            value={formData.contact}
            onChange={handleInputChange}
          />
          <Button onClick={() => {

          } } type={'contrast'}>Adcionar</Button>
        </form>
      </Popup>
      <FloatingButton onClick={() => setAddServiceOpen(true)} type='contrast'>
        <FaTools size={24} />
      </FloatingButton>
      
    </>
  );
};
