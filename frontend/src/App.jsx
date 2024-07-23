import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';

function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path= '/' element={<Homepage/>}/>
      <Route path= '/register' element={<Signup/>}/>
      <Route path= '/login' element={<Login/>}/>
      <Route path= '/about' element={<About/>}/>
      <Route path= '/profile' element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
