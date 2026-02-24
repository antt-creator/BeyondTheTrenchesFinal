import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // လမ်းကြောင်းမှန်အောင်စစ်ပါ
import { Loader2, ExternalLink, Package, Phone, MapPin, Calendar } from 'lucide-react';

interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  qty: number;
  paymentType: string;
  receiptUrl: string | null;
  notes: string | null;
  created_at: string;
}

export default function AdminPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false }); // အသစ်ဆုံးကို အပေါ်တင်ရန်

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      alert('Error loading orders: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-olive" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-serif text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-sm text-gray-500">Total Orders: {orders.length}</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-600">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Order Details</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4">Receipt</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{order.name}</div>
                      <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                        <Phone size={12} /> {order.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-900 font-medium">
                        <Package size={14} /> {order.qty} copies
                      </div>
                      <div className="flex items-start gap-1 text-gray-500 text-xs mt-1 max-w-[200px]">
                        <MapPin size={12} className="mt-0.5 shrink-0" />
                        <span className="truncate">{order.address}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                        order.paymentType === 'Prepaid' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {order.paymentType}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                        <Calendar size={10} /> {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {order.receiptUrl ? (
                        <a 
                          href={order.receiptUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="group relative inline-block h-12 w-12 overflow-hidden rounded-lg border border-gray-200"
                        >
                          <img 
                            src={order.receiptUrl} 
                            alt="receipt" 
                            className="h-full w-full object-cover group-hover:opacity-75"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
                            <ExternalLink size={14} className="text-white" />
                          </div>
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs italic">No receipt</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => alert(`Notes: ${order.notes || 'No notes'}`)}
                        className="text-xs font-semibold text-olive hover:underline"
                      >
                        View Notes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}