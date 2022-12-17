import { Flex, Box, FormControl, FormLabel, Input, HStack, Stack, Button, Heading, Text, Link, Spinner, useToast } from '@chakra-ui/react';
import { useGlobal } from '../../Context/GlobalDataProvider/GlobalProvider';
import { useAuth } from '../../Context/AuthContext/AuthContextProvider';
import { useEffect, useState } from 'react';
import './Login.css'



export default function Signup({ setPage }) {

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
                    <Box rounded={'lg'} boxShadow='lg' px={8} py='4' w='100%'>
                         <Stack spacing={4}>
                              <FormControl id="email" isRequired>
                                   <FormLabel>Email address</FormLabel>
                                   <Input type="email" name='email' h='40px' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                              </FormControl>

                              <FormControl id="password" isRequired>
                                   <FormLabel>Password</FormLabel>
                                   <Input type='password' name='password' h='40px' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                              </FormControl>

                              <FormControl id="ConfirmPassword" isRequired>
                                   <FormLabel>Confirm Password</FormLabel>
                                   <Input type='password' name='confirmPassword' h='40px' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Password' />
                              </FormControl>

                              <Stack pt={2}>
                                   <Button loadingText="Submitting" h='45px' size="lg" bg={'red.500'} className='BtnClickEffect' colorScheme={'red.600'}
                                        color={'white'} _hover={{ bg: 'red.600', }} onClick={HandleSubmit}>
                                        Sign up
                                   </Button>
                              </Stack>

                              <Stack pt={3}>
                                   <Text align={'center'}>
                                        Already a user? <Link color={'blue.400'} onClick={() => setPage()}> Login</Link>
                                   </Text>
                              </Stack>
                         </Stack>
                    </Box>
               </Stack>
          </Flex>
     );
}