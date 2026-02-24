import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('date', { ascending: false }); 
    
    if (!error) setOrders(data || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrder = async (id: string) => {
    if (window.confirm("ဤအော်ဒါကို ဖျက်ရန် သေချာပါသလား?")) {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

      if (error) {
        alert("ဖျက်၍မရပါ: " + error.message);
      } else {
        fetchOrders();
      }
    }
  };

  const copyToSheets = () => {
    let tsvContent = "Date\tName\tPhone\tAddress\tQty\tPaymentType\tNotes\n";
    orders.forEach(o => {
      tsvContent += `${o.date}\t${o.name}\t${o.phone}\t${o.address}\t${o.qty}\t${o.paymentType}\t${o.notes}\n`;
    });
    navigator.clipboard.writeText(tsvContent);
    alert("Copy ကူးပြီးပါပြီ။");
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#4A5D45', margin: 0 }}>Order Management</h2>
        <button onClick={copyToSheets} style={copyBtnStyle}>📋 Copy for Sheets</button>
      </div>

      <div style={{ overflowX: 'auto', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f8fafc' }}>
            <tr>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Address</th>
              <th style={thStyle}>Qty</th>
              <th style={thStyle}>Payment</th>
              <th style={thStyle}>Receipt</th>
              <th style={{ ...thStyle, textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No orders found.</td></tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>{o.date}</td>
                  <td style={tdStyle}>{o.name}</td>
                  <td style={tdStyle}>{o.phone}</td>
                  <td style={tdStyle}>{o.address}</td>
                  <td style={tdStyle}>{o.qty}</td>
                  <td style={tdStyle}>{o.paymentType}</td>
                  <td style={tdStyle}>
                    {o.receiptUrl ? (
                      <a href={o.receiptUrl} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>View</a>
                    ) : '-'}
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    {/* Trash Icon Button */}
                    <button 
                      onClick={() => deleteOrder(o.id)}
                      style={iconButtonStyle}
                      title="Delete Order"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Styles
const thStyle = { padding: '16px', color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase' as const, letterSpacing: '0.05em' };
const tdStyle = { padding: '16px', fontSize: '14px', color: '#1e293b' };
const copyBtnStyle = { padding: '10px 18px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' as const, fontSize: '14px' };

const iconButtonStyle = { 
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px', 
  backgroundColor: 'transparent', 
  color: '#ef4444', 
  border: '1px solid #fee2e2', 
  borderRadius: '6px', 
  cursor: 'pointer',
  transition: 'all 0.2s',
  outline: 'none'
};