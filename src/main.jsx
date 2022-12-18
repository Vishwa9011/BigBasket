import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import AuthContextProvider from './Context/AuthContext/AuthContextProvider'
import GlobalProvider from './Context/GlobalDataProvider/GlobalProvider'
import Provider from './Context/Provider/Provider'
import AdminProvider from './Context/AdminProvider/AdminProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
     <Router>
          <ChakraProvider>
               <GlobalProvider>
                    <AuthContextProvider>
                         <Provider>
                              <AdminProvider>
                                   <App />
                              </AdminProvider>
                         </Provider>
                    </AuthContextProvider>
               </GlobalProvider>
          </ChakraProvider>
     </Router>
)
