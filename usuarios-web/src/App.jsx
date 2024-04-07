import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/dashboard/Home'
import UserForm from './pages/dashboard/users/UserForm'
import Menu from './components/Navbar'


function App() {

  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/dashboard/newUser' element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
