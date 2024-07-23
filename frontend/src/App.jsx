import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Homepage from './components/Homepage';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import About from './components/About';

const router = createBrowserRouter([
  {
    path: '/', element:<Homepage/>
  },
  {
    path: '/register', element: <Signup/>
  },
  {
    path: '/login', element: <Login/>
  },
  {
    path: '/about', element: <About/>
  },
  {
    path: '/profile', element: <Profile/>
  }
])
function App() {

  return (
    <div className='h-screen bg-green-200'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
