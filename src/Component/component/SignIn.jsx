import React from 'react'
import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Link, Button, Heading, Text, Image, Spacer } from "@chakra-ui/react";

const SignIn = ({ setPage }) => {
     console.log('setPage: ', setPage);
     return (
          <Flex h='100%' align={'center'} justify={'center'}>
               <Stack spacing={8} mx={' auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                         <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                         <Text fontSize={'lg'} color={'gray.600'}>
                              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                         </Text>
                    </Stack>
                    <Box rounded={'lg'} boxShadow={'lg'} p={8} className='form'>
                         <Stack spacing={4}>
                              <FormControl id="email">
                                   <FormLabel>Email address</FormLabel>
                                   <Input type="email" />
                              </FormControl>
                              <FormControl id="password">
                                   <FormLabel>Password</FormLabel>
                                   <Input type="password" />
                              </FormControl>
                              <Stack spacing={10}>
                                   <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                                        <Checkbox>Remember me</Checkbox>
                                        <Link color={'blue.400'}>Forgot password?</Link>
                                   </Stack>
                                   <Button bg={'red.500'} _hover={{ bg: "red.600" }} className='BtnClickEffect' color={'white'}
                                        colorScheme='red.600' >
                                        Sign in
                                   </Button>
                              </Stack>
                         </Stack>
                         <Stack mt='3'>
                              <Text as='span'>Doesn't have any account yet?
                                   <Text ml='1' color={'blue.400'} as='span' cursor='pointer' _hover={{ textDecoration: "underline" }} onClick={() => setPage('signup')}>
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