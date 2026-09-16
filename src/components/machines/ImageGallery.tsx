import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  machineName: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, machineName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const safeImages = images && images.length > 0 
    ? images 
    : ['https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80'];

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % safeImages.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  return (
    <div className="space-y-3">
      
      {/* MAIN FEATURED DISPLAY */}
      <div className="relative h-72 sm:h-96 md:h-[450px] w-full rounded-2xl overflow-hidden bg-gray-900 border border-gray-200/80 shadow-lg group">
        <img
          src={safeImages[selectedIndex]}
          alt={`${machineName} - Imagem ${selectedIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* CONTROLS OVERLAY */}
        {safeImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-md transition-all active:scale-95"
              aria-label="Imagem Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-md transition-all active:scale-95"
              aria-label="Próxima Imagem"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* FULLSCREEN BUTTON */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 text-white p-2 rounded-lg backdrop-blur-md transition-colors"
          title="Expandir Imagem"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* PAGE INDICATOR BADGE */}
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md">
          {selectedIndex + 1} / {safeImages.length}
        </div>
      </div>

      {/* THUMBNAILS HORIZONTAL SCROLL BAR */}
      {safeImages.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                selectedIndex === idx
                  ? 'border-agro-leaf ring-2 ring-agro-leaf/50 scale-105'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* FULLSCREEN MODAL */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-5 right-5 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={safeImages[selectedIndex]}
            alt={machineName}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />

          {safeImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
        </div>
      )}

    </div>
  );
};
