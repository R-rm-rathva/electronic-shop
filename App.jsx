import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

const productsData = [
  { id: 's1', model: 'FR-101', name: 'Premium Fridge', price: 32000, img: '/images/fridge1.jpg' },
  { id: 's2', model: 'AW-202', name: 'Auto Washer', price: 28000, img: '/images/whasing.jpg' },
  { id: 's3', model: 'AC-303', name: 'Smart AC', price: 30000, img: '/images/ac1.jpg' },
  { id: 's4', model: 'LP-404', name: 'Smart Laptop', price: 40000, img: '/images/leptop.png' },
  { id: 's5', model: 'TV-505', name: 'LED TV', price: 25000, img: '/images/tv.jpg' },
  { id: 's6', model: 'MW-606', name: 'Microwave', price: 15000, img: '/images/watch.jpg' },
  { id: 's7', model: 'HT-707', name: 'Room Heater', price: 5000, img: '/images/fan.jpg' },
  { id: 's8', model: 'IR-808', name: 'Steam Iron', price: 2000, img: '/images/camera.png' },
  { id: 's9', model: 'FN-909', name: 'High Speed Fan', price: 3500, img: '/images/fan.jpg' },
  { id: 's10', model: 'WT-707', name: 'Smart Watch', price: 2000, img: '/images/watch.jpg' },
  { id: 's11', model: 'CL-111', name: 'Cooler', price: 12000, img: '/images/micro.jpg' },
  { id: 's12', model: 'AB-222', name: 'mixer pro', price: 1800, img: '/images/mixer.jpg' },
  { id: 's13', model: 'AB-333', name: 'smart printer', price: 1500, img: '/images/printer.jpg' },
  { id: 's14', model: 'AB-444', name: 'Radio', price: 2500, img: '/images/radio.jpg' },
  { id: 's15', model: 'AB-555', name: 'webcam', price: 2200, img: '/images/webcam.jpg' },
  { id: 's16', model: 'AB-666', name: 'airbuds Pro', price: 2200, img: '/images/airbuds.png' },
];

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [ecoHours, setEcoHours] = useState(8);
  const [complaints, setComplaints] = useState([]);
  const [reviews, setReviews] = useState([{ name: "Anjali", msg: "Great quality products!" }]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setIsPayModalOpen(true);
    setIsSuccess(false);
    setIsProcessing(false);
  };

  const processPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setCart([...cart, selectedProduct]);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      if ('speechSynthesis' in window) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Order Placed Successfully!"));
      }
    }, 2000);
  };

  return (
    <div className="app-container">
      {/* 1. Header with Centered Search */}
      <header className="main-header">
        <div className="logo">Electro<span>Mart</span></div>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search from 12 premium products..." 
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
        <div className="cart-icon">🛒 {cart.length}</div>
      </header>

      {/* 2. Symmetric Dashboard */}
      <div className="features-section">
        <div className="feat-card">
          <h3>🍀 Eco Report</h3>
          <p>Usage: <input type="number" value={ecoHours} onChange={(e)=>setEcoHours(e.target.value)} style={{width: '40px'}} /> hrs/day</p>
          <div className="eco-info"><span>Bill: ₹{ecoHours * 8 * 30}</span> | <span>🌳 {(ecoHours * 0.05).toFixed(2)} Saved</span></div>
        </div>
        <div className="feat-card">
          <h3>⚠️ Report Issue</h3>
          <form onSubmit={(e) => { e.preventDefault(); setComplaints([{ id: e.target.cid.value, status: 'Logged' }, ...complaints]); e.target.reset(); }}>
            <input name="cid" placeholder="Order ID" required /> <button type="submit">Log</button>
          </form>
          <div className="mini-list">{complaints.map((c, i) => <p key={i}>ID: {c.id}</p>)}</div>
        </div>
        <div className="feat-card">
          <h3>💬 Reviews</h3>
          <form onSubmit={(e) => { e.preventDefault(); setReviews([{ name: e.target.un.value, msg: e.target.um.value }, ...reviews]); e.target.reset(); }}>
            <input name="un" placeholder="Name" required /> <button type="submit">Post</button>
          </form>
          <div className="mini-list">{reviews.slice(0, 2).map((r, i) => <p key={i}><b>{r.name}:</b> {r.msg}</p>)}</div>
        </div>
      </div>

      {/* 3. Product Grid with Hover & ID */}
      <main className="product-layout">
        {productsData.filter(p => p.name.toLowerCase().includes(searchTerm)).map(product => (
          <div className="product-card" key={product.id}>
            <div className="img-container">
              <img src={product.img} alt={product.name} onError={(e) => e.target.src='https://via.placeholder.com/150'} />
            </div>
            <span className="product-id-tag">ID: {product.id} | {product.model}</span>
            <h3>{product.name}</h3>
            <p className="price-text">₹{product.price.toLocaleString()}</p>
            <button className="add-btn" onClick={() => handleAddToCart(product)}>Add to Cart & Pay</button>
          </div>
        ))}
      </main>

      {/* 4. Contact Footer Area */}
      <footer className="contact-section">
        <div className="contact-grid">
          <div><h3>📞 Contact</h3><p>rashmika965@gmail.com</p><p>+91 8451369751</p></div>
          <div><h3>🌐 Follow</h3><p>FB | Insta | Twitter</p></div>
          <div className="newsletter">
          <div className="newsletter">
  <h3>📩 Newsletter</h3>
  <form onSubmit={(e) => {
    e.preventDefault();
    setIsSubscribed(true); // Popup dikhane ke liye
    e.target.reset(); // Input clear karne ke liye
    
    // 3 second baad popup apne aap band ho jayega
    setTimeout(() => setIsSubscribed(false), 3000);
  }}>
    <input type="email" placeholder="Your Email" required />
    <button type="submit" className="sub-btn">Subscribe</button>
  </form>
</div>

{/* NEWSLETTER SUCCESS POPUP */}
{isSubscribed && (
  <div className="subscribe-popup">
    <div className="sub-popup-content">
      <span>🎉</span>
      <p>Thank you for subscribing!</p>
    </div>
  </div>
)}
    </div>
  </div>
</footer>

      {/* 5. Center Payment Modal */}
      {isPayModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {!isProcessing && !isSuccess ? (
              <div>
                <h2>Confirm Order 💳</h2>
                <p>{selectedProduct?.name} - <b>₹{selectedProduct?.price}</b></p>
                <button onClick={processPayment} className="pay-button">Pay with GPay / UPI</button>
                <button className="close-btn" onClick={() => setIsPayModalOpen(false)}>Cancel</button>
              </div>
            ) : isProcessing ? (
              <div className="status-box"><div className="spinner"></div><p>Connecting Securely...</p></div>
            ) : (
              <div className="status-box"><h1>✅</h1><h2>Success!</h2><button className="pay-button" onClick={() => setIsPayModalOpen(false)}>Done</button></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;