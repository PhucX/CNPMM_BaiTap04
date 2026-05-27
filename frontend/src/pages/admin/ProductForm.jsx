import { useState } from 'react';
import { api } from '../../services/api';
import { ChevronLeft, Save, Image as ImageIcon } from 'lucide-react';

export default function ProductForm({ product, onCancel, onSuccess }) {
  const isEdit = !!product;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(product || {
    name: '',
    slug: '',
    categoryId: 'running',
    price: 0,
    originalPrice: 0,
    stock: 10,
    summary: '',
    description: '',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80'],
    colors: ['Đen', 'Trắng'],
    sizes: [40, 41, 42],
    specs: ['Nhẹ chân', 'Thoáng khí']
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));

    if (name === 'name' && !isEdit) {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w-]/g, '')
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isEdit ? `/api/admin/products/${product.id}` : '/api/admin/products';
      const method = isEdit ? 'PUT' : 'POST';
      await api(url, {
        method,
        body: JSON.stringify(formData)
      });
      onSuccess();
    } catch (err) {
      alert('Lưu thất bại: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <button 
          onClick={onCancel}
          className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-brand transition-colors"
        >
          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Quay lại danh sách
        </button>
      </div>

      <div className="rounded-[2.5rem] border border-zinc-200 bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-black text-ink">{isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</h1>
        
        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Tên sản phẩm</label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="focus-ring h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-bold text-ink outline-none transition-all focus:bg-white" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Slug (Đường dẫn)</label>
              <input 
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="focus-ring h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-bold text-ink outline-none transition-all focus:bg-white" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Giá bán</label>
              <input 
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="focus-ring h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-bold text-ink outline-none transition-all focus:bg-white" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Số lượng kho</label>
              <input 
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                className="focus-ring h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-bold text-ink outline-none transition-all focus:bg-white" 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Mô tả ngắn</label>
            <textarea 
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows="2"
              className="focus-ring w-full rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm font-bold text-ink outline-none transition-all focus:bg-white" 
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Ảnh sản phẩm (URL)</label>
            <div className="flex gap-4">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-zinc-50 border-2 border-dashed border-zinc-200 flex items-center justify-center text-zinc-300">
                {formData.images[0] ? <img src={formData.images[0]} alt="" className="h-full w-full object-cover" /> : <ImageIcon size={24} />}
              </div>
              <input 
                value={formData.images[0]}
                onChange={(e) => setFormData({...formData, images: [e.target.value]})}
                className="focus-ring flex-1 h-12 rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm font-bold text-ink outline-none transition-all focus:bg-white self-center" 
                placeholder="Dán link ảnh tại đây..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-zinc-50">
            <button 
              type="button"
              onClick={onCancel}
              className="h-12 px-8 rounded-xl text-sm font-bold text-zinc-400 hover:text-ink transition-colors"
            >
              Hủy bỏ
            </button>
            <button 
              disabled={loading}
              className="ui-button ui-button-brand h-12 px-10 gap-2 shadow-lg shadow-brand/20"
            >
              <Save size={18} />
              {loading ? 'Đang lưu...' : 'Lưu sản phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
