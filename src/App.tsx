import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderForm from './components/OrderForm';
import LoginPage from './LoginPage';
import AdminDashboard from './AdminDashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ဝယ်သူတွေ အော်ဒါတင်မယ့် စာမျက်နှာ */}
        <Route path="/" element={<OrderForm countryCode="TH" onSuccess={() => {}} />} />
        
        {/* Admin Login ဝင်မယ့် စာမျက်နှာ */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Login ဝင်ပြီးမှ ကြည့်လို့ရမယ့် Admin Panel */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}