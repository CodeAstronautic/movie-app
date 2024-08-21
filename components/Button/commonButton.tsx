import React from 'react';

// Define the props interface
interface CommonButtonProps {
  title: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CommonButton: React.FC<CommonButtonProps> = ({ title, onClick }) => {
  return (
    <button
      className="bg-primary-color text-white rounded py-[16px] px-[28px] border border-primary-color"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default CommonButton;
