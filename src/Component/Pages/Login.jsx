import React, { useState } from 'react';
import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Link, Button, Heading, Text, Image, Spacer } from "@chakra-ui/react";
import Navbar from '../Navbar/Navbar'
import './styles.css'
import Signup from '../component/Signup';
import SignIn from '../component/SignIn';


export default function Login() {

     const [LoginPage, setLoginPage] = useState('signin')
     console.log('LoginPage: ', LoginPage);
     // const [signUpPage, setSignUpPage] = useState(true)

     const setPage = (pageType) => {
          setLoginPage(pageType)
     }

     return (
          <>
               <Navbar />
               <Box className='loginContainer' zIndex='99' backdropBlur='10px'>
                    <Box h='90%'>
                         {LoginPage === 'signin' ? <SignIn setPage={setPage} /> : <Signup setPage={setPage} />}
                    </Box>
                    <Spacer />
                    <Box p='2'>
                         <Image src='https://www.bbassets.com/static/staticContent/footersprite.png' alt='' />
                    </Box>
               </Box>
          </>

     );
}