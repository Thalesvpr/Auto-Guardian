import { ReactNode } from "react";
import './Buttons.css'

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  type: 'contrast' |  'neutral';
}

export const FloatingButton = ({onClick , children, type}: ButtonProps) => (
  <>
    <button className={"floating-button " + type}  onClick={onClick}>
    {children}
    </button>

  </>

);


export const Button = ({onClick , children, type}: ButtonProps) => (
    <>
      <button className={"button " + type}  onClick={onClick}>
      {children}
      </button>
  
    </>
  
  );


  

  export const IconButton = ({onClick , children,type}: ButtonProps) => (
    <>
      <button className={"icon-button " + type}  onClick={onClick}>
        {children}
      </button>
  
    </>
  
  );