import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Login } from './pages';
import { Navbar } from './components';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
