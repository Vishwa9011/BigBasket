import { Box, Flex, Input, Image, Text, Stack, HStack, Center, Grid, useDisclosure, List, ListItem } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs';
import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import Category from './Category';

const loginMenu = [
     { img: "/user1.png", title: "My Account" },
     { img: "/myOrder.png", title: "My Order" },
     { img: "/logout.png", title: "Sign out" }
]

const Navbar = () => {

     const { isOpen, onOpen, onClose } = useDisclosure()
     const isAdmin = true;
     const login = true;

     return (
          <>
               <Box pos='sticky' top='0' left='0' style={{ backdropFilter: "blur(14px)" }} bg='whiteAlpha.800' zIndex='999'>
                    <Box borderBottom={'1px'} borderColor='gray.200' pos='relative'>
                         <Grid as='nav' templateColumns={'repeat(3,1fr)'} px='4' py='2' h='80px' w={{ base: "100%", lg: "95%" }} m='auto' bg='transparent' alignItems='center'>
                              <Flex justifyContent={'flex-start'}>
                                   <Box className='flex' >
                                        <Link to='/' className='flex'>
                                             <Image src='/logo.png' alt='' boxSize={{ base: '30px', lg: "35px" }} width={{ base: '40px', lg: "45px" }} />
                                             <Box fontSize={{ base: '1.7em', lg: "1.8em" }} fontWeight={'900'} h='100%' className='flex logoText' pt={{ base: '1', lg: "2" }}>
                                                  <Text as='span' color={'red.500'} px={{ base: '1px', lg: "2px" }} className='flex' >BIG</Text>
                                                  <Text as='span' className='flex' >BASKET</Text>
                                             </Box>
                                        </Link>
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

                                        <Link to='/cart'>
                                             <Box mx='5' cursor={'pointer'} pos='relative' p='0' className='BtnClickEffect' >
                                                  <Box pos='absolute' zIndex={'10'} className='flex' backdropBlur={'10'} top='-1' right='-2' display={'flex'} bg='red.500' color='white' borderRadius={'50%'} w='20px' h='20px' fontSize='13px'>
                                                       <Center h='100%' fontSize={'.8em'}>0</Center>
                                                  </Box>
                                                  <Image src='/bag1.png' alt='' boxSize='27px' />
                                             </Box>
                                        </Link>
                                        <Box p='5' cursor={'pointer'} pos='relative' id='loginMenu'>

                                             <Link to='/login'>
                                                  <Image src='/user.png' alt='' boxSize='27px' className=' BtnClickEffect' borderRadius='50%' />
                                             </Link>

                                             <Box className='loginMenuList'>
                                                  {login && <List pos='absolute' w='max-content' top='100%' right='0px' whiteSpace='nowrap'
                                                       border='1px' borderRadius='5px' borderColor='gray.200' bg='white' >

                                                       {isAdmin && <ListItem display='flex' p='2' px='4' borderBottom='1px' borderColor='gray.100' _hover={{ background: "gray.100", color: "black" }} >
                                                            <Image src='/admin.png' alt='' boxSize='25px' />
                                                            <Text as='span' fontSize='1rem' ml='3'>Admin Pannel</Text>
                                                       </ListItem>}

                                                       {loginMenu?.map((el, i) => (
                                                            <ListItem key={i} display='flex' p='2' px='4' borderBottom='1px' borderColor='gray.100' _hover={{ background: "gray.100", color: "black" }}>
                                                                 <Image src={el.img} alt='' boxSize='25px' />
                                                                 <Text as='span' fontSize='1rem' ml='3'>{el.title}</Text>
                                                            </ListItem>
                                                       ))}
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