import { Grid, GridItem, Image, Box, Heading } from '@chakra-ui/react'
import React from 'react'


const GridCardMaker = ({ heading, data }) => {
     return (
          <>
               <Box>
                    <Box w='90%' m='auto' py='5' mb='10'>
                         <Heading my='5'>{heading}</Heading>
                         <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(4, 1fr)' gap={10}>
                              <GridItem rowSpan={2} colSpan={2} bg='tomato' className='offerCard'>
                                   <Image src={data[0]} className='scaleOfferImage' />
                              </GridItem>
                              <GridItem colSpan={1} bg='papayawhip' className='offerCard'>
                                   <Image src={data[1]} className='scaleOfferImage' />
                              </GridItem>
                              <GridItem colSpan={1} bg='papayawhip' className='offerCard'>
                                   <Image src={data[2]} className='scaleOfferImage' />
                              </GridItem>
                              <GridItem colSpan={1} bg='tomato' className='offerCard'>
                                   <Image src={data[3]} className='scaleOfferImage' />
                              </GridItem>
                              <GridItem colSpan={1} bg='tomato' className='offerCard'>
                                   <Image src={data[4]} className='scaleOfferImage' />
                              </GridItem>
                         </Grid>
                    </Box>
               </Box>
          </>
     )
}

export default GridCardMaker;