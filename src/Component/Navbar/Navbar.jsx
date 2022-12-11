import { Box, Flex, Input, Image, Text, Stack, HStack, Center } from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs';
import { HiTag, HiShoppingBag } from 'react-icons/hi';
import { BiCategory } from 'react-icons/bi';
import { RxAvatar } from 'react-icons/rx';
import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import Category from './Category';

const Navbar = () => {

     const [showCategory, setShowCategory] = useState(false);


     return (
          <Box borderBottom={'1px'} borderColor='gray.200'>
               <Box as='nav' px='4' py='2' h='80px' w={{ base: "100%", lg: "90%" }} m='auto' display={'flex'} justifyContent='space-between' backdropBlur={'md'} bg='transparent'>
                    <Flex>
                         <Box className='flex' >
                              <Link to='/' className='flex'>
                                   <Image src='/logo.png' alt='' boxSize={{ base: '20px', lg: "40px" }} width={{ base: '30px', lg: "50px" }} />
                                   <Box fontSize={{ base: '1em', lg: "2em" }} fontWeight={'900'} h='100%' className='flex logoText' pt={{ base: '1', lg: "2" }}>
                                        <Text as='span' color={'red.500'} px={{ base: '1px', lg: "2px" }} className='flex' >BIG</Text>
                                        <Text as='span' className='flex' >BASKET</Text>
                                   </Box>
                              </Link>
                         </Box>
                    </Flex>
                    <Stack className='flex'>
                         <Box p='1' border={'1px'} borderColor='gray.300' className='flex' borderRadius={'5px'}>
                              <Input placeholder='Search' w={[null, '200px', '250px', '370px']} px='2' py='1' border={'none'} outline='none' variant='unstyled' />
                              <Box m='2' cursor={'pointer'} fontSize='1.2em'>
                                   <BsSearch />
                              </Box>
                         </Box>
                    </Stack>
                    <HStack color={'black'} display='flex' justifyContent={''} alignContent='center' gap='2' fontSize={{ base: '1em', sm: '1.4em', lg: "1.8em" }}>
                         <Center h='100%'>
                              <Box m='5' cursor={'pointer'} >
                                   <BiCategory onClick={() => setShowCategory(true)} />
                                   <Box pos={'absolute'}>
                                        <Category isopen={showCategory} />
                                   </Box>
                              </Box>
                              <Link to='/cart'>
                                   <Box m='5' cursor={'pointer'} pos='relative'>
                                        <Box pos='absolute' zIndex={'10'} className='flex' backdropBlur={'10'} top='-1' right='-2' display={'flex'} bg='red.500' color='white' borderRadius={'50%'} w='20px' h='20px' fontSize='13px'>
                                             <Center h='100%'>
                                                  0
                                             </Center>
                                        </Box>
                                        <HiShoppingBag color='black' opacity={'.9'} />
                                   </Box>
                              </Link>
                              <Box m='5' cursor={'pointer'}>
                                   <RxAvatar />
                              </Box>
                         </Center>
                    </HStack>
               </Box>
          </Box>
     )
}

export default Navbar