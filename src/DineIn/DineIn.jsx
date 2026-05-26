// components/DineIn.jsx
import React, { useState } from 'react';
import { Smartphone, Bell } from 'lucide-react';

export default function DineIn() {
  const [tableNum, setTableNum] = useState('');
  const [isSessionActive, setIsSessionActive] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 text-center">
      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl w-fit mx-auto text-amber-400">
        <Smartphone className="w-8 h-8" />
      </div>
      <div>
        <h3 className="text-xl font-bold">Stolda o‘tirib buyurtma berish</h3>
        <p className="text-slate-400 text-xs mt-1">Stolingizdagi raqamni kiriting va raqamli menyuga o‘ting.</p>
      </div>

      {!isSessionActive ? (
        <div className="space-y-4">
          <input 
            type="number" 
            placeholder="Stol raqami (Masalan: 12)" 
            value={tableNum}
            onChange={(e) => setTableNum(e.target.value)}
            className="w-full text-center bg-slate-950 border border-slate-800 rounded-xl py-4 text-xl font-bold focus:border-amber-500 outline-none text-white tracking-widest placeholder:text-slate-700" 
          />
          <button 
            disabled={!tableNum}
            onClick={() => setIsSessionActive(true)}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-black font-bold py-3.5 rounded-xl transition-all"
          >
            Menuni ochish
          </button>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm">
            Siz <span className="text-amber-400 font-bold">#{tableNum}-stoldasiz</span>. Quyidagi tugma orqali ofitsiantni ham chaqira olasiz.
          </div>
          <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 border border-slate-700">
            <Bell className="w-5 h-5 text-amber-400" /> Ofitsiantni chaqirish
          </button>
          <p className="text-xs text-amber-500/70 italic">Kodni "Delivery.jsx" menyusi bilan integratsiya qilib mahsulot tanlash mumkin.</p>
        </div>
      )}
    </div>
  );
}