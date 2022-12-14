import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, } from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function Signup({ setPage }) {

     const [showPassword, setShowPassword] = useState(false);

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
                                             <Input type="text" />
                                        </FormControl>
                                   </Box>
                                   <Box>
                                        <FormControl id="lastName">
                                             <FormLabel>Last Name</FormLabel>
                                             <Input type="text" />
                                        </FormControl>
                                   </Box>
                              </HStack>
                              <FormControl id="email" isRequired>
                                   <FormLabel>Email address</FormLabel>
                                   <Input type="email" />
                              </FormControl>
                              <FormControl id="password" isRequired>
                                   <FormLabel>Password</FormLabel>
                                   <InputGroup>
                                        <Input type={showPassword ? 'text' : 'password'} />
                                        <InputRightElement h={'full'}>
                                             <Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                             </Button>
                                        </InputRightElement>
                                   </InputGroup>
                              </FormControl>
                              <FormControl id="file">
                                   <FormLabel w='100%' borderRadius='5px' border='1px' borderColor='gray.200' p='2' cursor={'pointer'}>
                                        Upload Photo 🙎
                                   </FormLabel>
                                   <Input type="file" id='file' display='none' />
                              </FormControl>
                              <Stack spacing={10} pt={2}>
                                   <Button loadingText="Submitting" size="lg" bg={'red.500'} className='BtnClickEffect' colorScheme={'red.600'}
                                        color={'white'} _hover={{ bg: 'red.600', }} >
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
               </Stack >
          </Flex >
     );
}