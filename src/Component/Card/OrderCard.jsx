import { Box, Image, Text, Button } from '@chakra-ui/react'
import { GoPrimitiveDot } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import React from 'react';
import './Card.css';

const OrderCard = ({ data, CancelOrder }) => {
     const { image, price, title, id, mrp, discount, brand } = data;
     return (
          <>
               <Box w='100%' minH={'100%'} p='3' borderRadius='10px' className='card' pos='relative'>
                    <Box pos='absolute' top='10' left='5' zIndex='10'>
                         <Image src='/ordered.png' boxSize='10' opacity='.7' />
                    </Box>
                    <Box className='card-image-holder'>
                         <Box className='card-image' display='flex' justifyContent='center' alignItems='center' pos='relative'>
                              <Image src={image} alt='' h={'70%'} w={{ sm: '50%' }} />
                              <Box color='green' border='1px' borderRadius='2px' pos='absolute' left='10' bottom='0'><GoPrimitiveDot /></Box>
                         </Box>
                    </Box>

                    <Box className='card-detail' pt='2'>
                         <Text title={brand.toUpperCase()} color={'red.500'} textTransform={'capitalize'} className='normalText'>{brand}</Text>
                         <Text title={title} textTransform={'capitalize'} className='normalText'>{title}</Text>
                         <Box className='mediumtext flex' justifyContent='flex-start' color='red.800' pt='2' fontSize={{ base: ".8em", md: "1em" }}>
                              <Text as='span' className='flex' border='2px' borderColor="green.800" borderRadius='5px' px='1' color='green.800'>
                                   4.4 <FaStar />
                              </Text>
                              <Text as='span' ml='2' >2303 Ratings</Text>
                         </Box>
                    </Box>

                    <Box fontSize='.9em' mt='2' className='normalText'>
                         <Text as='span' textDecoration={'line-through'} fontSize='.7em' opacity='.7'>MRP ₹{mrp}</Text>
                         <Text as='span' title={price} ml='3' fontWeight='semibold'>₹{parseInt(price)}.00</Text>
                    </Box>

                    <Box display={'flex'} justifyContent='flex-end' alignItems='center' mt='4'>
                         <Button h='max-content' p='2' borderRadius='20px' letterSpacing='0' colorScheme={'red.600'} _hover={{ background: "red.600" }}
                              className='BtnClickEffect cartBtn' bg='red.500' color='white' transition={'all 200ms'}>
                              <Text as='span' h='22px' fontSize={{ sm: "1em", md: '.8em' }} w='22px' bg='white' color='black' borderRadius='50%' className='flex'>
                                   <IoClose />
                              </Text>
                              <Text as='span' ml='2' fontSize='.8em' onClick={() => CancelOrder(id)}>Cancel Order</Text>
                         </Button>
                    </Box>

                    {(discount >= 1) && <Box className='discount' bg='red.500'>
                         <Text as='span'>{discount}% OFF</Text>
                    </Box>}
               </Box>
          </>

     )
}

export default OrderCard