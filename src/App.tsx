import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { COUNTRIES, BOOK_INFO, CountryCode } from './constants';
import OrderForm from './components/OrderForm';
import AdminDashboard from './AdminDashboard';
import LoginPage from './LoginPage';
import { ShoppingCart, MapPin, Users, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

// Landing Page (Shop) Component ကို သီးသန့်ထုတ်လိုက်ပါသည်
function LandingPage() {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('TH');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const country = COUNTRIES[selectedCountry];

  const handleOrderSuccess = (orderId: string) => {
    setOrderSuccess(orderId);
    setShowOrderForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-bg">
      <nav className="sticky top-0 z-50 bg-warm-bg/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-olive" />
            <span className="font-serif font-bold text-xl tracking-tight">{BOOK_INFO.publisher.toUpperCase()}</span>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Book Cover */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-olive/5 rounded-[40px] blur-2xl group-hover:bg-olive/10 transition-all duration-500" />
              <img src={BOOK_INFO.coverImage} alt={BOOK_INFO.title} className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl" />
            </div>

            {/* Content */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-serif font-bold">{BOOK_INFO.title}</h1>
              <p className="text-lg leading-relaxed text-black/70">{BOOK_INFO.synopsis}</p>
              
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-black/40">Select Country</label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(COUNTRIES) as CountryCode[]).map((code) => (
                    <button key={code} onClick={() => setSelectedCountry(code)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${selectedCountry === code ? 'bg-olive text-white' : 'bg-white'}`}>
                      {COUNTRIES[code].name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <p className="text-3xl font-serif font-bold text-olive">{country.currency} {country.price.toLocaleString()}</p>
                {country.isDirectOrder ? (
                  <button onClick={() => setShowOrderForm(true)} className="btn-primary mt-4 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" /> Buy Now <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <p className="text-olive mt-4 italic">ကိုယ်စားလှယ်များထံ ဆက်သွယ်ဝယ်ယူပေးပါရန်။</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Order Modal */}
      <AnimatePresence>
        {showOrderForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowOrderForm(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="relative w-full max-w-2xl bg-warm-bg rounded-3xl p-8 max-h-[90vh] overflow-y-auto">
              <OrderForm countryCode={selectedCountry} onSuccess={handleOrderSuccess} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {orderSuccess && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-white rounded-[40px] p-12 text-center max-w-md w-full">
              <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
              <h2 className="text-3xl font-serif font-bold mb-2">Order Confirmed!</h2>
              <p className="mb-8 text-black/60">Order ID: <span className="font-bold text-olive">{orderSuccess}</span></p>
              <button onClick={() => setOrderSuccess(null)} className="btn-primary w-full">Back to Home</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main App Router
export default function App() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}