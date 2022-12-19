import { Grid, GridItem, Image, Box, Heading } from '@chakra-ui/react'
import React from 'react'


const GridCardMaker = ({ heading, data }) => {
     return (
          <>
               <Box>
                    <Box w={['98%', '98%', '90%']} m='auto' py={[2, 2, 3, '5']} mb={[3, 3, 5, '10']}>
                         <Heading as={'p'} my={[2, 2, 3, 5]} fontSize={['1.3em', '1.3em', "1.8em"]}>{heading}</Heading>
                         <Grid templateRows='repeat(2, 1fr)' templateColumns='repeat(4, 1fr)' gap={[1, 1, 5, 10]}>
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