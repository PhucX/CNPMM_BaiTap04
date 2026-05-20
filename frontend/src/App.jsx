import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Loading from './components/Loading'

function AppContent() {
  const { user, loading } = useAuth()
  const [route, setRoute] = useState(window.location.hash || '#/home')

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#/home')
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Tự động chuyển về Login nếu chưa đăng nhập và không phải đang ở trang Login
  useEffect(() => {
    if (!loading && !user && route !== '#/login') {
      window.location.hash = '#/login'
    }
  }, [loading, user, route])

  if (loading) {
    return <Loading message="Đang kiểm tra phiên đăng nhập..." />
  }

  const renderPage = () => {
    // Nếu chưa đăng nhập, chỉ cho phép xem trang Login
    if (!user) {
      return <Login />
    }

    if (route === '#/login') return <Login />
    if (route.startsWith('#/product/')) {
      const slug = decodeURIComponent(route.replace('#/product/', ''))
      return <ProductDetail slug={slug} />
    }
    return <Home />
  }

  return renderPage()
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
