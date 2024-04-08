import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/dashboard/Home'
import UserForm from './pages/dashboard/users/UserForm'
import Menu from './components/Navbar'
import { Container } from '@mui/material'
import Footer from './components/Footer'
import { AuthProvider } from './providers/AuthContext'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Menu />
        <Container>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/dashboard' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/dashboard/newUser' element={<UserForm />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
