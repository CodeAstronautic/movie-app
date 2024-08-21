import React from 'react';
import { commonString } from "@/utils/string";

// Define the props interface
interface CancelButtonProps {
  type: "button" | "submit" | "reset"; // Possible button types
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CancelButton: React.FC<CancelButtonProps> = ({ type, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="text-white py-[16px] px-[55px] rounded border border-white"
    >
      {commonString?.Cancel}
    </button>
  );
};

export default CancelButton;
