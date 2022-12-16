import React, { useState } from 'react'

import { Box, List, Text, ListItem, Image, Button } from '@chakra-ui/react'
import { IoClose } from 'react-icons/io5'
import { useGlobal } from '../../Context/GlobalDataProvider/GlobalProvider'
import { NavLink } from 'react-router-dom'



const categoryLink = [
     { path: '/products/fruits', title: "Fresh Fruits" },
     { path: '/products/vegetables', title: "Fresh Vegetables" },
     { path: '/products/foodgrain_oil_masala', title: "Foodgrain, Oil & Masala" },
     { path: '/products/bakery_cakes_dairy', title: "Bakery, Cakes & Dairy" },
     { path: '/products/snack_foods', title: "Snacks & Branded Foods" },
     { path: '/products/beauty_hygiene', title: "Beauty & Hygiene" },
     { path: '/products/cleaning_household', title: "Cleaning & Household" },
     { path: '/products/kitchen_garden_pets', title: "Kitchen, Garden & Pets" },
     { path: '/products/eggs_meat_fish', title: "Eggs,Meat & Fish" },
]


const Category = ({ isOpen, onOpen, onClose }) => {

     const { } = useGlobal();
     const [activeLink, setActiveLink] = useState()

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

                         {categoryLink.map((link, i) => (
                              <ListItem key={i}>
                                   <NavLink to={link.path} className={({ isActive }) => (isActive ? 'activeLink' : "")}>
                                        <Text>{link.title}</Text>
                                   </NavLink>
                              </ListItem>
                         ))}
                    </List>
               </Box>
               <Box className='overlay' bg='#aaa' zIndex={'98'} opacity='.8' cursor='pointer'
                    onClick={onClose}>
               </Box>
          </>
     )
}

export default Category