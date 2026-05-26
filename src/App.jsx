import React, { useState } from 'react';
import './App.css';
// Menu ikonkasini ham importlar qatoriga qo'shdik
import { ShoppingCart, X, Plus, Minus, ArrowRight, Bike, Calendar, UtensilsCrossed, Clock, MapPin, Phone, Menu } from 'lucide-react';

const MENU_DATA = [
  { id: 1, name: 'Classic Burger', category: 'Burgerlar', price: 45000, desc: 'Shirin bulka, go\'sht, pomidor, salat va maxsus sous', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600' },
  { id: 2, name: 'Margarita Pizza', category: 'Pizza', price: 65000, desc: 'Klassik italyan pizza, mozzarella va rayxon bilan', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600' },
  { id: 3, name: 'Sushi Set', category: 'Sushi', price: 120000, desc: 'Yangi baliq, guruch va nori bilan tayyorlangan', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600' }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Hammasi');
  const [toastMessage, setToastMessage] = useState('');
  
  // Burger menyuning ochiq/yopiq holati uchun state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Joy band qilish formasi uchun state
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: ''
  });

  // Savatga qo'shish va Toastni yoqish
  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
    
    setToastMessage(`${item.name} savatga qo'shildi`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Joy band qilish funksiyasi
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.date || !bookingForm.time || !bookingForm.guests) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }
    setToastMessage("Stol band qilindi! Tez orada aloqaga chiqamiz.");
    setBookingForm({ name: '', phone: '', date: '', time: '', guests: '' });
    setTimeout(() => setToastMessage(''), 3500);
  };

  const updateQty = (id, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + change;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const clearCart = () => setCart([]);

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  // Navigatsiya tugmasi bosilganda sahifani o'zgartirish va menyuni yopish xizmati
  const handleNavClick = (page) => {
    setCurrentPage(page);
    setActiveCategory('Hammasi');
    setIsMenuOpen(false); // Mobil menyuni avtomatik yopadi
  };

  return (
    <div className='max-with'> 
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast-success-icon">✓</div>
          <span style={{ fontSize: '13px', fontWeight: '600' }}>{toastMessage}</span>
        </div>
      )}

      {/* NAVIGATION NAVBAR */}
      <header className="nav-header">
        {/* Burger Tugmasi (Faqat mobilda ko'rinadi) */}
        <button className="burger-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} color="#0f172a" /> : <Menu size={24} color="#0f172a" />}
        </button>

        <div className="logo-area" onClick={() => handleNavClick('home')}>
          <div className="logo-circle">R</div>
          <span className="logo-text">Restoran</span>
        </div>
        
        {/* IsMenuOpen holatiga qarab 'show' klassi qo'shiladi */}
        <nav className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
          <button onClick={() => handleNavClick('home')} className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}>Bosh sahifa</button>
          <button onClick={() => handleNavClick('delivery')} className={`nav-btn ${currentPage === 'delivery' ? 'active' : ''}`}>Yetkazib berish</button>
          <button onClick={() => handleNavClick('booking')} className={`nav-btn ${currentPage === 'booking' ? 'active' : ''}`}>Joy band qilish</button>
          <button onClick={() => handleNavClick('menu')} className={`nav-btn ${currentPage === 'menu' ? 'active' : ''}`}>Menyu</button>
        </nav>

        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setIsCartOpen(true)}>
          <ShoppingCart size={22} color="#0f172a" />
          {totalItems > 0 && (
            <span style={{ position: 'absolute', top: '-6px', right: '-8px', background: '#E12515', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
              {totalItems}
            </span>
          )}
        </div>
      </header>

      {/* DYNAMIC CONTENT AREA */}
      <main>
        {/* BOSH SAHIFA */}
        {currentPage === 'home' && (
          <>
            <div className="hero-card">
              <div className="hero-bg" />
              <div className="hero-overlay" />
              <div className="hero-content">
                <h1 className="hero-title">Xush kelibsiz!</h1>
                <p className="hero-subtitle">Eng mazali va sifatli taomlarni tanlang</p>
                <button onClick={() => setCurrentPage('menu')} className="btn-red" style={{ padding: '14px 28px' }}>
                  Aniqroq ko'rish <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* XIZMATLARIMIZ BO'LIMI */}
            <section className="services-section">
              <h2 className="services-title">Xizmatlarimiz</h2>
              <p className="services-subtitle">Sizga qulay bo'lgan xizmatni tanlang</p>

              <div className="services-grid">
                <div className="service-card">
                  <div className="service-img-wrapper delivery-bg">
                    <div className="service-icon-circle">
                      <Bike size={24} color="#ff5a00" />
                    </div>
                  </div>
                  <div className="service-card-body">
                    <h3>Yetkazib berish</h3>
                    <p>Tez va ishonchli yetkazib berish xizmati</p>
                    <button onClick={() => setCurrentPage('delivery')} className="service-link-btn">
                      Batafsil <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="service-card">
                  <div className="service-img-wrapper booking-bg">
                    <div className="service-icon-circle">
                      <Calendar size={24} color="#ff5a00" />
                    </div>
                  </div>
                  <div className="service-card-body">
                    <h3>Joy band qilish</h3>
                    <p>Stol band qilish va ovqat buyurtma qilish</p>
                    <button onClick={() => setCurrentPage('booking')} className="service-link-btn">
                      Batafsil <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="service-card">
                  <div className="service-img-wrapper menu-bg">
                    <div className="service-icon-circle">
                      <UtensilsCrossed size={24} color="#ff5a00" />
                    </div>
                  </div>
                  <div className="service-card-body">
                    <h3>Ovqat buyurtirish</h3>
                    <p>Menyudan tanlang va buyurtma bering</p>
                    <button onClick={() => setCurrentPage('menu')} className="service-link-btn">
                      Batafsil <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* QIZIL BUYURTMA BANNERI */}
            <section className="cta-banner">
              <div className="cta-banner-content">
                <h2 className="cta-title">Buyurtmangizni hoziroq bering!</h2>
                <p className="cta-subtitle">Tez va sifatli xizmat, eng yangi taomlar</p>
                <button onClick={() => setCurrentPage('menu')} className="cta-btn-white">
                  Boshlash <ArrowRight size={16} />
                </button>
              </div>
            </section>
          </>
        )}

        {/* JOY BAND QILISH */}
        {currentPage === 'booking' && (
          <div className="booking-section">
            <h2 className="booking-title">Joy band qilish</h2>
            <p className="booking-subtitle">Stolni band qiling va ovqat buyurtma qiling</p>
            
            <div className="tab-container">
              <button className="tab-btn active">Stol bandi</button>
              <button className="tab-btn" onClick={() => setCurrentPage('menu')}>Ovqat tanlash</button>
            </div>

           <div className="cetr">
             <form className="form-card" onSubmit={handleBookingSubmit}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '700' }}>Stol bandi ma'lumotlari</h3>
              <div className="form-grid">
                <div>
                  <label className="input-label">Ismingiz</label>
                  <input 
                    type="text" 
                    placeholder="Ismingizni kiriting" 
                    className="input-field"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="input-label">Telefon</label>
                  <input 
                    type="text" 
                    placeholder="+998 90 123 45 67" 
                    className="input-field"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="input-label">Sana</label>
                  <input 
                    type="date" 
                    className="input-field"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="input-label">Vaqt</label>
                  <select 
                    className="input-field"
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                  >
                    <option value="">Vaqtni tanlang</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                  </select>
                </div>
                <div className="full-width">
                  <label className="input-label">Mehmonlar soni</label>
                  <input 
                    type="number" 
                    placeholder="Mehmonlar soni" 
                    className="input-field"
                    value={bookingForm.guests}
                    onChange={(e) => setBookingForm({...bookingForm, guests: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-white" onClick={() => setCurrentPage('menu')}>Ovqat qo'shish</button>
                <button type="submit" className="btn-red">Band qilish</button>
              </div>
            </form>
           </div>
          </div>
        )}

        {/* YETKAZIB BERISH SAHIFA */}
        {currentPage === 'delivery' && (
          <div className="delivery-section-page">
            <h2 className="delivery-main-title">Yetkazib berish</h2>
            <p className="delivery-main-subtitle">Buyurtmangizni uyingizga yetkazib beramiz</p>

            <div className="delivery-info-grid">
              <div className="delivery-info-card">
                <div className="delivery-icon-orange-circle">
                  <Clock size={20} color="#ff5a00" />
                </div>
                <div>
                  <h4>Yetkazib berish vaqti</h4>
                  <p>30-45 daqiqa</p>
                </div>
              </div>

              <div className="delivery-info-card">
                <div className="delivery-icon-orange-circle">
                  <MapPin size={20} color="#ff5a00" />
                </div>
                <div>
                  <h4>Yetkazib berish</h4>
                  <p>15,000 so'm</p>
                </div>
              </div>

              <div className="delivery-info-card">
                <div className="delivery-icon-orange-circle">
                  <Phone size={20} color="#ff5a00" />
                </div>
                <div>
                  <h4>Aloqa</h4>
                  <p>+998 90 123 45 67</p>
                </div>
              </div>
            </div>

            <div className="categories-container" style={{ marginTop: '40px' }}>
              {['Hammasi', 'Burgerlar', 'Pizza', 'Sushi', 'Pasta', 'Salatlar', 'Go\'sht', 'Desertlar'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)} 
                  className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="food-grid">
              {MENU_DATA.filter(item => activeCategory === 'Hammasi' || item.category === activeCategory).map(item => (
                <div key={item.id} className="food-card">
                  <div className="img-container">
                    <img src={item.img} alt={item.name} className="food-img" />
                    <span className="badge-tag">{item.category}</span>
                  </div>
                  <div className="card-body">
                    <h4 className="food-name">{item.name}</h4>
                    <p className="food-desc">{item.desc}</p>
                    <div className="card-footer">
                      <span className="food-price">{item.price.toLocaleString()} so'm</span>
                      <button onClick={() => addToCart(item)} className="btn-red" style={{ padding: '8px 16px', fontSize: '13px' }}>
                        + Qo'shish
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BIZNING MENYU */}
        {currentPage === 'menu' && (
          <div className="menu-section">
            <h2 style={{ fontSize: '42px', fontWeight: '800', textAlign: 'center', margin: '0 0 8px 0' }}>Bizning menyu</h2>
            <p style={{ color: '#64748b', textAlign: 'center', margin: '0 0 32px 0' }}>Eng yoqimli taomlarni tanlang</p>

            <div className="categories-container">
              {['Hammasi', 'Burgerlar', 'Pizza', 'Sushi', 'Pasta', 'Salatlar', 'Go\'sht', 'Desertlar'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)} 
                  className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="food-grid">
              {MENU_DATA.filter(item => activeCategory === 'Hammasi' || item.category === activeCategory).map(item => (
                <div key={item.id} className="food-card">
                  <div className="img-container">
                    <img src={item.img} alt={item.name} className="food-img" />
                    <span className="badge-tag">{item.category}</span>
                  </div>
                  <div className="card-body">
                    <h4 className="food-name">{item.name}</h4>
                    <p className="food-desc">{item.desc}</p>
                    <div className="card-footer">
                      <span className="food-price">{item.price.toLocaleString()} so'm</span>
                      <button onClick={() => addToCart(item)} className="btn-red" style={{ padding: '8px 16px', fontSize: '13px' }}>
                        + Qo'shish
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODAL SAVATCHA */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>Savatingiz</h3>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}><X size={24} /></button>
            </div>

            <div className="cart-items-scroll">
              {cart.length === 0 ? (
                <p style={{ color: '#64748b', textAlign: 'center', marginTop: '40px' }}>Savat bo'sh</p>
              ) : (
                cart.map(i => (
                  <div key={i.id} className="cart-sidebar-item">
                    <img src={i.img} alt={i.name} className="cart-item-img" />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700' }}>{i.name}</h4>
                      <span style={{ color: '#ff5a00', fontSize: '13px', fontWeight: '700' }}>{i.price.toLocaleString()} so'm</span>
                    </div>
                    <div className="qty-box">
                      <button onClick={() => updateQty(i.id, -1)} className="qty-action"><Minus size={12} /></button>
                      <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{i.qty}</span>
                      <button onClick={() => addToCart(i)} className="qty-action"><Plus size={12} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="cart-footer-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '16px', fontWeight: '700' }}>Jami:</span>
                <span style={{ fontSize: '24px', fontWeight: '800', color: '#ff5a00' }}>{totalAmount.toLocaleString()} so'm</span>
              </div>
              <button className="btn-red" style={{ width: '100%', padding: '14px', marginBottom: '10px' }}>Buyurtmani rasmiylashtirish</button>
              <button className="btn-white" onClick={clearCart} style={{ width: '100%', padding: '12px', color: '#0f172a' }}>Savatni tozalash</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}