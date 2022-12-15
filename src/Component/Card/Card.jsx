import React from 'react'
import { Box, Image, Select, Text, Button, Input } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'
import { GoPrimitiveDot } from 'react-icons/go'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import './Card.css'

const Card = (props) => {
     console.log('props: ', props);

     const { image, price, title, mrp, discount } = props.data

     return (
          <Box w='100%' p='3' borderRadius='10px' className='card'>
               <Box className='card-image-holder'>
                    <Box className='card-image' display='flex' justifyContent='center' alignItems='center' pos='relative'>
                         <Image src={image} alt='' h={'70%'} w={{ sm: '50%' }} />
                         <Box color='green' border='1px' borderRadius='2px' pos='absolute' left='10' bottom='0'><GoPrimitiveDot /></Box>
                    </Box>
               </Box>

               <Box className='card-detail'>
                    <Text title='Fresho' color={'red.500'} className='normalText'>Fresho</Text>
                    <Text title={title} className='normalText'>{title}</Text>
                    <Box className='mediumtext flex' justifyContent='flex-start' color='red.800' pt='2' fontSize={{ base: ".8em", md: "1em" }}>
                         <Text as='span' className='flex' border='2px' borderColor="green.800" borderRadius='5px' px='1' color='green.800'>
                              4.4 <FaStar />
                         </Text>
                         <Text as='span' ml='2' >2303 Ratings</Text>
                    </Box>
               </Box>

               <Select mt='2' h={{ base: "35px", sm: "25px", md: '30px' }} className='normalText'>
                    <option>1kg - Rs 29.0</option>
                    <option>2kg - Rs 39.0</option>
                    <option>3kg - Rs 49.0</option>
               </Select>

               <Box fontSize='.9em' mt='2' className='normalText'>
                    <Text as='span' textDecoration={'line-through'} fontSize='.7em' opacity='.7'>MRP ₹{mrp}</Text>
                    <Text as='span' ml='3' fontWeight='semibold'>₹{parseInt(price)}.00</Text>
               </Box>

               <Box display={'flex'} justifyContent='flex-end' alignItems='center' mt='4'>
                    {/* <Box display='flex' border='1px' w='65px' h='100%' borderRadius='5px' overflow='hidden' opacity='.8' borderColor='gray' >
                         <Text as='span' borderRight='1px' px='1' className='mediumtext' textAlign='center' borderColor='gray'> Qty</Text>
                         <Input variant={'unstyled'} w='100%' px='2px' textAlign='center' className='mediumtext' />
                    </Box> */}
                    <Button h='max-content' p='2' borderRadius='20px' letterSpacing='0' colorScheme={'red.600'} _hover={{ background: "red.600" }}
                         className='BtnClickEffect cartBtn' bg='red.500' color='white' transition={'all 200ms'}>
                         <Text as='span' h='22px' fontSize={{ sm: "1em", md: '.8em' }} w='22px' bg='white' color='black' borderRadius='50%' className='flex'>
                              <AiOutlineShoppingCart />
                         </Text>
                         <Text as='span' ml='2' fontSize='.8em' >ADD TO CART</Text>
                    </Button>
               </Box>

               {/* Discount */}
               <Box className='discount' bg='red.500'>
                    <Text as='span'>{discount}% OFF</Text>
               </Box>
          </Box>
     )
}

export default Card