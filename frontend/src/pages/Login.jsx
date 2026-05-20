import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('member@urbanstep.vn');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-paper lg:grid-cols-[1.1fr_0.9fr]">
      {/* Left Section: Hero */}
      <section className="hero-photo relative hidden flex-col justify-between p-12 text-white lg:flex">
        <motion.a 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          href="#/login" 
          className="flex items-center gap-4"
        >
          <span className="brand-mark brand-mark-lg brand-mark-light ring-4 ring-white/10">US</span>
          <div className="space-y-0.5">
            <span className="block text-2xl font-black tracking-tight">UrbanStep</span>
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/50">Premium Footwear</span>
          </div>
        </motion.a>
        
        <div className="max-w-2xl pb-12">
          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-orange-200 backdrop-blur-md ring-1 ring-white/20"
          >
            <Sparkles size={12} />
            Spring Collection 2026
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-6xl font-black leading-[1.1] tracking-tight xl:text-8xl"
          >
            Nơi đam mê <br /> 
            <span className="text-brand">gặp gỡ</span> phong cách
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 max-w-lg text-lg leading-relaxed text-white/60"
          >
            Tham gia cộng đồng UrbanStep để nhận những đặc quyền sớm nhất, giảm giá độc quyền và bộ sưu tập giới hạn.
          </motion.p>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-0 right-0 h-full w-full bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none"></div>
      </section>

      {/* Right Section: Form */}
      <section className="flex items-center justify-center p-6 sm:p-12">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md"
        >
          <div className="mb-12 lg:hidden">
            <span className="brand-mark brand-mark-lg ring-4 ring-brand/10">US</span>
            <h1 className="mt-8 text-4xl font-black tracking-tight text-ink">UrbanStep</h1>
            <p className="mt-2 text-sm font-medium text-zinc-500">Đăng nhập thành viên để tiếp tục.</p>
          </div>

          <div className="rounded-[2.5rem] border border-zinc-200 bg-white p-10 shadow-2xl shadow-zinc-200/50 sm:p-14">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight text-ink">Đăng nhập</h2>
              <p className="text-sm font-medium text-zinc-400">Chào mừng bạn đã trở lại!</p>
            </div>

            {error && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mt-8 rounded-2xl bg-red-50 p-4 text-xs font-bold text-red-600 ring-1 ring-red-100 flex items-center gap-3"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse"></div>
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Email address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand transition-colors" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="focus-ring h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-50 pl-12 pr-4 text-sm font-bold text-ink outline-none transition-all placeholder:font-medium focus:bg-white focus:border-brand/30" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 pl-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand transition-colors" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="focus-ring h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-50 pl-12 pr-4 text-sm font-bold text-ink outline-none transition-all placeholder:font-medium focus:bg-white focus:border-brand/30" 
                    required 
                  />
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-ink text-sm font-black text-white shadow-xl shadow-zinc-200 transition-all hover:bg-zinc-800 disabled:opacity-50"
              >
                {loading ? 'Đang xử lý...' : (
                  <>
                    Tiếp tục
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-10 rounded-2xl bg-brand/5 p-4 text-center ring-1 ring-brand/10">
               <p className="text-[10px] font-black uppercase tracking-widest text-brand/60 mb-1">Tài khoản dùng thử</p>
               <p className="text-xs font-bold text-zinc-600">member@urbanstep.vn <span className="text-zinc-300 mx-2">|</span> 123456</p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
