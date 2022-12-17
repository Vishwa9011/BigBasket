import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Center, Box, Image, } from '@chakra-ui/react';
import { useAuth } from '../../Context/AuthContext/AuthContextProvider';
import { FaUserEdit } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import './Profile.css'
export default function Profile({ ShowProfilePage }) {

     const { currentUser } = useAuth()


     return (
          <>
               <Box pos='absolute' w='100%' h='100vh' zIndex='100' className='flex' >
                    <Box onClick={ShowProfilePage} w='100%' h='100%' pos='absolute' bg='blackAlpha.400' cursor='pointer'></Box>
                    <Box className='profileContainer' w='450px' display='flex' align={'center'} justify={'center'} pos='relative' zIndex='101' >
                         <Stack spacing={4} w={'full'} rounded={'xl'} boxShadow={'lg'} p={6} my={12} bg='white'>
                              <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                                   Profile
                              </Heading>
                              <Box h='100%' p='1'>
                                   <Box pos='relative' p='1'>
                                        <Box className='userImage' w='80px' h='80px' borderRadius='50%' overflow={'hidden'} >
                                             <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU' />
                                        </Box>
                                        <Box id='upload-image'>
                                             <Box className='flex'>
                                                  <FormControl id="image" _hover={{ background: 'red.600', color: 'white' }} className='image' m='0' p='0' bg='blackAlpha.400'>
                                                       <FormLabel className='upload-label'><FaUserEdit /></FormLabel>
                                                       <Input type='file' visibility='hidden' pos='absolute' zIndex={-1} />
                                                  </FormControl>
                                                  <Button ml='2' className='remove-icon' color='black' colorScheme='red.600' bg='blackAlpha.400' _hover={{ background: 'red.600', color: 'white', }} h='20px' maxW='20px'><IoClose /></Button>
                                             </Box>
                                        </Box>
                                   </Box>
                              </Box>
                              <FormControl id="userName" >
                                   <FormLabel>User name</FormLabel>
                                   <Input placeholder="UserName" _placeholder={{ color: 'gray.500' }} type="text" />
                              </FormControl>
                              <FormControl id="Phone" >
                                   <FormLabel>Email address</FormLabel>
                                   <Input disabled placeholder="bigbasket@example.com" value={currentUser?.email} _placeholder={{ color: 'gray.500' }} type="email" />
                              </FormControl>
                              <FormControl id="Phone" >
                                   <FormLabel>Phone Number</FormLabel>
                                   <Input placeholder="+1(123) 456-7890" _placeholder={{ color: 'gray.500' }} type="email" />
                              </FormControl>
                              <Box mt='5'>
                                   <Button bg={'red.500'} color={'white'} w="full" _hover={{ bg: 'red.600', }}>
                                        Save Changes
                                   </Button>
                              </Box>
                         </Stack>
                         <Box pos='absolute' right='-17px' top='26px' onClick={ShowProfilePage}>
                              <Button borderRadius='50%' fontSize='1.5em' color='white' p='0' bg='red.500' _hover={{ background: 'red.600' }} m='0'><IoClose /> </Button>
                         </Box>
                    </Box>
               </Box >
          </>
     );
}