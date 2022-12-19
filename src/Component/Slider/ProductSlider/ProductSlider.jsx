import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { collection, getDocs, addDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { Box, Text, Heading } from '@chakra-ui/react'
import { db } from '../../Firebase/firebase-config';
import { PrevBtn, NextBtn, getData } from './btn'
import Card from '../../Card/Card'
import './ProductSlider.css'


const ProductSlider = ({ setLoading }) => {
     const usersCollectionRef = collection(db, 'data/fruits/fruitsData')
     const sliderContainer = useRef(null)
     const [data, setData] = useState([])
     console.log('dataproduct: ', data);

     useEffect(() => {
          setLoading(true)
          const getData = async () => {
               const res = await getDocs(usersCollectionRef)
               setData(res.docs.map(doc => ({ ...doc.data(), id: doc.id }))) //*setting the data
               setLoading(false);
          }
          getData()
     }, [])

     return (
          <Box w={['98%', '98%', '90%']} m='auto'>
               <Heading as={'p'} my={[2, 2, 3, 5]} fontSize={['1.3em', '1.3em', "1.8em"]}>Best Sellers</Heading>
               <Box className='productmain' py='4' >
                    <Box as='button' className='sliderBtn sliderPrev' _hover={{ bg: "red.600" }} w='40px' h='40px' onClick={() => PrevBtn(sliderContainer)}>
                         <ArrowBackIcon />
                    </Box>

                    <Box as='div' className='productContainer' id='productContainer' ref={sliderContainer} py='2' w='100%' m='auto' display={'flex'} overflow='hidden' justifyContent={'space-between'} >
                         {data?.map((el, i) => (
                              <Box key={el.id} h='fit-content' px='2' display='flex' justifyContent='stretch' alignItems='center'>
                                   <Card data={el} setLoading={setLoading} />
                              </Box>
                         ))}
                    </Box>

                    <Box as='button' className='sliderBtn sliderNext' _hover={{ bg: "red.600" }} w='40px' h='40px' onClick={() => NextBtn(sliderContainer)}>
                         <ArrowForwardIcon />
                    </Box>
               </Box>
          </Box>
     )
}

export default ProductSlider