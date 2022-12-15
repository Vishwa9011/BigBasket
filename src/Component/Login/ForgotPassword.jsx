import React, { useState } from 'react'
import { Box, Stack, Flex, Heading, FormLabel, Button, Checkbox, FormControl, Text, Input, useToast } from '@chakra-ui/react';
import { useAuth } from '../../Context/AuthContextProvider';

const ForgotPassword = ({ setForgotPass }) => {
     const toast = useToast();
     const { resetPassword } = useAuth()
     const [email, setEmail] = useState("");

     const showMsg = (msg, msgType) => {
          return toast({
               title: msg,
               position: 'top', variant: 'left-accent',
               status: msgType, isClosable: true,
          })
     }

     const ResetPassword = () => {
          if (email) resetPassword(email)
          showMsg("Reset Email has been set", 'success')
          setEmail("")
     }

     return (
          <Flex h='100%' align={'center'} justify={'center'} >
               <Stack spacing={8} mx={' auto'} minW={'lg'} py={2} px={6}>
                    <Stack align={'center'}>
                         <Heading fontSize={'3xl'}>Reset Password</Heading>
                    </Stack>
                    <Box rounded={'lg'} boxShadow={'lg'} p={8} className='form'>
                         <Stack spacing={4}>
                              <FormControl id="loginEmail" isRequired>
                                   <FormLabel>Email address</FormLabel>
                                   <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email' />
                              </FormControl>

                              <Stack spacing={10}>
                                   <Button bg={'red.500'} h='45px' _hover={{ bg: "red.600" }} className='BtnClickEffect' color={'white'}
                                        colorScheme='red.600' onClick={ResetPassword}>
                                        Reset Password
                                   </Button>
                              </Stack>
                         </Stack>
                         <Stack mt='3'>
                              <Text as='span'>If you want to go back, Click on
                                   <Text ml='1' color={'blue.400'} as='span' cursor='pointer' _hover={{ textDecoration: "underline" }} onClick={() => setForgotPass(false)}>
                                        back
                                   </Text>
                              </Text>
                         </Stack>
                    </Box>
               </Stack >
          </Flex >
     )
}

export default ForgotPassword