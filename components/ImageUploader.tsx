
import React, { useCallback, useRef } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  uploadedImage: string | null;
}

const UploadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, uploadedImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="w-full max-w-2xl mx-auto border-2 border-dashed border-purple-400/50 rounded-2xl p-6 text-center cursor-pointer hover:border-purple-400 hover:bg-white/5 transition-all duration-300"
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/jpeg, image/png"
      />
      {uploadedImage ? (
        <div className="relative group">
          <img src={`data:image/jpeg;base64,${uploadedImage}`} alt="Uploaded preview" className="rounded-lg max-h-80 mx-auto" />
           <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
             <p className="text-white text-lg font-semibold">Click to change image</p>
           </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          <UploadIcon />
          <p className="text-lg font-semibold text-purple-200">Upload Your Selfie</p>
          <p className="text-sm text-gray-400">JPG or PNG, up to 10 MB</p>
        </div>
      )}
    </div>
  );
};
