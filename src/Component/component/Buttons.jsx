import React from 'react'
import { Box, Button, ButtonGroup, calc, Grid, Image } from '@chakra-ui/react';


const buttonImages = [
     'https://www.bigbasket.com/media/uploads/banner_images/hp_topstrip_m_251122_01.png',
     'https://www.bigbasket.com/media/uploads/banner_images/hp_topstrip_m_251122_02.png',
     "https://www.bigbasket.com/media/uploads/banner_images/hp_topstrip_m_251122_03.png",
     "https://www.bigbasket.com/media/uploads/banner_images/hp_topstrip_m_251122_04.png",
     "https://www.bigbasket.com/media/uploads/banner_images/hp_topstrip_m_251122_05.png",
     "https://www.bigbasket.com/media/uploads/banner_images/hp_topstrip_m_251122_06.png"
]


const Buttons = () => {

     return (
          <Grid templateColumns={{ base: 'repeat(6,1fr)' }} py='5' w={{ base: "100%", lg: '90%' }} m='auto'>
               {buttonImages?.map((el, i) => (
                    <Box as='div' key={el} className='flex' cursor={'pointer'} m={{ base: '2', md: "3" }}>
                         <Image src={el} alt='' w='100%' />
                    </Box>
               ))}
          </Grid>
     )

}

export default Buttons