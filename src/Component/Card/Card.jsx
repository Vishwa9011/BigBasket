import React, { useState } from 'react'
import { Box, Image, Select, Text, Button, Input } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'
import { GoPrimitiveDot } from 'react-icons/go'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import './Card.css'
import { useGlobal } from '../../Context/GlobalDataProvider/GlobalProvider'
import { async } from '@firebase/util'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../Firebase/firebase-config'
import { useAuth } from '../../Context/AuthContext/AuthContextProvider'
import { useNavigate } from 'react-router-dom'

const Card = (props) => {
     const { image, price, title, mrp, discount, select_qty = 1, unit = 'kg', brand } = props.data

     const { showMsg, setCartCountChange } = useGlobal()
     const { isAuth, currentUser } = useAuth()
     const navigate = useNavigate()
     const usersCollectionRef = collection(db, `cart/${currentUser?.email}/cartData`)
     const [data, setData] = useState({ ...props['data'] })


     // * to handle the change if user increase the select anything
     const HandleOnChange = (e) => {
          setData({ ...data, selected_qty_purchase: e.target.value })
     }

     // * adding product to the cart
     const HandleAddToCart = () => {

          // todo check userlogined or not
          if (!isAuth) {
               navigate("/login")
               return;
          };

          postDataToCart(data).then(res => {
               showMsg('Item successfully added in cart', 'success')
               setCartCountChange(v => !v)
          }).catch(err => console.log(err))
     }

     const postDataToCart = (data) => {
          return addDoc(usersCollectionRef, data)
     }

     return (
          <Box w='100%' minH={'100%'} p='3' borderRadius='10px' className='card'>
               <Box className='card-image-holder'>
                    <Box className='card-image' display='flex' justifyContent='center' alignItems='center' pos='relative'>
                         <Image src={image} alt='' h={'70%'} w={{ sm: '50%' }} />
                         <Box color='green' border='1px' borderRadius='2px' pos='absolute' left='10' bottom='0'><GoPrimitiveDot /></Box>
                    </Box>
               </Box>

               <Box className='card-detail'>
                    <Text title='Fresho' color={'red.500'} className='normalText'>{brand}</Text>
                    <Text title={title} className='normalText'>{title}</Text>
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
                    <Text as='span' ml='3' fontWeight='semibold'>₹{parseInt(price)}.00</Text>
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
     )
}

export default Card