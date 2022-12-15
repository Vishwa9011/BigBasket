import React, { useReducer, useState } from 'react';
import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Link, Button, Heading, Text, Image, Spacer } from "@chakra-ui/react";
import Navbar from '../Navbar/Navbar'
import Signup from '../Login/Signup';
import SignIn from '../Login/SignIn';
import { CSSTransition } from 'react-transition-group'
import '../Login/Login.css'
import './styles.css'
import '../Login/flip-transition.css'

export default function Login() {

     const [LoginPage, setLoginPage] = useState('signin')
     const [showFront, setShowFront] = useState(true)

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