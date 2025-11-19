import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  id: string;
  label: string;
  currentImage: string | null;
  onImageUpload: (dataUrl: string) => void;
  onRemove: () => void;
  isLarge?: boolean;
  className?: string;
  variant?: 'default' | 'compact';
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  id,
  label,
  currentImage,
  onImageUpload,
  onRemove,
  isLarge = false,
  className = "",
  variant = 'default'
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageUpload(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onRemove();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Determine height/width classes. If className contains width/height, rely on them.
  // Otherwise use defaults.
  const defaultHeightClass = isLarge ? 'h-48' : 'h-32';
  const appliedClass = className || `w-full ${defaultHeightClass}`;

  return (
    <div className={`${className ? '' : 'w-full'} group/uploader`}>
      <span className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide text-center">{label}</span>
      <input
        type="file"
        id={id}
        ref={inputRef}
        accept="image/png, image/jpeg, image/gif"
        onChange={handleFileChange}
        className="sr-only"
      />
      <label
        htmlFor={id}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative flex flex-col items-center justify-center
          border-2 border-dashed rounded-xl transition-all duration-200 ease-out cursor-pointer overflow-hidden
          ${isDragging ? 'border-indigo-500 bg-indigo-50 scale-[1.02]' : 'border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400'}
          ${appliedClass}
        `}
      >
        {currentImage ? (
          <div className="relative w-full h-full group/image">
            <img src={currentImage} alt={label} className="w-full h-full object-cover" />
            
            {/* Action Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
               <div 
                 className="bg-white/20 p-2 rounded-full backdrop-blur-md hover:bg-white/40 transition-colors text-white border border-white/30 shadow-sm" 
                 title="Change Image"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
               </div>
               <button 
                 onClick={handleRemove}
                 className="bg-white/20 p-2 rounded-full backdrop-blur-md hover:bg-red-500/90 hover:border-red-500/50 transition-colors text-white border border-white/30 shadow-sm" 
                 title="Remove Image"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
               </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-2 text-center pointer-events-none">
            <div className={`
              p-2 rounded-full mb-1 transition-colors duration-200
              ${isDragging ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400 group-hover/uploader:bg-gray-200 group-hover/uploader:text-gray-600'}
            `}>
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
            </div>
            {variant !== 'compact' && <p className="text-[10px] text-gray-500 font-medium leading-tight">Click to add</p>}
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageUploader;