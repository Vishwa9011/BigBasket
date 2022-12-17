import { Box, Image, Spinner } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import './loader.css'
const Loader = () => {


     return (
          <Box pos='fixed' w='100vw' h='100vh' display={'flex'} justifyContent='center' alignItems='center' zIndex={'1000'}>
               <Box className='overlayLoading' bg='blackAlpha.400'>
                    <Spinner
                         thickness='4px'
                         speed='0.65s'
                         emptyColor='gray.200'
                         color='red.500'
                         size='xl'
                    />
               </Box>
          </Box>
     )
}

export default Loader