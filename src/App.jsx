import React, { useState, useEffect } from 'react';
import './App.css';
// AOS kutubxonasini js qismini ham import qilamiz
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { 
  ShoppingCart, X, Plus, Minus, ArrowRight, Bike, 
  Calendar, UtensilsCrossed, Clock, MapPin, Phone, Menu, Trash2, Lock, User
} from 'lucide-react';

const MENU_DATA = [
  { id: 1, name: 'Classic Burger', category: 'Burgerlar', price: 45000, desc: 'Shirin bulka, go\'sht, pomidor, salat va maxsus sous', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600' },
  { id: 2, name: 'Margarita Pizza', category: 'Pizza', price: 65000, desc: 'Klassik italyan pizza, mozzarella va rayxon bilan', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600' },
  { id: 3, name: 'Sushi Set', category: 'Sushi', price: 120000, desc: 'Yangi baliq, guruch va nori bilan tayyorlangan', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600' }
];

export default function App() {
  // Tizimga kirish uchun state-lar
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Hammasi');
  const [toastMessage, setToastMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Savat buyurtmasi uchun state-lar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  // Joy band qilish (Booking) to'lov modali uchun state-lar
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isBookingPaid, setIsBookingPaid] = useState(false);

  // Joy band qilish ichidagi ichki tab uchun state ('table' yoki 'food')
  const [bookingTab, setBookingTab] = useState('table');

  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: ''
  });

  // Sayt yuklanganda AOS-ni ishga tushirish
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Har safar sahifa o'zgarganda yoki ichki tab o'zgarganda AOS animatsiyalarini yangilash
  useEffect(() => {
    if (isLoggedIn) {
      AOS.refresh();
    }
  }, [currentPage, activeCategory, bookingTab, isLoggedIn]);

  // Login tekshirish funksiyasi
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginInput === 'Sayyorbek' && passwordInput === '2026') {
      setIsLoggedIn(true);
      setLoginError('');
      setToastMessage('Xush kelibsiz, Sayyorbek!');
      setTimeout(() => setToastMessage(''), 3000);
    } else {
      setLoginError('Login yoki parol noto\'g\'ri!');
    }
  };

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
    
    setToastMessage(`${item.name} savatga qo'shildi`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
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

  // Joy band qilish tugmasi bosilganda
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.date || !bookingForm.time || !bookingForm.guests) {
      alert("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }
    setIsBookingModalOpen(true);
  };

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setActiveCategory('Hammasi');
    setBookingTab('table');
    setIsMenuOpen(false);
  };

  // Savatdagi rasmiylashtirish oynasini ochish
  const handleCheckoutClick = () => {
    if (cart.length === 0) {
      alert("Savatingiz bo'sh!");
      return;
    }
    setIsCartOpen(false); 
    setIsModalOpen(true); 
  };

  // --- TIZIMGA KIRISH OYNASI (IF NOT LOGGED IN) ---
  if (!isLoggedIn) {
    return (
      <div style={{
        width: '100vw', height: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#f0f2f5', fontFamily: 'sans-serif', padding: '20px'
      }}>
        <form onSubmit={handleLoginSubmit} style={{
          background: '#fff', padding: '35px', borderRadius: '16px',
          maxWidth: '400px', width: '100%', boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px', height: '60px', background: '#fff5f5', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto',
            border: '2px solid #E12515'
          }}>
            <Lock size={28} color="#E12515" />
          </div>
          
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', color: '#1e293b' }}>Tizimga kirish</h2>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Davom etish uchun hisobingizga kiring</p>
          
          {loginError && (
            <div style={{
              background: '#fef2f2', color: '#ef4444', padding: '10px', 
              borderRadius: '8px', fontSize: '13px', marginBottom: '16px', fontWeight: '500'
            }}>
              {loginError}
            </div>
          )}

          {/* Login Input */}
          <div style={{ position: 'relative', marginBottom: '16px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Login</label>
            <div style={{ position: 'relative' }}>
              <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Loginni kiriting" 
                value={loginInput}
                onChange={e => setLoginInput(e.target.value)}
                style={{
                  width: '88%', padding: '12px 12px 12px 40px', borderRadius: '8px',
                  border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none'
                }}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={{ position: 'relative', marginBottom: '24px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Parol</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                placeholder="Parolni kiriting" 
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                style={{
                  width: '88%', padding: '12px 12px 12px 40px', borderRadius: '8px',
                  border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none'
                }}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-red kilo" style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '15px' }}>
            Kirish
          </button>
        </form>
      </div>
    );
  }

  // --- ASOSIY RESTORAN SAYTI (IF LOGGED IN) ---
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
      <header className="nav-header" data-aos="fade-down">
        <button className="burger-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} color="#0f172a" /> : <Menu size={24} color="#0f172a" />}
        </button>

        <div className="logo-area" onClick={() => handleNavClick('home')}>
          <div className="logo-circle">R</div>
          <span className="logo-text">Restoran</span>
        </div>
        
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
        {currentPage === 'home' && (
          <>
            <div className="hero-card" data-aos="fade-down" data-aos-delay="100">
              <div className="hero-bg" />
              <div className="hero-overlay" />
              <div className="hero-content">
                <h1 className="hero-title">Xush kelibsiz!</h1>
                <p className="hero-subtitle">Eng mazali va sifatli taomlarni tanlang</p>
                <button 
                  onClick={() => setCurrentPage('menu')} 
                  className="btn-red btn-with-arrow" 
                  style={{ 
                    padding: '14px 28px', 
                    display: 'inline-flex',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: '8px',
                    margin: '0 auto'
                  }}
                >
                  Aniqroq ko'rish <ArrowRight size={16} className="arrow-icon" />
                </button>
              </div>
            </div>

            {/* XIZMATLARIMIZ BO'LIMI */}
            <section className="services-section">
              <h2 className="services-title" data-aos="fade-down" data-aos-delay="200">Xizmatlarimiz</h2>
              <p className="services-subtitle" data-aos="fade-down" data-aos-delay="250">Sizga qulay bo'lgan xizmatni tanlang</p>

              <div className="services-grid">
                <div 
                  className="service-card" 
                  onClick={() => handleNavClick('delivery')}
                  style={{ cursor: 'pointer' }}
                  data-aos="fade-down"
                  data-aos-delay="300"
                >
                  <div className="service-img-wrapper delivery-bg">
                    <div className="service-icon-circle">
                      <Bike size={24} color="#ff5a00" />
                    </div>
                  </div>
                  <div className="service-card-body">
                    <h3>Yetkazib berish</h3>
                    <p>Tez va ishonchli yetkazib berish xizmati</p>
                    <div className="service-link-btn">
                      Batafsil <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

                <div 
                  className="service-card" 
                  onClick={() => handleNavClick('booking')}
                  style={{ cursor: 'pointer' }}
                  data-aos="fade-down"
                  data-aos-delay="400"
                >
                  <div className="service-img-wrapper booking-bg">
                    <div className="service-icon-circle">
                      <Calendar size={24} color="#ff5a00" />
                    </div>
                  </div>
                  <div className="service-card-body">
                    <h3>Joy band qilish</h3>
                    <p>Stol band qilish va ovqat buyurtma qilish</p>
                    <div className="service-link-btn">
                      Batafsil <ArrowRight size={16} />
                    </div>
                  </div>
                </div>

                <div 
                  className="service-card" 
                  onClick={() => handleNavClick('menu')}
                  style={{ cursor: 'pointer' }}
                  data-aos="fade-down"
                  data-aos-delay="500"
                >
                  <div className="service-img-wrapper menu-bg">
                    <div className="service-icon-circle">
                      <UtensilsCrossed size={24} color="#ff5a00" />
                    </div>
                  </div>
                  <div className="service-card-body">
                    <h3>Ovqat buyurtirish</h3>
                    <p>Menyudan tanlang va buyurtma bering</p>
                    <div className="service-link-btn">
                      Batafsil <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="cta-banner" data-aos="fade-down" data-aos-delay="200">
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

        {/* JOY BAND QILISH SAHIFA */}
        {currentPage === 'booking' && (
          <div className="booking-section">
            <h2 className="booking-title" data-aos="fade-down">Joy band qilish</h2>
            <p className="booking-subtitle" data-aos="fade-down" data-aos-delay="100">Stolni band qiling va ovqat buyurtma qiling</p>
            
            <div className="tab-container" data-aos="fade-down" data-aos-delay="150">
              <button 
                className={`tab-btn ${bookingTab === 'table' ? 'active' : ''}`} 
                onClick={() => setBookingTab('table')}
              >
                Stol bandi
              </button>
              <button 
                className={`tab-btn kilo ${bookingTab === 'food' ? 'active' : ''}`} 
                onClick={() => setBookingTab('food')}
              >
                Ovqat tanlash
              </button>
            </div>

            {bookingTab === 'table' && (
              <div className="cetr" data-aos="fade-up" data-aos-delay="200">
                <form className="form-card" onSubmit={handleBookingSubmit}>
                  <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '700' }}>Stol bandi ma'lumotlari</h3>
                  <div className="form-grid">
                    <div>
                      <label className="input-label">Ismingiz</label>
                      <input type="text" placeholder="Ismingizni kiriting" className="input-field" value={bookingForm.name} onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})} />
                    </div>
                    <div>
                      <label className="input-label">Telefon</label>
                      <input type="text" placeholder="+998 90 123 45 67" className="input-field" value={bookingForm.phone} onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})} />
                    </div>
                    <div>
                      <label className="input-label">Sana</label>
                      <input type="date" className="input-field" value={bookingForm.date} onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})} />
                    </div>
                    <div>
                      <label className="input-label">Vaqt</label>
                      <select className="input-field" value={bookingForm.time} onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}>
                        <option value="">Vaqtni tanlang</option>
                        <option value="18:00">18:00</option>
                        <option value="19:00">19:00</option>
                        <option value="20:00">20:00</option>
                      </select>
                    </div>
                    <div className="full-width">
                      <label className="input-label">Mehmonlar soni</label>
                      <input type="number" placeholder="Mehmonlar soni" className="input-field" value={bookingForm.guests} onChange={(e) => setBookingForm({...bookingForm, guests: e.target.value})} />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn-white" onClick={() => setBookingTab('food')}>Ovqat qo'shish</button>
                    <button type="submit" className="btn-red kilo">Band qilish</button>
                  </div>
                </form>
              </div>
            )}

            {bookingTab === 'food' && (
              <div className="booking-food-content" data-aos="fade-up" data-aos-delay="200">
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

                <div className="food-grid" style={{ marginTop: '30px' }}>
                  {MENU_DATA.filter(item => activeCategory === 'Hammasi' || item.category === activeCategory).map((item, index) => (
                    <div key={item.id} className="food-card" data-aos="fade-up" data-aos-delay={50 * (index + 1)}>
                      <div className="img-container">
                        <img src={item.img} alt={item.name} className="food-img" />
                        <span className="badge-tag">{item.category}</span>
                      </div>
                      <div className="card-body">
                        <h4 className="food-name">{item.name}</h4>
                        <p className="food-desc">{item.desc}</p>
                        <div className="card-footer">
                          <span className="food-price">{item.price.toLocaleString()} so'm</span>
                          <button onClick={() => addToCart(item)} className="btn-red kilo" style={{ padding: '8px 16px', fontSize: '13px' }}>+ Qo'shish</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* YETKAZIB BERISH SAHIFA */}
        {currentPage === 'delivery' && (
          <div className="delivery-section-page">
            <h2 className="delivery-main-title" data-aos="fade-down">Yetkazib berish</h2>
            <p className="delivery-main-subtitle" data-aos="fade-down" data-aos-delay="100">Buyurtmangizni uyingizga yetkazib beramiz</p>

            <div className="delivery-info-grid">
              <div className="delivery-info-card" data-aos="fade-down" data-aos-delay="150">
                <div className="delivery-icon-orange-circle"><Clock size={20} color="#ff5a00" /></div>
                <div><h4>Yetkazib berish vaqti</h4><p>30-45 daqiqa</p></div>
              </div>
              <div className="delivery-info-card" data-aos="fade-down" data-aos-delay="200">
                <div className="delivery-icon-orange-circle"><MapPin size={20} color="#ff5a00" /></div>
                <div><h4>Yetkazib berish</h4><p>15,000 so'm</p></div>
              </div>
              <div className="delivery-info-card" data-aos="fade-down" data-aos-delay="250">
                <div className="delivery-icon-orange-circle"><Phone size={20} color="#ff5a00" /></div>
                <div><h4>Aloqa</h4><p>+998 90 123 45 67</p></div>
              </div>
            </div>

            <div className="categories-container" style={{ marginTop: '40px' }} data-aos="fade-down" data-aos-delay="300">
              {['Hammasi', 'Burgerlar', 'Pizza', 'Sushi', 'Pasta', 'Salatlar', 'Go\'sht', 'Desertlar'].map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}>{cat}</button>
              ))}
            </div>

            <div className="food-grid">
              {MENU_DATA.filter(item => activeCategory === 'Hammasi' || item.category === activeCategory).map((item, index) => (
                <div key={item.id} className="food-card" data-aos="fade-down" data-aos-delay={100 * (index + 1)}>
                  <div className="img-container">
                    <img src={item.img} alt={item.name} className="food-img" />
                    <span className="badge-tag">{item.category}</span>
                  </div>
                  <div className="card-body">
                    <h4 className="food-name">{item.name}</h4>
                    <p className="food-desc">{item.desc}</p>
                    <div className="card-footer">
                      <span className="food-price">{item.price.toLocaleString()} so'm</span>
                      <button onClick={() => addToCart(item)} className="btn-red kilo" style={{ padding: '8px 16px', fontSize: '13px' }}>+ Qo'shish</button>
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
            <h2 style={{ fontSize: '42px', fontWeight: '800', textAlign: 'center', margin: '0 0 8px 0' }} data-aos="fade-down">Bizning menyu</h2>
            <p style={{ color: '#64748b', textAlign: 'center', margin: '0 0 32px 0' }} data-aos="fade-down" data-aos-delay="100">Eng yoqimli taomlarni tanlang</p>

            <div className="categories-container" data-aos="fade-down" data-aos-delay="150">
              {['Hammasi', 'Burgerlar', 'Pizza', 'Sushi', 'Pasta', 'Salatlar', 'Go\'sht', 'Desertlar'].map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}>{cat}</button>
              ))}
            </div>

            <div className="food-grid">
              {MENU_DATA.filter(item => activeCategory === 'Hammasi' || item.category === activeCategory).map((item, index) => (
                <div key={item.id} className="food-card" data-aos="fade-down" data-aos-delay={100 * (index + 1)}>
                  <div className="img-container">
                    <img src={item.img} alt={item.name} className="food-img" />
                    <span className="badge-tag">{item.category}</span>
                  </div>
                  <div className="card-body">
                    <h4 className="food-name">{item.name}</h4>
                    <p className="food-desc">{item.desc}</p>
                    <div className="card-footer">
                      <span className="food-price">{item.price.toLocaleString()} so'm</span>
                      <button onClick={() => addToCart(item)} className="btn-red kilo" style={{ padding: '8px 16px', fontSize: '13px' }}>+ Qo'shish</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODAL SAVATCHA SIDEBAR */}
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
                  <div key={i.id} className="cart-sidebar-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <img src={i.img} alt={i.name} className="cart-item-img" style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                    
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700' }}>{i.name}</h4>
                      <span style={{ color: '#ff5a00', fontSize: '13px', fontWeight: '700' }}>{i.price.toLocaleString()} so'm</span>
                    </div>

                    {/* O'NG TOMON: O'CHIRISH VA MIQDOR TUGMALARI */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                      <button 
                        onClick={() => removeFromCart(i.id)} 
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                        title="O'chirish"
                      >
                        <Trash2 size={18} />
                      </button>

                      <div className="qty-box" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', padding: '4px 8px', borderRadius: '6px' }}>
                        <button onClick={() => updateQty(i.id, -1)} className="qty-action"><Minus size={12} /></button>
                        <span style={{ fontSize: '13px', fontWeight: 'bold', minWidth: '15px', textAlign: 'center' }}>{i.qty}</span>
                        <button onClick={() => addToCart(i)} className="qty-action"><Plus size={12} /></button>
                      </div>
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
              <button onClick={handleCheckoutClick} className="btn-red kilo" style={{ width: '100%', padding: '14px', marginBottom: '10px' }}>
                Buyurtmani rasmiylashtirish
              </button>
              <button className="btn-white kilo1" onClick={clearCart} style={{ width: '100%', padding: '12px', color: '#0f172a' }}>
                Savatni tozarash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SAVAT BUYURTMANI RASMIYLASHTIRISH MODAL OYNASI */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div style={{
            background: '#fff', padding: '24px', borderRadius: '12px',
            maxWidth: '400px', width: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            {!isOrdered ? (
              <div>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#1e293b', fontWeight: '700' }}>
                  Buyurtmani rasmiylashtirish
                </h3>
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '16px', border: '1px dashed #cbd5e1' }}>
                  <p style={{ margin: '0 0 6px 0', fontWeight: 'bold', fontSize: '14px', color: '#ef4444' }}>
                    Diqqat: 50% oldindan to'lovni amalga oshiring!
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                    Karta raqam: <strong style={{ color: '#0f172a' }}>8600 1234 5678 9012</strong>
                  </p>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500' }}>
                    Yetkazib berish manzili qayerga?
                  </label>
                  <input 
                    type="text" 
                    placeholder="Shahar, ko'cha, uy / kvartira raqami..." 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{
                      width: '100%', padding: '10px', borderRadius: '6px',
                      border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '10px', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                    Bekor qilish
                  </button>
                  <button 
                    disabled={!address.trim()}
                    onClick={() => setIsOrdered(true)}
                    style={{ 
                      flex: 1, padding: '10px', background: address.trim() ? '#22c55e' : '#cbd5e1', 
                      color: '#fff', border: 'none', borderRadius: '6px', cursor: address.trim() ? 'pointer' : 'not-allowed', fontWeight: 'bold' 
                    }}
                  >
                    To'ladim / Tasdiqlash
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>🚚</div>
                <h3 style={{ margin: '0 0 10px 0', color: '#22c55e', fontWeight: '700' }}>Rahmat! Buyurtma qabul qilindi.</h3>
                <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
                  To'lovingiz tekshirilmoqda. Buyurtmangiz <strong style={{ color: '#0f172a' }}>10-15 minut</strong> ichida ko'rsatilgan manzilga (<strong>{address}</strong>) yetkazib beriladi.
                </p>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsOrdered(false);
                    setAddress('');
                    clearCart();
                  }}
                  style={{ padding: '10px 20px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Yopish
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STOL BAND QILISH (BOOKING) UCHUN TO'LOV VA QR-KOD MODAL OYNASI */}
      {isBookingModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', zIndex: 1100, padding: '20px'
        }}>
          <div style={{
            background: '#fff', padding: '24px', borderRadius: '16px',
            maxWidth: '420px', width: '100%', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            {!isBookingPaid ? (
              <>
                <div style={{ marginBottom: '15px', color: '#ef4444' }}>
                  <Clock size={40} style={{ margin: '0 auto' }} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '10px' }}>Stol bandi: To'lov qilish</h3>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
                  Stol band qilishni tasdiqlash uchun iltimos <strong>50% oldindan to'lovni</strong> amalga oshiring.
                </p>
                
                {/* QR KOD JOYLASHUVI */}
                <div style={{ 
                  background: '#f8fafc', padding: '20px', borderRadius: '12px', 
                  border: '2px dashed #cbd5e1', marginBottom: '20px', display: 'inline-block' 
                }}>
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Restoran-Stol-Bandi-To'lovi" 
                    alt="QR Code" 
                    style={{ width: '150px', height: '150px' }}
                  />
                  <p style={{ marginTop: '10px', fontSize: '13px', fontWeight: '700', color: '#0f172a', margin: '10px 0 0 0' }}>
                    Karta: 8600 1234 5678 9012
                  </p>
                </div>

                <p style={{ fontSize: '13px', color: '#ef4444', fontWeight: '600', marginBottom: '20px' }}>
                  To'lovni amalga oshirgach, pastdagi tugmani bosing
                </p>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setIsBookingModalOpen(false)} style={{ flex: 1, padding: '12px', background: '#e2e8f0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
                    Bekor qilish
                  </button>
                  <button 
                    onClick={() => setIsBookingPaid(true)}
                    style={{ flex: 1, padding: '12px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' }}
                  >
                    Kvitansiyani saqlash
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{ marginBottom: '15px', fontSize: '50px' }}>✅</div>
                <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '10px', color: '#22c55e' }}>Muvaffaqiyatli band qilindi!</h3>
                <p style={{ fontSize: '14px', color: '#475569', marginBottom: '20px', lineHeight: '1.6' }}>
                  Rahmat! To'lov qabul qilindi. <strong>{bookingForm.name}</strong>, siz uchun <strong>{bookingForm.date}</strong> kuni soat <strong>{bookingForm.time}</strong> ga joy ajratildi.
                  <br />
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Kvitansiya qurilmangizga saqlandi (Skrinshat qilib oling).</span>
                </p>
                <button 
                  onClick={() => {
                    setIsBookingModalOpen(false);
                    setIsBookingPaid(false);
                    setBookingForm({ name: '', phone: '', date: '', time: '', guests: '' });
                    setBookingTab('table');
                  }}
                  style={{ width: '100%', padding: '12px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Yopish
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}