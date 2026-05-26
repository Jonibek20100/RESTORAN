import React from 'react';
import { FOOD_DATA } from '../Delivery/Delivery';

export default function MenuList({ addToCart, setCurrentPage }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center border-b border-gray-900 pb-4">
        <div>
          <h2 className="text-3xl font-black text-white">Bizning To'liq Menyu</h2>
          <p className="text-gray-500 text-xs mt-1 font-light">Eng tansiq va shohona taomlar jamlanmasi.</p>
        </div>
        <button 
          onClick={() => setCurrentPage('delivery')}
          className="bg-gray-900 text-gray-300 hover:text-white border border-gray-800 text-xs px-4 py-2 rounded-xl transition-all"
        >
          Savatga o'tish
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {FOOD_DATA.map(item => (
          <div key={item.id} className="bg-[#111317] border border-gray-950 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-gray-800 transition-all">
            <div className="h-40 overflow-hidden">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-white">{item.name}</h4>
                <p className="text-gray-500 text-[11px] font-light line-clamp-2 mt-1">{item.desc}</p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-amber-500 font-extrabold text-sm">{item.price.toLocaleString()} UZS</span>
                <button 
                  onClick={() => addToCart(item)}
                  className="bg-[#E12515] hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-lg text-[11px] transition-colors"
                >
                  + Qo'shish
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}