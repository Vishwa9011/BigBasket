import { collection, deleteDoc, getDocs, doc, updateDoc } from 'firebase/firestore'
import { useAuth } from '../../Context/AuthContext/AuthContextProvider'
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { db } from '../Firebase/firebase-config'
import Loader from '../component/Loader'
import CartCard from '../Card/CartCard'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

const calcTotalPrice = (data) => {
     return data?.reduce((start, item) => {
          return start + (+item.price);
     }, 0)
}

const calcTotalSavings = (data, totalPrice) => {
     return calcTotalMrp(data) - totalPrice;
}

const calcTotalMrp = (data) => {
     return data?.reduce((start, item) => {
          return start + (+item.mrp);
     }, 0)
}

const Cart = () => {
     const { currentUser } = useAuth();
     const usersCollectionRef = collection(db, `cart/${currentUser?.email}/cartData`);
     const [cartData, setCartData] = useState([])
     console.log('cartData: ', cartData);
     const [totalPrice, setTotalPrice] = useState(0);
     const [totalSavings, setTotalSavings] = useState(0);
     const [change, setChange] = useState(false);
     const [loading, setLoading] = useState(false);

     // * to send to the cartcard to update the item 
     const updateProduct = async (id, qty) => {
          console.log("update this item ", id)
          const userDoc = doc(db, `cart/${currentUser?.email}/cartData`, id)
          const newFeilds = { selected_qty_purchase: qty };
          await updateDoc(userDoc, newFeilds).then(res => {
               setChange(!change)
          })
     }

     //* to send to the cartcard to delete the item
     const deleteProduct = async (id) => {
          console.log("delete this item ", id)
          const userDoc = doc(db, `cart/${currentUser?.email}/cartData`, id)
          await deleteDoc(userDoc).then(res => {
               setChange(!change)
          })
     }

     const Checkout = async (limit) => {
          var count = 0;
          setLoading(true)
          const id = setInterval(() => {
               const userDoc = doc(db, `cart/${currentUser?.email}/cartData`, cartData[count].id)
               deleteDoc(userDoc).then(() => {
                    console.log("checkout done", count, limit)
                    count++;
                    if (count == limit) {
                         clearInterval(id)
                         setLoading(false)
                    }
               })
          }, 600);
     }

     // * to get all the cart item on first time or on every change
     useEffect(() => {
          setLoading(true)
          const getData = () => {
               getDocs(usersCollectionRef)
                    .then(res => {
                         setCartData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                         setLoading(false)
                    })
          }
          getData();
     }, [change])

     // * to get values of totalPrice and total savings
     useEffect(() => {
          setTotalPrice(calcTotalPrice(cartData));
          setTotalSavings(calcTotalSavings(cartData, totalPrice))
     }, [cartData])

     return (

          <>
               {loading && <Loader />}
               <Navbar />
               <Box>
                    <Box w='90%' m='auto' my='5'>
                         <Heading my='2'>Your Basket</Heading>
                         <Box w='100%' h='80px' bg='blackAlpha.800' p='5' borderRadius='10px' display='flex' justifyContent='space-between' alignItems='center'>
                              <Box>
                                   <Box color={'white'}>Subtotal ({cartData.length} items) : <Text as='span' fontWeight={'bold'}>₹ {totalPrice.toFixed(2)}</Text> </Box>
                                   <Box color='green.300'>Savings: <Text as='span' fontWeight={'bold'}>₹ {totalSavings.toFixed(2)}</Text></Box>
                              </Box>
                              <Box>
                                   <Button bg='red.500' color='white' className='flex' colorScheme='red.600' _hover={{ background: "red.600" }} onClick={() => Checkout(cartData.length)}>Checkout</Button>
                              </Box>
                         </Box>
                    </Box>

                    <Box w='90%' m='auto'>
                         {cartData.map((item) => (
                              <CartCard key={item.id} data={item} updateProduct={updateProduct} deleteProduct={deleteProduct} />
                         ))}
                    </Box>

               </Box>
               <Footer />
          </>
     )
}

export default Cart