import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Link, Button, Heading, Text, useToast } from "@chakra-ui/react";
import { useGlobal } from '../../Context/GlobalDataProvider/GlobalProvider';
import { useAuth } from '../../Context/AuthContext/AuthContextProvider';
import ForgotPassword from './ForgotPassword';
import React, { useState } from 'react'
import './Login.css'


const SignIn = ({ setPage }) => {

     const { login } = useAuth()
     const { showMsg } = useGlobal();
     const [loginEmail, setLoginEmail] = useState("");
     const [loginPassword, setLoginPassword] = useState("");
     const [forgotPass, setForgotPass] = useState(false);

     // *submit the data
     const HandleSubmit = (e) => {
          e.preventDefault()
          if (loginEmail === "" || loginPassword === "") return showMsg("Please fill all the feilds", 'error')

          // * requesting to server for the login
          login({ loginEmail, loginPassword })
          setLoginEmail("")
          setLoginPassword("")
     }

     return (

          forgotPass ?
               <ForgotPassword setForgotPass={setForgotPass} />
               :
               <Flex h='100%' align={'center'} justify={'center'} >
                    <Stack spacing={8} mx={' auto'} minW={'lg'} py={2} px={6}>
                         <Stack align={'center'}>
                              <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                              <Text fontSize={'lg'} color={'gray.600'}>
                                   to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                              </Text>
                         </Stack>
                         <Box rounded={'lg'} boxShadow={'lg'} p={8} className='form'>
                              <Stack spacing={4}>
                                   <form onSubmit={HandleSubmit}>
                                   <FormControl id="loginEmail">
                                        <FormLabel>Email address</FormLabel>
                                             <Input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                                   </FormControl>
                                   <FormControl id="loginPassword">
                                        <FormLabel>Password</FormLabel>
                                             <Input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                                   </FormControl>
                                   <Stack spacing={10}>
                                        <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                                             <Checkbox>Remember me</Checkbox>
                                             <Text color={'blue.400'} cursor='pointer' onClick={() => setForgotPass(true)}>Forgot password?</Text>
                                        </Stack>
                                             <Input type='submit' value='Sign in' bg={'red.500'} h='45px' _hover={{ bg: "red.600" }} className='BtnClickEffect' color={'white'} colorScheme='red.600' />
                                   </Stack>
                                   </form>
                              </Stack>
                              <Stack mt='3'>
                                   <Text as='span'>Doesn't have any account yet?
                                        <Text ml='1' color={'blue.400'} as='span' cursor='pointer' _hover={{ textDecoration: "underline" }} onClick={() => setPage()}>
                                             Sign up
                                        </Text>
                                   </Text>
                              </Stack>
                         </Box>
                    </Stack>
               </Flex>
     )
}

export default SignIn