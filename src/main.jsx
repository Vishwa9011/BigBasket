import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import AuthContextProvider from './Context/AuthContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ChakraProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ChakraProvider>
  </Router>
)
