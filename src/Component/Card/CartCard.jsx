import { Box, Image, Text, Button } from '@chakra-ui/react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import React from 'react'
import './Card.css'
const CartCard = ({ data, updateProduct, deleteProduct }) => {

     const { id, image, price, title, mrp, brand, selected_qty_purchase = 1 } = data;

     return (
          <>
               <Box>
                    <Box>
                         <Box borderBottom='1px' borderColor='gray.300' my='5'>
                              <Text px='3' w='fit-content' fontSize='1.7em' fontWeight='semibold' borderBottom='2px' borderColor='red.500' textTransform={'capitalize'}>{brand}</Text>
                              <Box className='cartcard' w='100%' justifyContent='space-between' p='3' py='8' alignItems='center'>
                                   <Box textAlign='center'>
                                        <Image src={image} alt='' boxSize={['', '100px', '150px']} />
                                   </Box>
                                   <Box fontWeight='semibold'>
                                        <Text title={title} textTransform={'capitalize'}>{title}</Text>
                                        <Text title={price} display='flex' alignItems='center'>₹ {price} <Text as='span' ml='2' fontSize='.8em' opacity='.7' textDecoration={'line-through'}>₹{mrp}</Text></Text>
                                   </Box>
                                   <Box p='2' display={'flex'} justifyContent='center'>
                                        <Box>
                                             <Box h='30px' w={['80px', '80px', '100px', '150px']} display='flex' justifyContent='space-between' p='1' alignItems='center' border='1px' borderColor='gray.300' borderRadius='5px'>
                                                  <Button bg='none' colorScheme='transparent' minW={'25px'} h='22px' _hover={{ background: "red.500", color: "white" }} p='0' className='flex' color='black' fontSize='1em' fontWeight='bold' disabled={selected_qty_purchase === 1} onClick={() => updateProduct(id, selected_qty_purchase - 1)}> <BiMinus /> </Button>
                                                  <Box width='30px' h='20px' className='flex'>{selected_qty_purchase}</Box>
                                                  <Button bg='none' colorScheme='transparent' minW={'25px'} h='22px' _hover={{ background: "red.500", color: "white" }} p='0' className='flex' color='black' fontSize='em' fontWeight='bold' onClick={() => updateProduct(id, selected_qty_purchase + 1)}> <BiPlus /> </Button>
                                             </Box>
                                             <Box display='flex' alignItems={'center'} flexDirection={['column', 'column', 'row']}>
                                                  <Button bg='none' colorScheme='transparent' color='blackAlpha.700' borderRadius='0' fontSize='.7em' p='0' h='20px' my={[0, 0, '2']} onClick={() => deleteProduct(id)}>Delete</Button>
                                                  <Box borderRight='1px' borderColor='gray.200' display={['none', 'none', 'block']} h='20px' mx='1'></Box>
                                                  <Button bg='none' colorScheme='transparent' color='blackAlpha.700' borderRadius='0' fontSize='.7em' p='0' border='0px' h='20px' my={[0, 0, '2']}>Save for later</Button>
                                             </Box>
                                        </Box>
                                   </Box>
                                   <Box textAlign='right' fontSize={['.6em', '.6em', '1em']}>
                                        <Text fontWeight='bold'>₹ {(+selected_qty_purchase * +price).toFixed(2)}</Text>
                                        <Text color='yellowgreen' fontWeight='semibold'>Saved: ₹{(+selected_qty_purchase * (+mrp - +price)).toFixed(2)}</Text>
                                   </Box>
                              </Box>
                         </Box>
                    </Box>
               </Box>
          </>
     )
}

export default CartCard