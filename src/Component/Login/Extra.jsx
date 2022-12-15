import { Flex, Box, FormControl, FormLabel, Input, HStack, Stack, Button, Heading, Text, Link, Spinner, useToast } from '@chakra-ui/react';
import { useContext, useEffect, useReducer, useState } from 'react';
import { BsCheck2Circle } from 'react-icons/bs'
import { reducer, ActionType } from './reducer';
import { Validate } from './Validate'
import axios from 'axios';
import './Login.css'


// * Initial state
const initialState = { id: "", firstName: "", lastName: "", image: "", email: "", password: "", phone: "" }

export default function Extra({ setPage }) {
     const [state, dispatch] = useReducer(reducer, initialState)
     const [loading, setLoading] = useState(false);
     const toast = useToast()




     // todo on any change in input value have to be update in reducer
     const HandleChange = (e) => {
          dispatch({ type: ActionType[e.target.name], payload: e.target.value })
     }

     // todo mobile number only allow number
     const HandleChangeMob = (e) => {
          const val = e.target.value;
          if (isNaN(val)) return; //* if value is not number then it will return from here
          dispatch({ type: ActionType[e.target.name], payload: e.target.value })
     }

     const HandleChangePic = (e) => {
          const apikey = `30d5e74496023c98433d2b16d595ca2c`
          const image = e.target.files[0]; //* taking the image value from input
          const form = new FormData(); //* creating the form to store the value of image
          form.append('image', image) //* appending the value into the form;
          setLoading(true);
          axios.post(`https://api.imgbb.com/1/upload?key=${apikey}`, form)
               .then(res => {
                    if (res.status === 200) dispatch({ type: ActionType[e.target.name], payload: res.data.data.display_url })
                    setLoading(false);
               })
               .catch(err => { console.log(err); setLoading(false) })
     }


     const HandleSubmit = (e) => {
          if (Validate(state)) {
               // postData(state)
               // toast({ position: 'top-right', status: 'success', description: 'Successfully Registered!', duration: 9000, isClosable: true })
          }
     }
     return (
          <Flex h='100%' align={'center'} justify={'center'}>
               <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                         <Heading fontSize={'4xl'} textAlign={'center'}>
                              Sign up
                         </Heading>
                         <Text fontSize={'lg'} color={'gray.600'}>
                              to enjoy all of our cool features ✌️
                         </Text>
                    </Stack>
                    <Box rounded={'lg'} boxShadow={'lg'} p={8}>
                         <Stack spacing={4}>
                              <HStack>
                                   <Box>
                                        <FormControl id="firstName" isRequired>
                                             <FormLabel>First Name</FormLabel>
                                             <Input type="text" name='firstName' placeholder='First Name' value={state.firstName} onChange={HandleChange} />
                                        </FormControl>
                                   </Box>
                                   <Box>
                                        <FormControl id="lastName">
                                             <FormLabel>Last Name</FormLabel>
                                             <Input type="text" name='lastName' value={state.lastName} onChange={HandleChange} placeholder='last Name' />
                                        </FormControl>
                                   </Box>
                              </HStack>

                              <FormControl id="email" isRequired>
                                   <FormLabel>Email address</FormLabel>
                                   <Input type="email" name='email' value={state.email} onChange={HandleChange} placeholder='Email' />
                              </FormControl>

                              <FormControl id="password" isRequired>
                                   <FormLabel>Password</FormLabel>
                                   <Input type='password' name='password' value={state.password} onChange={HandleChange} placeholder='Password' />
                              </FormControl>

                              <FormControl id="phone" isRequired>
                                   <FormLabel>Mobile Number</FormLabel>
                                   <Input type="text" name='phone' value={state.phone} onChange={HandleChangeMob} maxLength='10' placeholder='Phone Number' />
                              </FormControl>

                              <FormControl id="file">
                                   <FormLabel w='100%' borderRadius='5px' border='1px' borderColor='gray.200' p='2' cursor={'pointer'} pos='relative'>
                                        Upload Photo 🙎
                                   </FormLabel>
                                   <Input type="file" id='file' name='image' display='none' onChange={HandleChangePic} />
                                   <Box className='spinner'>
                                        {loading && <Spinner size='sm' color='red.500' />}
                                        {state.image && <Text color='green' fontSize='1.1em'><BsCheck2Circle /></Text>}
                                   </Box>
                              </FormControl>
                              <Stack spacing={10} pt={2}>
                                   <Button loadingText="Submitting" isDisabled={loading} size="lg" bg={'red.500'} className='BtnClickEffect' colorScheme={'red.600'}
                                        color={'white'} _hover={{ bg: 'red.600', }} onClick={HandleSubmit}>
                                        Sign up
                                   </Button>
                              </Stack>
                              <Stack pt={6}>
                                   <Text align={'center'}>
                                        Already a user? <Link color={'blue.400'} onClick={() => setPage('signin')}> Login</Link>
                                   </Text>
                              </Stack>
                         </Stack>
                    </Box>
               </Stack>
          </Flex>
     );
}