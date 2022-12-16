import { Box, Flex, Input, Image, Text, Stack, HStack, Center, Grid, useDisclosure, List, ListItem } from '@chakra-ui/react'
import { useAuth } from '../../Context/AuthContext/AuthContextProvider';
import { NavLink } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import React, { useState } from 'react'
import Category from './Category';
import './Navbar.css'
import { useGlobal } from '../../Context/GlobalDataProvider/GlobalProvider';


const Navbar = () => {
     const { cartItemCount } = useGlobal()
     const { logout, currentUser, isAdmin } = useAuth()
     const { isOpen, onOpen, onClose } = useDisclosure()

     return (
          <>
               <Box pos='sticky' top='0' left='0' style={{ backdropFilter: "blur(14px)" }} bg='whiteAlpha.800' zIndex='999'>
                    <Box borderBottom={'1px'} borderColor='gray.200' pos='relative'>
                         <Grid as='nav' templateColumns={'repeat(3,1fr)'} px='4' py='2' h='80px' w={{ base: "100%", lg: "95%" }} m='auto' bg='transparent' alignItems='center'>
                              <Flex justifyContent={'flex-start'}>
                                   <Box className='flex' >
                                        <NavLink to='/' className='flex' state='/'>
                                             <Image src='/logo.png' alt='' boxSize={{ base: '30px', lg: "35px" }} width={{ base: '40px', lg: "45px" }} />
                                             <Box fontSize={{ base: '1.7em', lg: "1.8em" }} fontWeight={'900'} h='100%' className='flex logoText' pt={{ base: '1', lg: "2" }}>
                                                  <Text as='span' color={'red.500'} px={{ base: '1px', lg: "2px" }} className='flex' >BIG</Text>
                                                  <Text as='span' className='flex' >BASKET</Text>
                                             </Box>
                                        </NavLink>
                                   </Box>
                              </Flex>

                              <Stack className='flex' >
                                   <Box p='1' border={'1px'} borderColor='gray.300' className='flex' borderRadius={'5px'}>
                                        <Input placeholder='Search' w={[null, '200px', '250px', '370px']} px='2' py='1' border={'none'} outline='none' variant='unstyled' />
                                        <Box m='2' cursor={'pointer'} fontSize='1.2em' className='BtnClickEffect'>
                                             <BsSearch />
                                        </Box>
                                   </Box>
                              </Stack>

                              <HStack color={'black'} display='flex' justifyContent={'flex-end'} alignContent='center' gap='2' fontSize={{ base: '1em', sm: '1.4em', lg: "1.8em" }}>
                                   <Center h='100%'>
                                        <Box mx='5' cursor={'pointer'}>
                                             <Box onClick={onOpen}>
                                                  <Image src='/categories.png' alt='' boxSize='27px' className='BtnClickEffect' />
                                             </Box>
                                        </Box>

                                        <NavLink to='/cart' state="cart">
                                             <Box mx='5' cursor={'pointer'} pos='relative' p='0' className='BtnClickEffect' >
                                                  <Box pos='absolute' zIndex={'10'} className='flex' backdropBlur={'10'} top='-1' right='-2' display={'flex'} bg='red.500' color='white' borderRadius={'50%'} w='20px' h='20px' fontSize='13px'>
                                                       <Center h='100%' fontSize={'.8em'}>{cartItemCount}</Center>
                                                  </Box>
                                                  <Image src='/bag1.png' alt='' boxSize='27px' />
                                             </Box>
                                        </NavLink>
                                        <Box p='5' cursor={'pointer'} pos='relative' id='loginMenu'>

                                             <NavLink to='/login' state='login'>
                                                  <Image src='/user.png' alt='' boxSize='27px' className=' BtnClickEffect' borderRadius='50%' />
                                             </NavLink>

                                             <Box className='loginMenuList'>
                                                  {currentUser?.email && <List pos='absolute' w='max-content' top='100%' right='0px' whiteSpace='nowrap'
                                                       border='1px' borderRadius='5px' borderColor='gray.200' bg='white' >

                                                       {isAdmin && <ListItem display='flex' p='2' px='4' borderBottom='1px' borderColor='gray.100' _hover={{ background: "gray.100", color: "black" }} >
                                                            <Image src='/admin2.png' alt='' boxSize='25px' />
                                                            <Text as='span' fontSize='1rem' ml='3'>Admin Pannel</Text>
                                                       </ListItem>}
                                                       <ListItem display='flex' p='2' px='4' borderBottom='1px' borderColor='gray.100' _hover={{ background: "gray.100", color: "black" }}>
                                                            <Image src='/user1.png' alt='' boxSize='25px' />
                                                            <Text as='span' fontSize='1rem' ml='3'>Profile</Text>
                                                       </ListItem>
                                                       <ListItem display='flex' p='2' px='4' borderBottom='1px' borderColor='gray.100' _hover={{ background: "gray.100", color: "black" }}>
                                                            <Image src="/myorder1.png" alt='' boxSize='25px' />
                                                            <Text as='span' fontSize='1rem' ml='3'>My Orders</Text>
                                                       </ListItem>
                                                       <ListItem display='flex' p='2' px='4' borderBottom='1px' borderColor='gray.100'
                                                            _hover={{ background: "gray.100", color: "black" }} onClick={logout}>
                                                            <Image src='/logout1.png' alt='' boxSize='25px' />
                                                            <Text as='span' fontSize='1rem' ml='3'>Signout</Text>
                                                       </ListItem>

                                                  </List>}
                                             </Box>
                                        </Box>
                                   </Center>
                              </HStack>
                         </Grid>
                    </Box>
               </Box>
               <Category isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
          </>
     )
}

export default Navbar