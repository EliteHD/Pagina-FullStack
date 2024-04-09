import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/dashboard/Home'
import UserForm from './pages/dashboard/users/UserForm'
import Menu from './components/Navbar'
import { Container } from '@mui/material'
import Footer from './components/Footer'
import { AuthProvider } from './providers/AuthContext'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import PrivateRoute from './router/PrivateRoute'
import Mantenimiento from './components/Mantenimiento'
import PublicRoute from './router/PublicRoute'
import { AlertProvider } from './providers/AlertContext'
import { Notification } from './components/Notification'


function App() {
  
 
  return (

    <AuthProvider>
      <AlertProvider>
        <BrowserRouter>
          <Menu />
          <Notification />
          <Container>
            <Routes>
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Home /></PrivateRoute>} />
              

              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route exact path='*' element={<Mantenimiento />} />

            </Routes>
          </Container>
          <Footer />
        </BrowserRouter>
      </AlertProvider>
    </AuthProvider>

  )
}

export default App
