import React, { useState } from 'react';
import { Calendar, Users, CheckCircle } from 'lucide-react';

export default function Booking({ cart, addToCart, updateQty, setBookingData }) {
  const [date, setDate] = useState('2026-08-10');
  const [guests, setGuests] = useState(6);
  const [selectedTable, setSelectedTable] = useState(4);
  const [preOrderItems, setPreOrderItems] = useState([]);
  const [success, setSuccess] = useState(false);

  const tables = [1, 2, 3, 4, 5, 6];

  const handlePreOrderCheckbox = (item) => {
    if (preOrderItems.includes(item.name)) {
      setPreOrderItems(preOrderItems.filter(i => i !== item.name));
      // Savatdan ham olib tashlash
      const cartItem = cart.find(c => c.name === item.name);
      if (cartItem) updateQty(cartItem.id, -cartItem.qty);
    } else {
      setPreOrderItems([...preOrderItems, item.name]);
      addToCart(item); // Avtomatik savatga qo'shadi
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingData({ date, guests, selectedTable, preOrderItems });
    setSuccess(true);
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (success) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6 py-12 bg-[#111317] border border-gray-800 rounded-3xl p-8 shadow-2xl">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
        <h2 className="text-2xl font-black text-white">Muvaffaqiyatli band qilindi!</h2>
        <p className="text-gray-400 text-sm">
          Sana: <span className="text-white font-bold">{date}</span> kuni <span className="text-white font-bold">{guests} kishi</span> uchun <span className="text-amber-500 font-bold">#{selectedTable}-stol</span> tayyorlab qo'yiladi.
        </p>
        <div className="bg-[#0c0d10] p-4 rounded-xl text-left border border-gray-900 text-xs space-y-1">
          <span className="text-[#E12515] font-bold uppercase tracking-wider block mb-1">Oldindan buyurtmalar:</span>
          {preOrderItems.length > 0 ? preOrderItems.map((name, i) => <div key={i} className="text-gray-300">• {name}</div>) : "Yo'q"}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* Form and Selection Column */}
      <form onSubmit={handleSubmit} className="bg-[#111317] border border-gray-900 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
        {/* Date Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#E12515]" /> Sana tanlang
          </label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-[#0c0d10] border border-gray-800 rounded-xl py-3 px-4 text-white text-sm focus:border-[#E12515] outline-none transition-all" 
          />
        </div>

        {/* Guest Counter */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-[#E12515]" /> Mehmonlar soni
          </label>
          <div className="flex items-center gap-4 bg-[#0c0d10] p-1 border border-gray-800 rounded-xl w-fit">
            <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 bg-[#111317] rounded-lg text-white font-bold hover:bg-gray-800">-</button>
            <span className="w-12 text-center text-sm font-black text-white">{guests}</span>
            <button type="button" onClick={() => setGuests(guests + 1)} className="w-10 h-10 bg-[#111317] rounded-lg text-white font-bold hover:bg-gray-800">+</button>
          </div>
        </div>

        {/* Pre-order Menu list Checkbox */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Pre-order Menu</label>
          <div className="grid grid-cols-2 gap-3 bg-[#0c0d10] p-4 border border-gray-800 rounded-2xl">
            {[
              { id: 1, name: 'Ribeye Steak', price: 120000 },
              { id: 6, name: 'Pishloq tarelka', price: 95000 },
              { id: 3, name: 'Truffle Pasta', price: 56000 },
            ].map(item => (
              <label key={item.id} className="flex items-center gap-3 cursor-pointer text-xs text-gray-300 hover:text-white select-none">
                <input 
                  type="checkbox" 
                  checked={preOrderItems.includes(item.name)}
                  onChange={() => handlePreOrderCheckbox(item)}
                  className="w-4 h-4 rounded accent-[#E12515] bg-[#111317] border-gray-800" 
                />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-[10px] text-gray-500">{item.price.toLocaleString()} UZS</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Bill Summary and submit */}
        <div className="pt-4 border-t border-gray-800 space-y-4">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Tanlangan Stol: <span className="text-white font-bold">#{selectedTable}</span></span>
            <span>Pre-order Jami: <span className="text-amber-500 font-bold">{totalAmount.toLocaleString()} UZS</span></span>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-[#E12515] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-red-600/10">
            Band qilish va Pre-order tasdiqlash →
          </button>
        </div>
      </form>

      {/* Interactive Right Table Layout Column */}
      <div className="bg-[#111317] border border-gray-900 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl text-center">
        <div>
          <h3 className="font-bold text-base text-white">Zal xaritasi: Stol tanlang</h3>
          <p className="text-gray-500 text-xs mt-1 font-light">Kerakli stol raqami ustiga bosing.</p>
        </div>

        {/* Interactive Map Visual */}
        <div className="bg-[#0c0d10] border border-gray-900 rounded-2xl p-8 min-h-[300px] flex items-center justify-center relative">
          <div className="grid grid-cols-3 gap-8 w-full max-w-sm">
            {tables.map(num => (
              <button
                key={num}
                type="button"
                onClick={() => setSelectedTable(num)}
                className={`h-16 rounded-full flex items-center justify-center font-black text-sm border-2 transition-all ${
                  selectedTable === num
                    ? 'bg-[#E12515]/20 border-[#E12515] text-white shadow-[0_0_20px_rgba(225,37,21,0.3)]'
                    : 'bg-[#111317] border-gray-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-6 text-xs text-gray-400">
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#111317] border border-gray-800 rounded-full inline-block"></span> Bo'sh</div>
          <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#E12515]/20 border-[#E12515] rounded-full inline-block"></span> Siz tanlagan</div>
        </div>
      </div>
    </div>
  );
}