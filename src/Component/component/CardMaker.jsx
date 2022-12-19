import { Box, Heading, Grid, Image } from '@chakra-ui/react';
import React from 'react'

const CardMaker = ({ heading, data }) => {
     return (
          <>
               <Box>
                    <Box w={['98%', '98%', '90%']} mx='auto' mb={[3, 3, 5, '10']}>
                         <Heading as={'p'} my={[2, 2, 3, 5]} fontSize={['1.3em', '1.3em', "1.8em"]}>{heading}</Heading>
                         <Box display='flex' m='auto' gap={[1, 1, 2, '5']}>
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