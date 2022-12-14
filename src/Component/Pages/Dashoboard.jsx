import { Box, Grid, Heading, Image, ScaleFade } from '@chakra-ui/react';
import React from 'react'
import Buttons from '../component/Buttons';
import { offer } from '../component/exportData';
import Navbar from '../Navbar/Navbar';
import Slider from '../Slider/MainSlider/Slider';
import ProductSlider from '../Slider/ProductSlider/ProductSlider';
import Footer from '../Footer/Footer'
import BankOfferCard from '../component/BankOfferCard';
const Dashoboard = () => {
     return (
          <>
               {/* navbar */}
               <Navbar />

               {/* Slider */}
               <Slider />

               {/* buttons with Link */}
               <Buttons />

               {/*Bank OFfers */}
               <BankOfferCard />

               {/* productSlider */}
               <ProductSlider />

               {/* Offer */}
               <Box>
                    <Box w='90%' mx='auto' mb='10'>
                         <Heading m='5'>Top Offers</Heading>

                         <Grid templateColumns={'repeat(4,1fr)'} m='auto' gap='5'>
                         {offer?.map((el, i) =>
                              <Box key={i} cursor={'pointer'} className='offerCard'>
                                   <Image src={el} alt="" className='scaleOfferImage' />
                              </Box>
                         )}
                         </Grid>
                    </Box>
               </Box>

               {/* fruits and vegetables card */}
               <Box>

               </Box>

               {/* Footer */}
               <Footer />
          </>
     )
}

export default Dashoboard