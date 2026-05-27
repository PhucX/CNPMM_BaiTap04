import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Loading from './components/Loading'

// Admin Pages
import AdminLayout from './layout/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminUsers from './pages/admin/AdminUsers'

function AppContent() {
  const { user, loading } = useAuth()
  const [route, setRoute] = useState(window.location.hash || '#/home')

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#/home')
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Tự động chuyển về Login nếu chưa đăng nhập
  useEffect(() => {
    if (!loading && !user && route !== '#/login') {
      window.location.hash = '#/login'
    }
  }, [loading, user, route])

  if (loading) {
    return <Loading message="Đang kiểm tra phiên đăng nhập..." />
  }

  // Render trang Admin
  if (user?.role === 'admin' && route.startsWith('#/admin')) {
    let content = <Dashboard />
    if (route === '#/admin/products') content = <AdminProducts />
    if (route === '#/admin/orders') content = <AdminOrders />
    if (route === '#/admin/users') content = <AdminUsers />
    
    return (
      <AdminLayout currentPath={route}>
        {content}
      </AdminLayout>
    )
  }

  const renderPage = () => {
    if (!user) return <Login />
    
    if (route === '#/login') return <Login />
    if (route === '#/cart') return <Cart />
    if (route === '#/checkout') return <Checkout />
    if (route === '#/orders') return <Orders />
    if (route.startsWith('#/product/')) {
      const slug = decodeURIComponent(route.replace('#/product/', ''))
      return <ProductDetail slug={slug} />
    }
    
    // Mặc định cho Admin là Dashboard, Member là Home
    if (user.role === 'admin') {
       window.location.hash = '#/admin/dashboard'
       return <Dashboard />
    }
    
    return <Home />
  }

  return renderPage()
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  )
}

export default App
