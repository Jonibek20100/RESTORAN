import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Sparkles } from 'lucide-react';

export const FOOD_DATA = [
  { id: 1, name: 'Wagyu Steak Premium', category: 'Taomlar', price: 120000, desc: 'Juicy Black Angus steak cooked with fresh rosemary and garlic butter.', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500' },
  { id: 2, name: 'Fresh Salmon Salad', category: 'Salatlar', price: 120000, desc: 'Fresh seared salmon, mixed greens, cherry tomatoes and lemon dressing.', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500' },
  { id: 3, name: 'Truffle Cream Pasta', category: 'Taomlar', price: 56000, desc: 'Creamy pesto fettuccine with wild mushrooms and white truffle oil.', img: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=500' },
  { id: 4, name: 'Biotione Pasta', category: 'Taomlar', price: 88000, desc: 'Elite Italian recipe sauce with homemade whole wheat pasta.', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=500' },
  { id: 5, name: 'Peming Chicken Pasta', category: 'Taomlar', price: 75000, desc: 'Creamy hot sauce with roasted chicken breasts and parmesan.', img: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=500' },
  { id: 6, name: 'Pishloq Tarelka', category: 'Salatlar', price: 95000, desc: 'Assorted elite cheese plate with walnuts and organic wild honey.', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500' },
];

export default function Delivery({ cart, addToCart, updateQty }) {
  const [activeTab, setActiveTab] = useState('Hammasi');
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Menu Grid Column */}
      <div className="lg:col-span-3 space-y-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['Hammasi', 'Taomlar', 'Salatlar'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase border transition-all ${
                activeTab === tab 
                  ? 'bg-[#E12515] text-white border-[#E12515] shadow-lg shadow-red-600/10' 
                  : 'bg-[#111317] text-gray-400 border-gray-800 hover:border-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FOOD_DATA.filter(item => activeTab === 'Hammasi' || item.category === activeTab).map(item => (
            <div key={item.id} className="bg-[#111317] border border-gray-950 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between h-full group hover:border-gray-800 transition-all">
              <div className="h-44 overflow-hidden relative">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-white">{item.name}</h4>
                  <p className="text-gray-500 text-xs line-clamp-2 font-light leading-relaxed">{item.desc}</p>
                </div>
                <div className="space-y-3">
                  <div className="text-amber-500 font-extrabold text-lg">{item.price.toLocaleString()} UZS</div>
                  <button 
                    onClick={() => addToCart(item)}
                    className="w-full bg-[#E12515] hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1 shadow-md shadow-red-600/10"
                  >
                    Savatga qo'shish +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Modern Cart Right Panel */}
      <div className="bg-[#111317] border border-gray-900 rounded-3xl p-6 h-fit sticky top-24 space-y-6 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-gray-800 pb-4">
          <ShoppingCart className="text-[#E12515] w-5 h-5" />
          <h3 className="text-base font-bold text-white">Sizning Savatingiz:</h3>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-12 text-sm">Savat bo'sh. Taom qo'shing!</p>
        ) : (
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-[#0c0d10] p-3 rounded-xl border border-gray-900">
                <div className="max-w-[140px]">
                  <h5 className="font-bold text-xs text-white truncate">{item.name}</h5>
                  <span className="text-[11px] text-amber-500 font-medium">{(item.price * item.qty).toLocaleString()} UZS</span>
                </div>
                <div className="flex items-center gap-2 bg-[#111317] rounded-lg p-1 border border-gray-800">
                  <button onClick={() => updateQty(item.id, -1)} className="p-1 text-gray-400 hover:text-white"><Minus className="w-3 h-3" /></button>
                  <span className="text-xs font-bold w-4 text-center text-white">{item.qty}</span>
                  <button onClick={() => addToCart(item)} className="p-1 text-gray-400 hover:text-white"><Plus className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-gray-800 pt-4 space-y-4">
          <div className="flex justify-between font-bold text-sm text-gray-300">
            <span>Jami:</span>
            <span className="text-amber-500 text-base font-black">{totalAmount.toLocaleString()} UZS</span>
          </div>
          <button className="w-full bg-[#E12515] hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/10">
            Buyurtmani tasdiqlash
          </button>
        </div>
      </div>
    </div>
  );
}