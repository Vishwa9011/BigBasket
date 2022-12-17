import { useGlobal } from '../../Context/GlobalDataProvider/GlobalProvider';
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { useAuth } from '../../Context/AuthContext/AuthContextProvider';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/firebase-config';
import { Box, Text, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import OrderCard from '../Card/OrderCard';
import Loader from '../component/Loader';
import Empty from '../component/Empty';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { calcTotalPrice, calcTotalSavings } from './Helper';

const MyOrders = () => {

     const { showMsg } = useGlobal();
     const { currentUser } = useAuth();
     const [orders, setOrders] = useState([]);
     const [change, setChange] = useState(false);
     const [loading, setLoading] = useState(false);
     const usersCollectionOrderRef = collection(db, `orders/${currentUser?.email}/ordersData`);
     const [priceDetail, setPriceDetail] = useState({ totalPrice: 0, totalSavings: 0 })

     const CancelOrder = (id) => {
          const userDoc = doc(db, `orders/${currentUser?.email}/ordersData`, id);
          deleteDoc(userDoc).then(() => {
               showMsg("Order has been deleted", "info");
               setChange(v => !v)
          })
     }

     useEffect(() => {
          setLoading(true);
          const getData = () => {
               getDocs(usersCollectionOrderRef).then(res => {
                    setOrders(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                    setLoading(false);
               })
          }
          getData()
     }, [currentUser, change])


     useEffect(() => {
          setPriceDetail({
               totalPrice: calcTotalPrice(orders),
               totalSavings: calcTotalSavings(orders)
          }) //* setting the price detail 
     }, [orders])

     return (
          <>
               {loading && <Loader />}
               <Navbar />
               <Box>
                    <Box w='90%' m='auto'>
                         <Text pt='4' pb='10' cursor={'pointer'}>🏠 <NavLink to='/' state='/'><Text _hover={{ textDecoration: "underline" }} as='span'>Home</Text></NavLink> / myorders</Text>
                    </Box>

                    <Box w='90%' m='auto' h='80px' bg='blackAlpha.800' p='5' borderRadius='10px' display='flex' justifyContent='space-between' alignItems='center'>
                         <Box>
                              <Box color={'white'}>Subtotal ({orders.length} items) : <Text as='span' fontWeight={'bold'}>₹ {priceDetail.totalPrice.toFixed(2)}</Text> </Box>
                              <Box color='green.300'>Savings: <Text as='span' fontWeight={'bold'}>₹ {priceDetail.totalSavings.toFixed(2)}</Text></Box>
                         </Box>
                         <Box>
                              <NavLink to='/' state='/'>
                                   <Button bg='red.500' color='white' className='flex' colorScheme='red.600' _hover={{ background: "red.600" }} >Continue Shopping</Button>
                              </NavLink>
                         </Box>
                    </Box>
                    {orders.length ? null : <Empty />}

                    <Box w='90%' m='auto' display='flex' gap='5' my='10'>

                         {orders.map((item) => (
                              <Box key={item.id} className='orderCard'>
                                   <OrderCard data={item} loading={loading} CancelOrder={CancelOrder} />
                              </Box>
                         ))}
                    </Box>
               </Box>
               <Footer />
          </>
     )
}

export default MyOrders