import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/api';
import { formatMoney } from '../../utils/helpers';
import { Plus, Search, Edit2, Trash2, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductList({ onEdit, onAdd }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearch] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 1
  });

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const data = await api(`/api/admin/products?page=${page}&pageSize=${pagination.pageSize}`);
      setProducts(data.items);
      setPagination({
        page: data.page,
        pageSize: data.pageSize,
        total: data.total,
        totalPages: data.totalPages
      });
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchProducts(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) return;
    
    try {
      await api(`/api/admin/products/${id}`, { method: 'DELETE' });
      // Refresh current page
      fetchProducts(pagination.page);
    } catch (err) {
      alert('Xóa thất bại: ' + err.message);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-ink">Quản lý sản phẩm</h1>
          <p className="mt-1 text-sm font-medium text-zinc-500">
            Hiển thị {products.length} trên tổng số {pagination.total} giày
          </p>
        </div>
        <button 
          onClick={onAdd}
          className="ui-button ui-button-brand h-12 gap-2 px-6 shadow-lg shadow-brand/20"
        >
          <Plus size={20} />
          Thêm sản phẩm
        </button>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm focus-within:ring-2 focus-within:ring-brand/20 transition-all">
         <div className="flex flex-1 items-center gap-3 px-3">
            <Search size={20} className="text-zinc-400" />
            <input 
              type="text" 
              placeholder="Tìm nhanh trong trang này..." 
              value={searchTerm}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent py-2 text-sm font-bold text-ink outline-none placeholder:font-medium placeholder:text-zinc-400"
            />
         </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Sản phẩm</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Danh mục</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Giá</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Kho</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              <AnimatePresence mode='popLayout'>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td colSpan="5" className="px-6 py-6">
                        <div className="h-10 w-full animate-shimmer rounded-xl bg-zinc-100"></div>
                      </td>
                    </tr>
                  ))
                ) : filteredProducts.map((product) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={product.id} 
                    className="group hover:bg-zinc-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200 text-[10px]">
                          <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-black text-ink">{product.name}</p>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-zinc-500">
                        {product.categoryId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-ink">{formatMoney(product.price)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-orange-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm font-bold text-zinc-600">{product.stock} cái</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => window.open(`#/product/${product.slug}`, '_blank')}
                          className="grid h-9 w-9 place-items-center rounded-lg bg-white border border-zinc-200 text-zinc-400 hover:text-brand transition-all shadow-sm"
                          title="Xem trên shop"
                        >
                          <ExternalLink size={16} />
                        </button>
                        <button 
                          onClick={() => onEdit(product)}
                          className="grid h-9 w-9 place-items-center rounded-lg bg-white border border-zinc-200 text-zinc-400 hover:text-blue-500 transition-all shadow-sm"
                          title="Chỉnh sửa"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="grid h-9 w-9 place-items-center rounded-lg bg-white border border-zinc-200 text-zinc-400 hover:text-red-500 transition-all shadow-sm"
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {/* Pagination UI */}
        {!loading && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50/30 px-6 py-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Trang {pagination.page} / {pagination.totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="grid h-9 w-9 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-all hover:bg-zinc-50 disabled:opacity-30 disabled:hover:bg-white"
              >
                <ChevronLeft size={18} />
              </button>
              
              {/* Page Numbers */}
              <div className="flex items-center gap-1 mx-2">
                 {Array.from({ length: pagination.totalPages }).map((_, i) => {
                    const p = i + 1;
                    return (
                       <button 
                         key={p}
                         onClick={() => handlePageChange(p)}
                         className={`h-9 min-w-[2.25rem] px-2 rounded-xl text-[10px] font-black transition-all ${
                            pagination.page === p 
                            ? 'bg-ink text-white shadow-lg shadow-zinc-200' 
                            : 'text-zinc-400 hover:bg-zinc-100 hover:text-ink'
                         }`}
                       >
                          {p}
                       </button>
                    )
                 })}
              </div>

              <button 
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="grid h-9 w-9 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-all hover:bg-zinc-50 disabled:opacity-30 disabled:hover:bg-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="px-6 py-20 text-center">
             <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-300">
                <Search size={24} />
             </div>
             <p className="text-sm font-bold text-zinc-400">Không tìm thấy sản phẩm nào phù hợp</p>
          </div>
        )}
      </div>
    </div>
  );
}
