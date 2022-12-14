import React from 'react'
import { Box, Image, Select, Text, Button, Input } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'
import { GoPrimitiveDot } from 'react-icons/go'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import './Card.css'

const Card = (props) => {
     const { id, image, price, title, defaultImages } = props

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
                    <Box className='mediumtext flex' justifyContent='flex-start' color='red.800' pt='2'>
                         <Text as='span' className='flex' border='2px' borderColor="red.800" borderRadius='5px' px='1'>
                              4.4 <FaStar />
                         </Text>
                         <Text as='span' ml='2'>2303 Ratings</Text>
                    </Box>
               </Box>

               <Select mt='2' h={{ base: "35px", sm: "25px", md: '30px' }} className='normalText'>
                    <option value="">1kg - Rs 29.0</option>
                    <option value="">2kg - Rs 39.0</option>
                    <option value="">3kg - Rs 49.0</option>
               </Select>

               <Box fontSize='.9em' mt='2' className='normalText'>
                    <Text as='span' textDecoration={'line-through'} fontSize='.7em' color='red.500'>MRP Rs 38.16</Text>
                    <Text as='span' ml='3'>₹{price}.00</Text>
               </Box>

               <Box display={'flex'} justifyContent='space-between' alignItems='center' mt='4'>
                    <Box display='flex' border='1px' w='65px' h='100%' borderRadius='5px' overflow='hidden' opacity='.8' borderColor='gray' >
                         <Text as='span' borderRight='1px' px='1' className='mediumtext' textAlign='center' borderColor='gray'> Qty</Text>
                         <Input variant={'unstyled'} w='100%' px='2px' textAlign='center' className='mediumtext' />
                    </Box>
                    <Button h='max-content' p='2' borderRadius='20px' letterSpacing='0' colorScheme={'red.600'} _hover={{ background: "red.600" }}
                         className='BtnClickEffect' bg='red.500' color='white' transition={'all 200ms'}>
                         <Text as='span' h='25px' w='25px' bg='white' color='black' borderRadius='50%' className='flex'>
                              <AiOutlineShoppingCart />
                         </Text>
                         <Text as='span' ml='2' fontSize='.8em' display={['none', 'none', 'none', 'block']} >ADD TO CART</Text>
                    </Button>
               </Box>
          </Box>
     )
}

export default Card