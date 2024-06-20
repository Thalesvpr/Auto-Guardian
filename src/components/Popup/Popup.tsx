// Popup.tsx
import React, { useEffect } from 'react';
import './Popup.css';
import { CgClose } from 'react-icons/cg';
import { IconButton } from '../Buttons/Buttons';

interface PopupProps {
  show: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ show, handleClose, children }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);

  return (
    <div className={`popup ${show ? 'show' : ''}`}>
      <div className="popup-inner">
          <div className='close-btn'>
          <IconButton onClick={handleClose} type={'neutral'} >
          <CgClose />
        </IconButton>
          </div>
        {children}
      </div>
    </div>
  );
};

export default Popup;