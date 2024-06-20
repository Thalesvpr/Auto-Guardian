import { FaPowerOff } from 'react-icons/fa';

type IsOnProps = {
  isOnState: boolean
}

export const IsOn = ({isOnState}: IsOnProps) => (
  <div className={(isOnState? " isOn": " isOff" ) + ' isOn-div'}>
    <FaPowerOff size={48} />
    <p>{
    isOnState? 
    "Seu carro esta ligado no momento":
    "Seu carro esta desligado no momento"
    }
    </p>
  </div>
);