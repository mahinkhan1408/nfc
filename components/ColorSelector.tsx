import React from 'react';

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onSelect: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, selectedColor, onSelect }) => {
  const isLightColor = (hex: string) => {
    const c = hex.substring(1);
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma > 200;
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {colors.map((color) => {
        const isSelected = selectedColor.toLowerCase() === color.toLowerCase();
        const useDarkIcon = isLightColor(color);
        
        return (
          <button
            key={color}
            type="button"
            onClick={() => onSelect(color)}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ease-out flex-shrink-0 border border-gray-100
              ${isSelected 
                  ? 'ring-2 ring-offset-2 ring-indigo-600 scale-110 shadow-md' 
                  : 'hover:scale-110 hover:shadow-sm'
              }
            `}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          >
            {isSelected && (
               <svg 
                 className={`w-5 h-5 ${useDarkIcon ? 'text-gray-800' : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]'}`} 
                 fill="none" 
                 stroke="currentColor" 
                 viewBox="0 0 24 24" 
                 xmlns="http://www.w3.org/2000/svg"
               >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ColorSelector;