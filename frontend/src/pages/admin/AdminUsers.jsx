import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Search, Mail, Shield, Calendar, Users as UsersIcon } from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const data = await api('/api/admin/users');
      setUsers(data.items);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-ink">Quản lý người dùng</h1>
        <p className="mt-1 text-sm font-medium text-zinc-500">Xem danh sách thành viên và quản trị viên</p>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm focus-within:ring-2 focus-within:ring-brand/20 transition-all">
         <div className="flex flex-1 items-center gap-3 px-3">
            <Search size={20} className="text-zinc-400" />
            <input 
              type="text" 
              placeholder="Tìm theo tên hoặc email..." 
              value={searchTerm}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent py-2 text-sm font-bold text-ink outline-none placeholder:font-medium placeholder:text-zinc-400"
            />
         </div>
      </div>

      <div className="overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/50">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Người dùng</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Vai trò</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Hạng/Điểm</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Ngày tham gia</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}><td colSpan="5" className="px-6 py-6"><div className="h-10 w-full animate-shimmer rounded-xl bg-zinc-100"></div></td></tr>
                ))
              ) : filteredUsers.map((user) => (
                <tr key={user.email} className="hover:bg-zinc-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-black">
                          {user.name.charAt(0)}
                       </div>
                       <div>
                          <p className="font-bold text-ink">{user.name}</p>
                          <p className="text-[10px] text-zinc-400 flex items-center gap-1"><Mail size={10} /> {user.email}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                      user.role === 'admin' ? 'bg-ink text-white' : 'bg-zinc-100 text-zinc-500'
                    }`}>
                      <Shield size={10} />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                       <p className="text-xs font-bold text-ink">{user.loyaltyRank || 'N/A'}</p>
                       <p className="text-[10px] font-medium text-zinc-400">{user.points || 0} points</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-500">
                    <p className="text-xs flex items-center gap-1.5"><Calendar size={12} /> {new Date(user.joinedAt).toLocaleDateString('vi-VN')}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filteredUsers.length === 0 && (
          <div className="px-6 py-20 text-center">
             <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-300">
                <UsersIcon size={24} />
             </div>
             <p className="text-sm font-bold text-zinc-400">Không tìm thấy người dùng nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
