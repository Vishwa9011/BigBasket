import React, { useEffect, useState } from 'react'
import { Box, HStack, Image, Text } from '@chakra-ui/react';


const Slider = () => {
     const [image, setImage] = useState(0)

     var id;
     useEffect(() => {
          id = setInterval(() => {
               if (image === 3) {
                    setImage(0)
               } else {
                    setImage(prev => prev + 1)
               }
          }, 4000);
          return () => clearInterval(id)
     }, [image])

     const slidesImages = [
          { url: 'https://www.bigbasket.com/media/uploads/banner_images/hp_m_GOURMETPL_GoodDiet_460px-011222.jpg' },
          { url: 'https://www.bigbasket.com/media/uploads/banner_images/hp_m_Dairy_460px-011222.jpg' },
          { url: 'https://www.bigbasket.com/media/uploads/banner_images/YXHP144_hp_fom_m_bbpl-staples_460_011222_Bangalore.jpg' },
          { url: 'https://www.bigbasket.com/media/uploads/banner_images/Cp_m_GM_EPBanner_460-051222.jpg' },
     ]

     const triggerData = [
          { title: "Offer on", subtitle: "Stapples" },
          { title: "Dairy", subtitle: "Store" },
          { title: "Good", subtitle: "Diet" },
          { title: "Home & Kitchen", subtitle: "Sale" },
     ]

     return (
          <Box w='100%' h='100%' pos='relative'>
               <Box>
                    <Image src={slidesImages[image]?.url} />
               </Box>
               <Box className='flex' pos={'absolute'} bottom='0' width={'100%'}>
                    {
                         triggerData.map((el, i) => (
                              <Box as='button'
                                   borderBottom='4px' borderBottomColor={i === image ? 'red.500' : 'transparent'}
                                   textAlign='center' key={i} whiteSpace='nowrap' px='5' py='1'
                                   style={{ backdropFilter: "blur(14px)" }} bg='whiteAlpha.500' transition='600ms' onClick={() => setImage(i)}>
                                   <Text>{el.title}</Text>
                                   <Text>{el.subtitle}</Text>
                              </Box>
                         ))
                    }
               </Box>
          </Box>
     )
}

export default Slider