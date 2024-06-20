import { LuPower, LuPowerOff } from 'react-icons/lu';

type IsOnProps = {
  isOnState: boolean
}

export const IsOn = ({isOnState}: IsOnProps) => (
  <div className={(isOnState? " isOn": " isOff" ) + ' isOn-div'}>
    {isOnState? <LuPower size={48}/>: <LuPowerOff size={48}/>}
    <p>{
    isOnState? 
    "Seu carro esta ligado no momento":
    "Seu carro esta desligado no momento"
    }
    </p>
  </div>
);