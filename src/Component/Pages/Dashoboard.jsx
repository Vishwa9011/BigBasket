import { Box, Grid, Heading, Image, ScaleFade } from '@chakra-ui/react';
import React from 'react'
import Buttons from '../Buttons';
import { offer } from '../exportData';
import Slider from '../Slider/Slider';
import './pages.css'

const Dashoboard = () => {
     return (
          <>
               {/* Slider */}
               <Slider />

               {/* buttons with Link */}
               <Buttons />

               {/* OFfers */}

               <Box w='90%' m='auto'>

                    <Heading textAlign={'center'}>Top Offers</Heading>

                    <Grid templateColumns={'repeat(4,1fr)'} m='auto'>
                         {offer?.map((el, i) =>
                              <Box key={i} m='5' cursor={'pointer'} overflow='hidden' className='offerCard'>
                                   <Image src={el} alt="" className='scaleOfferImage' />
                              </Box>
                         )}
                    </Grid>

                    {/* fruist and vegatables */}
                    <Box>

                    </Box>

               </Box>



          </>
     )
}

export default Dashoboard