import { useGlobal } from '../../Context/GlobalDataProvider/GlobalProvider';
import { collection, deleteDoc, doc, query, where, onSnapshot } from 'firebase/firestore';
import { calcTotalItem, calcTotalPrice, calcTotalSavings } from './Helper';
import { Box, Text, Button, Grid, useDisclosure } from '@chakra-ui/react';
import { useAuth } from '../../Context/AuthContext/AuthContextProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/firebase-config';
import OrderCard from '../Card/OrderCard';
import Loader from '../component/Loader';
import Empty from '../component/Empty';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Alert from '../component/Alert';

const MyOrders = () => {
     const navigate = useNavigate()
     const { showMsg } = useGlobal();
     const { currentUser } = useAuth();
     const [orders, setOrders] = useState([]);
     const [loading, setLoading] = useState(false);
     const { isOpen, onOpen, onClose } = useDisclosure();
     const [cancelOrderId, setCancelOrderId] = useState('')
     const [priceDetail, setPriceDetail] = useState({ totalPrice: 0, totalSavings: 0 });
     const usersCollectionOrderRef = collection(db, 'orders');

     const CancelOrder = (id) => {
          // * check user is authenticated or not / if someone has deleted the localstorage
          const isAuth = JSON.parse(localStorage.getItem('isAuth')) || false;
          if (!isAuth) {
               logout();
               navigate("/login", 'login');
          }
          setCancelOrderId(id)
          // * tot
          onOpen()
     }

     // * to delete the order from server side as well
     const CancelOrderFromServer = () => {
          // * if authenticated then do these thing
          const userDoc = doc(db, `orders`, cancelOrderId);
          deleteDoc(userDoc).then(() => {
               showMsg("Order has been deleted", "info");
          })
     }

     useEffect(() => {
          setLoading(true);
          var unsubscribe;
          if (currentUser?.email) {
               const querryData = query(usersCollectionOrderRef, where("email", "==", currentUser?.email));
               unsubscribe = onSnapshot(querryData, (snapShot) => {
                    setOrders(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                    setLoading(false);
               }, (err) => { console.log(err) })
          } else navigate("/", "/")
          return unsubscribe;
     }, [currentUser])

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
               <Alert isOpen={isOpen} onOpen={onOpen} onClose={onClose} text={"Cancel Order"} BtnText={'Confirm'} msg={"Are you sure? you want to delete your order"} execution={CancelOrderFromServer} />
               <Box>
                    <Box w='90%' m='auto'>
                         <Text pt='4' pb={[3, 3, '5']} cursor={'pointer'}>🏠 <NavLink to='/' state='/'><Text _hover={{ textDecoration: "underline" }} as='span'>Home</Text></NavLink> / myorders</Text>
                    </Box>

                    <Box w='90%' m='auto' h='80px' bg='blackAlpha.800' p='5' borderRadius='10px' display='flex' justifyContent='space-between' alignItems='center'>
                         <Box>
                              <Box fontSize={{ base: ".7em", sm: ".7em", md: "1em" }} color={'white'}>Subtotal ({calcTotalItem(orders)} items) : <Text as='span' fontWeight={'bold'}>₹ {priceDetail.totalPrice.toFixed(2)}</Text> </Box>
                              <Box fontSize={{ base: ".7em", sm: ".7em", md: "1em" }} color='green.300'>Savings: <Text as='span' fontWeight={'bold'}>₹ {priceDetail.totalSavings.toFixed(2)}</Text></Box>
                         </Box>
                         <Box>
                              <NavLink to='/' state='/'>
                                   <Button fontSize={{ base: ".7em", sm: ".7em", md: "1em" }} bg='red.500' color='white' className='flex' colorScheme='red.600' _hover={{ background: "red.600" }} >Continue Shopping</Button>
                              </NavLink>
                         </Box>
                    </Box>

                    {orders.length ? null : <Empty />}

                    <Grid w='90%' m='auto' templateColumns={{ sm: "repeat(2,1fr)", md: 'repeat(3,1fr)', lg: 'repeat(4,1fr)' }} gap='5' my='10'>
                         {orders.map((item) => (
                              <Box key={item.id} className='orderCard' w='100%'>
                                   <OrderCard data={item} loading={loading} CancelOrder={CancelOrder} />
                              </Box>
                         ))}
                    </Grid>
               </Box>
               <Footer />
          </>
     )
}

export default MyOrders