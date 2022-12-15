import { Box, Heading, Grid, Image } from '@chakra-ui/react';
import React from 'react'

const CardMaker = ({ heading, data }) => {
     return (
          <>
               <Box>
                    <Box w='90%' mx='auto' mb='10'>
                         <Heading my='5'>{heading}</Heading>
                         <Box display='flex' m='auto' gap='5'>
                              {data?.map((el, i) =>
                                   <Box key={i} cursor={'pointer'} className='offerCard'>
                                        <Image src={el} alt="" className='scaleOfferImage' />
                                   </Box>
                              )}
                         </Box>
                    </Box>
               </Box>
          </>
     )
}

export default CardMaker;