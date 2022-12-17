import { Box, Button, Image } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import React from 'react'

const Empty = () => {
     return (
          <Box py='10' w='90%' m='auto' className='flex'>
               <Box textAlign='center'>
                    <Image src='https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png' alt='' />
                    <NavLink to='/' state={'/'}>
                         <Button bg='red.500' color='white' className='flex' colorScheme='red.600' _hover={{ background: "red.600" }}>
                              Continue Shopping
                         </Button>
                    </NavLink> 
               </Box>
          </Box>
     )
}

export default Empty