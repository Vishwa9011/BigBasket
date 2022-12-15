import React, { useState } from 'react'
import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Link, Button, Heading, Text, useToast } from "@chakra-ui/react";
import './Login.css'
import { useAuth } from '../../Context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';


const SignIn = ({ setPage }) => {

     const toast = useToast()
     const { login } = useAuth()
     const [loginEmail, setLoginEmail] = useState("");
     const [loginPassword, setLoginPassword] = useState("");
     const [forgotPass, setForgotPass] = useState(false);
     const navigate = useNavigate()



     const showMsg = (msg, msgType) => {
          return toast({
               title: msg,
               position: 'top', variant: 'left-accent',
               status: msgType, isClosable: true,
          })
     }


     const HandleSubmit = () => {

          if (loginEmail === "" || loginPassword === "") return showMsg("Please fill all the feilds", 'error')

          login({ loginEmail, loginPassword })
          setLoginEmail("")
          setLoginPassword("")
          // navigate('/')
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
                                   <FormControl id="loginEmail">
                                        <FormLabel>Email address</FormLabel>
                                        <Input type="email" onChange={(e) => setLoginEmail(e.target.value)} />
                                   </FormControl>
                                   <FormControl id="loginPassword">
                                        <FormLabel>Password</FormLabel>
                                        <Input type="password" onChange={(e) => setLoginPassword(e.target.value)} />
                                   </FormControl>
                                   <Stack spacing={10}>
                                        <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                                             <Checkbox>Remember me</Checkbox>
                                             <Text color={'blue.400'} cursor='pointer' onClick={() => setForgotPass(true)}>Forgot password?</Text>
                                        </Stack>
                                        <Button bg={'red.500'} h='45px' _hover={{ bg: "red.600" }} className='BtnClickEffect' color={'white'}
                                             colorScheme='red.600' onClick={HandleSubmit}>
                                             Sign in
                                        </Button>
                                   </Stack>
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