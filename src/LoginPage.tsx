import React, { useState } from 'react';
import { supabase } from './lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('Login မှားနေပါတယ်: ' + error.message);
    } else {
      navigate('/admin'); 
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <form onSubmit={handleLogin} style={{ padding: '30px', background: 'white', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '320px' }}>
        <h2 style={{ textAlign: 'center', color: '#4A5D45', marginBottom: '20px' }}>Admin Login</h2>
        <div style={{ marginBottom: '15px' }}>
          <input type="email" placeholder="Email" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <input type="password" placeholder="Password" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#4A5D45', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Login</button>
      </form>
    </div>
  );
}