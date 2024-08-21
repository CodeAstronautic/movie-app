import { commonString } from '@/utils/string';
import { useState, DragEvent, ChangeEvent } from 'react';
import DropIcon from '../public/asset/image/svg/Drop-icon.svg';
import Image from 'next/image';

// Define the type for the props
interface DropImageBoxProps {
  image: string | ArrayBuffer | null; // `image` can be a URL string, ArrayBuffer, or null
  setImage: (image: string | ArrayBuffer | null) => void; // `setImage` function type
}

const DropImageBox: React.FC<DropImageBoxProps> = ({ image, setImage }) => {

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center bg-input-color w-full min-h-[504px] h-full"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {image ? (
        typeof image === 'string' ? (
          <img src={image} alt="Dropped Image" className="max-w-full max-h-full" />
        ) : (
          <p>Invalid image type</p>
        )
      ) : (
        <p className="text-white text-center flex items-center justify-center flex-col">
          <Image src={DropIcon} alt="Drop Icon" />
          {commonString.DropIma}
        </p>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
        aria-label="Select image"
      />
    </div>
  );
};

export default DropImageBox;
