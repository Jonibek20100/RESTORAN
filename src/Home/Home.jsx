import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Home({ setCurrentPage }) {
  return (
    <div className="relative rounded-[24px] overflow-hidden h-[75vh] md:h-[80vh] flex items-center justify-center text-center px-4 shadow-2xl border border-gray-900">
      {/* Background Darkened Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600')` 
        }}
      />
      {/* Rasmdagi kabi professional qoraytirish qatlami (Dark overlay) */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />

      {/* Content */}
      <div className="relative z-10 space-y-6 max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white">
          Xush kelibsiz!
        </h1>
        <p className="text-gray-300 text-lg md:text-2xl font-light tracking-wide">
          Eng mazali va sifatli taomlarni tanlang
        </p>
        
        <div className="pt-4">
          <button
            onClick={() => setCurrentPage('menu')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-[#E12515] hover:from-orange-500 hover:to-red-500 text-white font-bold text-base px-8 py-4 rounded-xl shadow-xl shadow-red-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Menyuni ko'rish
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}