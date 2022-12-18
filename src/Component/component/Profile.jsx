import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Center, Box, Text, Image, } from '@chakra-ui/react';
import { useGlobal } from '../../Context/GlobalDataProvider/GlobalProvider';
import { useAuth } from '../../Context/AuthContext/AuthContextProvider';
import { FaUserEdit } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import Loader from './Loader';
import axios from 'axios';
import './Profile.css'
import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase-config';
import { useNavigate } from 'react-router-dom';
export default function Profile({ ShowProfilePage }) {

     const navigate = useNavigate();
     const { showMsg } = useGlobal();
     const { currentUser, currentUserDetail } = useAuth();
     const [loading, setLoading] = useState(false);
     const [profileData, setProfileData] = useState({ ...currentUserDetail });

     // * this will gonna update username and mobile number;
     const HandleChange = e => {
          switch (e.target.name) {
               case 'username':
                    return setProfileData(prev => ({ ...prev, [e.target.name]: e.target.value }));
               case 'phone':
                    if (isNaN(e.target.value)) return;
                    return setProfileData(prev => ({ ...prev, [e.target.name]: e.target.value }))
               default:
                    break;
          }
     }

     // * to get the link of image and set in state
     const HandleChangePic = (e) => {
          const apikey = `30d5e74496023c98433d2b16d595ca2c`
          const image = e.target.files[0]; //* taking the image value from input
          const form = new FormData(); //* creating the form to store the value of image
          form.append('image', image) //* appending the value into the form;
          setLoading(true);
          axios.post(`https://api.imgbb.com/1/upload?key=${apikey}`, form)
               .then(res => {
                    if (res.status === 200) setProfileData(prev => ({ ...prev, image: res?.data?.data?.display_url }))
                    showMsg("Image has been uploaded successfully")
                    setLoading(false);
               })
               .catch(err => { console.log(err); setLoading(false) })
     }

     // *to remove the icon
     const HandleRemoveIcon = () => {
          setProfileData(prev => ({ ...prev, image: "" }));
     }

     // * to save the changes in the server
     const SaveChanges = () => {
          setLoading(true)
          const usersRef = doc(db, 'users', currentUser.uid);
          setDoc(usersRef, profileData).then(() => {
               showMsg("Profile has been updated", 'success');
               setLoading(false);
               ShowProfilePage()
          }).catch(err => {
               showMsg("Try again", 'error')
          })
     }


     return (
          <>  
               {loading && <Loader />}
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
                                             <Image src={profileData.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU'} />
                                        </Box>
                                        <Box id='upload-image'>
                                             <Box className='flex'>
                                                  <FormControl id="image" _hover={{ background: 'red.600', color: 'white' }} className='image' m='0' p='0' bg='blackAlpha.400'>
                                                       <FormLabel className='upload-label BtnClickEffect'><FaUserEdit /></FormLabel>
                                                       <Input type='file' name='image' visibility='hidden' pos='absolute' zIndex={-1} onChange={HandleChangePic} />
                                                  </FormControl>
                                                  <Button ml='2' onClick={HandleRemoveIcon} className='remove-icon BtnClickEffect' color='black' colorScheme='red.600' bg='blackAlpha.400' _hover={{ background: 'red.600', color: 'white', }} h='20px' maxW='20px'>
                                                       <IoClose />
                                                  </Button>
                                             </Box>
                                        </Box>
                                   </Box>
                              </Box>
                              <FormControl id="userName" >
                                   <FormLabel>User name</FormLabel>
                                   <Input placeholder="UserName" name='username' value={profileData.username} _placeholder={{ color: 'gray.500' }} type="text" onChange={HandleChange} />
                              </FormControl>
                              <FormControl >
                                   <FormLabel>Email address</FormLabel>
                                   <Text textAlign='left' color='gray.600' cursor={'not-allowed'} p='2' borderRadius='5px' pl='4' border='1px' borderColor='gray.200'>{currentUser?.email}</Text>
                              </FormControl>
                              <FormControl id="Phone" >
                                   <FormLabel>Phone Number</FormLabel>
                                   <Input placeholder="+1(123) 456-7890" name='phone' value={profileData.phone} onChange={HandleChange} _placeholder={{ color: 'gray.500' }} />
                              </FormControl>
                              <Box mt='5' display='flex' gap='10'>
                                   <Button bg={'teal.500'} className='BtnClickEffect' color={'white'} w="full" _hover={{ bg: 'red.600', }} onClick={ShowProfilePage}>
                                        Cancel
                                   </Button>
                                   <Button bg={'red.500'} className='BtnClickEffect' color={'white'} w="full" _hover={{ bg: 'red.600', }} onClick={SaveChanges}>
                                        Save Changes
                                   </Button>
                              </Box>
                         </Stack>
                         <Box pos='absolute' right='-17px' top='26px' onClick={ShowProfilePage}>
                              <Button borderRadius='50%' fontSize='1.5em' className='BtnClickEffect' colorScheme={'red.600'} color='white' p='0' bg='red.500' _hover={{ background: 'red.600' }} m='0'><IoClose /> </Button>
                         </Box>
                    </Box>
               </Box >
          </>
     );
}