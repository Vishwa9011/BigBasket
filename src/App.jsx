import './App.css'
import Navbar from './Component/Navbar/Navbar'
import AllRoutes from './AllRoutes';
import Footer from './Component/Footer/Footer';

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'

function App() {

  return (
    <>
      {/* <Navbar /> */}
      <AllRoutes />
      {/* <Footer /> */}
    </>
  )
}

export default App
