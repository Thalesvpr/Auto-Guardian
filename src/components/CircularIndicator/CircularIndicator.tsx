import { ClipLoader } from 'react-spinners';
import './CircularIndicator.css'

type CircularProgressIndicatorProps = {}

export const CircularProgressIndicator = ({}: CircularProgressIndicatorProps) => (
  <div className='bg-pos'>
    <ClipLoader color="#e2c41c" />
  </div>
);