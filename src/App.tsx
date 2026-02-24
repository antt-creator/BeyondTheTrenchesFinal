import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Router ကို ပေါင်းထည့်ထားသည်
import { motion, AnimatePresence } from 'motion/react';
import { COUNTRIES, BOOK_INFO, CountryCode } from './constants';
import OrderForm from './components/OrderForm';
import AdminDashboard from './AdminDashboard';
import LoginPage from './LoginPage';
import { ShoppingCart, MapPin, Users, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

// ၁။ LandingPage ဆိုပြီး နာမည်ပြောင်းလိုက်ပါ (App မဟုတ်တော့ပါ)
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
      <header className="sticky top-0 z-50 bg-warm-bg/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-olive" />
            <span className="font-serif font-bold text-xl tracking-tight">{BOOK_INFO.publisher.toUpperCase()}</span>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-olive/5 rounded-[40px] blur-2xl group-hover:bg-olive/10 transition-all duration-500" />
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={BOOK_INFO.coverImage}
                alt={BOOK_INFO.title}
                className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">{BOOK_INFO.title}</h1>
                <p className="text-lg text-black/60 italic font-serif">by {BOOK_INFO.author}</p>
              </div>
              <p className="text-lg leading-relaxed text-black/70 max-w-xl">{BOOK_INFO.synopsis}</p>

              <div className="space-y-6 pt-4">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Select Your Country</label>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(COUNTRIES) as CountryCode[]).map((code) => (
                      <button key={code} onClick={() => setSelectedCountry(code)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${selectedCountry === code ? 'bg-olive text-white shadow-md' : 'bg-white text-black/60'}`}>
                        {COUNTRIES[code].name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-3xl font-serif font-bold text-olive">{country.currency} {country.price.toLocaleString()}</p>
                </div>

                {country.isDirectOrder ? (
                  <button onClick={() => setShowOrderForm(true)} className="btn-primary flex items-center gap-2 group">
                    <ShoppingCart className="w-5 h-5" /> Buy Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <div className="p-4 bg-olive/5 rounded-2xl border border-olive/10 text-olive text-sm font-medium">
                    ကိုယ်စားလှယ်များထံ တိုက်ရိုက်ဆက်သွယ်ဝယ်ယူနိုင်ပါသည်။
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals & Success Popups */}
      <AnimatePresence>
        {showOrderForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowOrderForm(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-warm-bg rounded-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
               <div className="flex justify-between items-center mb-8">
                 <h2 className="text-3xl font-serif font-bold">Secure Order</h2>
                 <button onClick={() => setShowOrderForm(false)} className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">✕</button>
               </div>
               <OrderForm countryCode={selectedCountry} onSuccess={handleOrderSuccess} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {orderSuccess && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-white rounded-[40px] p-12 text-center max-w-md w-full shadow-2xl">
              <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
              <h2 className="text-3xl font-serif font-bold mb-2">Order Confirmed!</h2>
              <p className="text-2xl font-mono font-bold text-olive mb-8">{orderSuccess}</p>
              <button onClick={() => setOrderSuccess(null)} className="btn-primary w-full">Back to Home</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-12 border-t border-black/5 text-center">
        <p className="text-sm text-black/40">© 2026 {BOOK_INFO.publisher}. All rights reserved.</p>
      </footer>
    </div>
  );
}

// ၂။ ဒါက Website ရဲ့ ဗဟိုချက် (App) ဖြစ်ရပါမယ်
export default function App() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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