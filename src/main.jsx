import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <Router>
      <App />
    </Router>
  </ChakraProvider>
)
