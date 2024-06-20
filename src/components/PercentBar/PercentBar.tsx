import React from 'react';
import './PercentBar.css'


interface PercentBarProps {
  percent: number;
}

export const PercentBar: React.FC<PercentBarProps> = ({percent}: PercentBarProps) => {
  return (
    <div
    className='base'
    >
      <div className="inner"
      style={
        {
          width: `${percent}%`,
        }
      }
      >
      </div>
    </div>
  );
};

