import React from 'react'

import { Box, List, Text, ListItem, Image, Button } from '@chakra-ui/react'
import { IoClose } from 'react-icons/io5'


const Category = ({ isOpen, onOpen, onClose }) => {

     if (isOpen) {
          document.querySelector('body').style.overflow = 'hidden'
     } else {
          document.querySelector('body').style.overflow = 'auto'
     }

     return (
          isOpen && <>
               <Box pos={'absolute'} w='max-content' className='categoryContainer' zIndex={'99'} left='0' top='80px' bg='white'>
                    <Box display='flex' p='2' pl='6' justifyContent={'space-between'} alignItems='center'
                         fontSize={'2em'} borderBottom='2px' borderTop={'1px'} borderColor='gray.200' >

                         <Box>
                              <Text fontWeight='600'>Category</Text>
                         </Box>

                         <Box _hover={{ background: "red.500", color: "white" }} className='BtnClickEffect flex'
                              w='40px' h='40px' borderRadius='10px' cursor={'pointer'}
                              onClick={onClose}>
                              <IoClose />
                         </Box>
                    </Box>
                    <List className='sideCategory' w='300px' h='100%' fontSize={'1.3em'}>
                         <ListItem>
                              <Text>Fruits & Vegetables</Text>
                         </ListItem>
                         <ListItem>
                              <Text>Foodgrain, Oil & Masala</Text>
                         </ListItem>
                         <ListItem>
                              <Text>Bakery, Cakes & Dairy</Text>
                         </ListItem>
                         <ListItem>
                              <Text>Snacks & Branded Foods</Text>
                         </ListItem>
                         <ListItem>
                              <Text>Beauty & Hygiene</Text>
                         </ListItem>
                         <ListItem>
                              <Text>Cleaning & Household</Text>
                         </ListItem>
                         <ListItem>
                              <Text>Kitchen, Garden & Pets</Text>
                         </ListItem>
                         <ListItem>
                              <Text>Eggs,Meat & Fish</Text>
                         </ListItem>
                    </List>
               </Box>
               <Box pos='absolute' w='100%' h='100vh' bg='#aaa' zIndex={'98'} opacity='.8'
                    backdropBlur={'9px'} cursor='pointer'
                    onClick={onClose}>
               </Box>
          </>
     )
}

export default Category