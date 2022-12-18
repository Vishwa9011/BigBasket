import { Box, FormControl, FormLabel, Image, Input, Text } from '@chakra-ui/react';
import SideBar from './SideBar';
import { FaUserEdit } from 'react-icons/fa';
import React from 'react';
import "./admin.css";
import AdminRoutes from './AdminRoutes';
import AdminDashboard from './AdminDashboard';

const AdminPanel = () => {
     return (
          <>
               <Box>
                    <Box className='admin-upperPart' w='100%' h='350px' display='flex' alignItems={'center'} justifyContent={'space-around'}>
                         <Box className='flex admin-welcome-text'>
                              <Text fontSize='3em' color='white' >Welcome in BigBasket</Text>
                         </Box>
                         <Box display={'flex'} flexDirection='column' justifyContent='center' w='fit-content'>
                              <Box width={'100%'} className='flex'>
                                   <Box className='flex admin-image-container' w='180px' h='180px' m='0' p='0' borderRadius={'50%'} pos={'relative'}>
                                        <Box display={'flex'} w='100%' h='100%' bg='yellow' borderRadius={'50%'}>
                                             <Image src='https://www.demosoft.co.in/dist/img/admin-logo.png' borderRadius={'50%'} />
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
                    <Box className='admin-main' display='flex'>
                         <Box className='admin-sidebar' width='20%' >
                              <SideBar />
                         </Box>
                         <Box className='admin-main-container' w='80%' bg='' h='500px'>
                              <AdminRoutes />
                         </Box>
                    </Box>
               </Box>
          </>
     )
}

export default AdminPanel