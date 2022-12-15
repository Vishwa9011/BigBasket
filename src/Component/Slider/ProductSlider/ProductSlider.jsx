import { Box, Text, Heading } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import './ProductSlider.css'
import Card from '../../Card/Card'
import { PrevBtn, NextBtn, getData } from './btn'

const ProductSlider = () => {

     const sliderContainer = useRef(null)
     const [data, setData] = useState([])

     // *fetching the data from server
     const FetchData = () => {
          getData().then(res => setData(res));
     }

     useEffect(() => {
          FetchData() //*fetchdata func call
     }, [])

     return (
          <Box w='90%' m='auto'>
               <Heading>Best Sellers</Heading>
               <Box className='productmain' py='4' >
                    <Box as='button' className='sliderBtn sliderPrev' _hover={{ bg: "red.600" }} w='40px' h='40px' onClick={() => PrevBtn(sliderContainer)}>
                         <ArrowBackIcon />
                    </Box>

                    <Box as='div' className='productContainer' id='productContainer' ref={sliderContainer} py='2' w='100%' m='auto' display={'flex'} overflow='hidden' justifyContent={'space-between'} >
                         {
                              data?.data?.map((el, i) => (
                                   <Box key={el.id} w={{ base: '50%', sm: "33%", lg: '25%' }} h='max-content' px='2' display='flex' justifyContent='stretch' alignItems='center'>
                                        <Card id={el.id} image={el.image} price={el.price} title={el.title} defaultImages={el.defaultImages} />
                                   </Box>
                              ))
                         }
                    </Box>

                    <Box as='button' className='sliderBtn sliderNext' _hover={{ bg: "red.600" }} w='40px' h='40px' onClick={() => NextBtn(sliderContainer)}>
                         <ArrowForwardIcon />
                    </Box>
               </Box>
          </Box>
     )
}

export default ProductSlider