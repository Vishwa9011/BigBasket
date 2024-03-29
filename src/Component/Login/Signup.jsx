import { Flex, Box, FormControl, FormLabel, Input, HStack, Stack, Button, Heading, Text, Link, Spinner, useToast } from '@chakra-ui/react';
import { useGlobal } from '../../Context/GlobalDataProvider/GlobalProvider';
import { useAuth } from '../../Context/AuthContext/AuthContextProvider';
import { useState } from 'react';
import './Login.css'



export default function Signup({ scrollPage }) {

     const { showMsg } = useGlobal();
     const { signup, error } = useAuth()
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");

     const HandleSubmit = () => {
          if (email === "") return showMsg("Please fill the email", "error")
          setEmail("")
          setPassword("")
          setConfirmPassword("")

          if (confirmPassword === password && email !== "") {
               signup({ email, password })
          } else showMsg("Password not Matched", "error")
     }

     return (
          <Flex h='100%' align={'center'} justify={'center'} >
               <Stack spacing={8} mx={'auto'} minW='lg' py={2} px={6} >
                    <Stack align={'center'} >
                         <Heading fontSize={'4xl'} textAlign={'center'}>
                              Sign up
                         </Heading>
                         <Text fontSize={'lg'} color={'gray.600'}>
                              to enjoy all of our cool features ✌️
                         </Text>
                    </Stack>
                    <Box boxShadow='lg' px={8} py='4' w='100%'>
                         <FormControl id="Gemail" pt='5'>
                              <FormLabel>Email address</FormLabel>
                              <Input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                         </FormControl>

                         <FormControl id="Gpassword" pt='5' >
                              <FormLabel>Password</FormLabel>
                              <Input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                         </FormControl>

                         <FormControl id="ConfirmPassword" pt='5'>
                              <FormLabel>Confirm Password</FormLabel>
                              <Input type='password' name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' />
                         </FormControl>

                         <Stack pt={2}>
                              <Button loadingText="Submitting" h='45px' size="lg" bg={'red.500'} className='BtnClickEffect' colorScheme={'red.600'}
                                   color={'white'} _hover={{ bg: 'red.600', }} onClick={HandleSubmit}>
                                   Sign up
                              </Button>
                         </Stack>

                         <Stack pt={3}>
                              <Text align={'center'} as='span'>
                                   Already a user? <Text as='span' cursor={'pointer'} color={'blue.400'} onClick={() => scrollPage(-500, 's')} _hover={{ textDecoration: "underline" }}> Login</Text>
                              </Text>
                         </Stack>
                    </Box>
               </Stack>
          </Flex>
     );
}