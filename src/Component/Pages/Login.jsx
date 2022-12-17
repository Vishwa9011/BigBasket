import React, { useEffect, useReducer, useState } from 'react';
import { Box, Image, Spacer } from "@chakra-ui/react";
import { useAuth } from '../../Context/AuthContext/AuthContextProvider';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Signup from '../Login/Signup';
import SignIn from '../Login/SignIn';
import '../Login/flip-transition.css';
import '../Login/Login.css'
import './styles.css'

export default function Login() {
     const { isAuth } = useAuth();
     const navigate = useNavigate();
     const [showFront, setShowFront] = useState(true)

     // * swapping from page
     const setPage = () => {
          setShowFront(v => !v)
     }
 
     return (
          <>   
               <Navbar />
               <Box className='loginContainer' zIndex='99' backdropBlur='10px'>
                    <Box h='90%' w='100%' className='flip-page'>
                         <CSSTransition in={showFront} timeout={300} classNames='flip'>
                              <Box className='loginPage'>
                                   <Box className='signup'>
                                        <Signup setPage={setPage} />
                                   </Box>
                                   <Box className='signin'>
                                        <SignIn setPage={setPage} />
                                   </Box>
                              </Box>
                         </CSSTransition>
                    </Box>
                    <Spacer />
                    <Box p='2'>
                         <Image src='https://www.bbassets.com/static/staticContent/footersprite.png' alt='' />
                    </Box>
               </Box>
          </>

     );
}