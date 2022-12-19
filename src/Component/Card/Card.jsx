import { useGlobal } from '../../Context/GlobalDataProvider/GlobalProvider'
import { useAuth } from '../../Context/AuthContext/AuthContextProvider'
import { Box, Image, Select, Text, Button } from '@chakra-ui/react'
import { useProvider } from '../../Context/Provider/Provider'
import { addDoc, collection } from 'firebase/firestore'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { db } from '../Firebase/firebase-config'
import { GoPrimitiveDot } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import './Card.css'

const Card = ({ data, setLoading }) => {
     const { image, price, title, id, mrp, discount, select_qty = 1, unit = 'kg', brand } = data;
     const navigate = useNavigate()
     const { showMsg } = useGlobal()
     const { currentUser } = useAuth()
     const { setCartCountChange } = useProvider()
     const [item, setItem] = useState({ ...data })
     const isAuth = JSON.parse(localStorage.getItem('isAuth')) || false
     const usersCollectionRef = collection(db, `cart/${currentUser?.email}/cartData`)

     // * to handle the change if user increase the select anything
     const HandleOnChange = (e) => {
          setItem({ ...item, selected_qty_purchase: e.target.value })
     }

     // * adding product to the cart
     const HandleAddToCart = () => {
          console.log('this is not going to update', id)
          // todo check userlogined or not
          if (!isAuth) return navigate("/login", "login")

          // *Adding the data to the cart
          postDataToCart().then(res => {
               setLoading(false)
               setCartCountChange(v => !v)
               showMsg('Item successfully added in cart', 'success')
          }).catch(err => console.log(err))
     }

     // * add data to cart
     const postDataToCart = () => {
          setLoading(true)
          return addDoc(usersCollectionRef, item)
     }

     return (
          <>
               <Box w='100%' minH={'100%'} p='3' borderRadius='10px' className='card'>
                    <Box className='card-image-holder'>
                         <Box className='card-image' display='flex' justifyContent='center' alignItems='center' pos='relative'>
                              <Image src={image} alt='' h={['50%', '50%', '70%']} w={['45%', '50%']} />
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

                    <Select mt='2' h={{ base: "35px", sm: "25px", md: '30px' }} className='normalText' onChange={HandleOnChange}>
                         <option value='1'>{`${select_qty + unit} - ₹${parseInt(price)}.00`}  </option>
                         <option value='2'>{`${2 * select_qty + unit} - ₹${2 * parseInt(price)}.00`}  </option>
                         <option value='3'>{`${3 * select_qty + unit} - ₹${3 * parseInt(price)}.00`}  </option>
                    </Select>

                    <Box fontSize='.9em' mt='2' className='normalText'>
                         <Text as='span' textDecoration={'line-through'} fontSize='.7em' opacity='.7'>MRP ₹{mrp}</Text>
                         <Text as='span' title={price} ml='3' fontWeight='semibold'>₹{parseInt(price)}.00</Text>
                    </Box>

                    <Box display={'flex'} justifyContent='flex-end' alignItems='center' mt='4'>
                         <Button h='max-content' p='2' borderRadius='20px' letterSpacing='0' colorScheme={'red.600'} _hover={{ background: "red.600" }}
                              className='BtnClickEffect cartBtn' bg='red.500' color='white' transition={'all 200ms'}>
                              <Text as='span' h='22px' fontSize={{ sm: "1em", md: '.8em' }} w='22px' bg='white' color='black' borderRadius='50%' className='flex'>
                                   <AiOutlineShoppingCart />
                              </Text>
                              <Text as='span' ml='2' fontSize='.8em' onClick={HandleAddToCart}>ADD TO CART</Text>
                         </Button>
                    </Box>

                    {/* Discount */}
                    {(discount >= 1) && <Box className='discount' bg='red.500'>
                         <Text as='span'>{discount}% OFF</Text>
                    </Box>}
               </Box> 
          </>

     )
}

export default Card