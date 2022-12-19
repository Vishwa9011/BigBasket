import { useAuth } from '../../Context/AuthContext/AuthContextProvider';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Image, Spacer } from "@chakra-ui/react";
import { CSSTransition } from 'react-transition-group';
import Loader from '../component/Loader';
import Navbar from '../Navbar/Navbar';
import Signup from '../Login/Signup';
import SignIn from '../Login/SignIn';
import '../Login/flip-transition.css';
import '../Login/Login.css'
import './styles.css'

export default function Login() {

     const { loading } = useAuth()
     const [showFront, setShowFront] = useState(true)
     const authPage = useRef();
     console.log('authPage: ', authPage);


     const scrollPage = val => {
          console.log('val: ', val);

          authPage.current.scrollLeft += val;
     }

     // * swapping from page
     const setPage = () => {
          setShowFront(v => !v)
     }
 
     return (
          <>   
               {loading && <Loader />}
               <Navbar />
               <Box className='loginContainer' zIndex='99' backdropBlur='10px'>
                    <Box h='90%' w='100%' className='flip-page'>
                         <Box className='loginPage'>
                              <Box className='auth-page' ref={authPage}>
                                   <Box className='signin'>
                                        <SignIn scrollPage={scrollPage} />
                                   </Box>
                                   <Box className='signup'>
                                        <Signup scrollPage={scrollPage} />
                                   </Box>
                              </Box>
                         </Box>
                    </Box>
                    <Spacer />
                    <Box p='2'>
                         <Image src='https://www.bbassets.com/static/staticContent/footersprite.png' alt='' />
                    </Box>
               </Box>
          </>

     );
}