import './App.css'
import AllRoutes from './AllRoutes';
import axios from 'axios';
import { Message } from './Component/Message/Message';
import { useAuth } from './Context/AuthContextProvider';

axios.defaults.baseURL = 'http://localhost:3000'

function App() {

  const { msg } = useAuth()
  console.log('msg: ', msg);

  return (
    <>
      <AllRoutes />
      {/* <Message msg={msg.msg} msgType={msg.msgType} description={msg?.description} /> */}
    </>
  )
}

export default App
