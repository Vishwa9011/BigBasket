import { Box, FormControl, FormLabel, Image, Input, Text, Button } from '@chakra-ui/react';
import { FaUserEdit } from 'react-icons/fa';
import AdminRoutes from './AdminRoutes';
import SideBar from './SideBar';
import React from 'react';
import "./admin.css";
import { Link } from 'react-router-dom';

const AdminPanel = () => {
     return (
          <>
               <Box pos='relative'>
                    <Box className='admin-upperPart' w='100%' h='350px' display='flex' alignItems={'center'} justifyContent={'space-around'}>
                         <Link to='/'>
                              <Button title='Goto home' bg='none' display={'flex'} className='goback BtnClickEffect' justifyContent='space-around' p='1' m='0' width={'120px'} border='px'
                                   alignItems='center' pos='absolute' top='4' left='4'>
                                   <Image src='/admin-images/arrow.png' boxSize='5' filter='invert(100%)' />
                                   <Text fontSize={'1.4em'} fontWeight='600' color={'white'} fontFamily=''>Go Back</Text>
                              </Button>
                         </Link>
                         <Box className='flex admin-welcome-text' flexDirection={'column'} >
                              <Text fontSize='3em' color='white' >Welcome in BigBasket</Text>
                              <Text fontSize='3em' color='white' >Admin Pannel</Text>
                         </Box>
                         <Box display={'flex'} flexDirection='column' justifyContent='center' w='fit-content'>
                              <Box width={'100%'} className='flex'>
                                   <Box className='flex admin-image-container' w='180px' h='180px' m='0' p='0' borderRadius={'50%'} pos={'relative'}>
                                        <Box display={'flex'} w='100%' h='100%' bg='yellow' borderRadius={'50%'}>
                                             <Image src='https://i.ibb.co/wK8Md1n/Karan.jpg' borderRadius={'50%'} />
                                        </Box>
                                        <Box className='admin-edit-icon'>
                                             <FormControl>
                                                  <FormLabel className=''><FaUserEdit /></FormLabel>
                                                  <Input type='file' visibility={'hidden'} zIndex='-1' pos='absolute' />
                                             </FormControl>
                                        </Box>
                                   </Box>
                              </Box>
                              <Box className='admin-name'>Vishwa Vivek Yadav</Box>
                         </Box>
                    </Box>
                    <Box className='admin-main' display='flex' minH={'100vh'}>
                         <Box className='admin-sidebar' width='20%' >
                              <SideBar />
                         </Box>
                         <Box className='admin-main-container' w='80%' bg='' >
                              <AdminRoutes />
                         </Box>
                    </Box>
               </Box>
          </>
     )
}

export default AdminPanel