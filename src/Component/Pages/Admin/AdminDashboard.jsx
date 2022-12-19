import { Box, Heading, Image, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useAdminProvider } from '../../../Context/AdminProvider/AdminProvider'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from '../../Firebase/firebase-config'
import React, { useEffect, useState } from 'react'
import Statistics from './Component/Statistics'

const AdminDashboard = () => {

     const [usersData, setUsersData] = useState([]);
     const userCollectionRef = collection(db, "users");
     const [finish, setFinish] = useState(false);
     const userOrderRef = collection(db, "orders");
     const [ordersData, setOrdersData] = useState([]);
     console.log('ordersData: ', ordersData);
     const [docs, loading, error] = useCollectionData(userOrderRef);
     const { setUserDataGlobal, setAllOrderData } = useAdminProvider();

     // * to get all the users from data base;
     useEffect(() => {
          // * for realtime update
          const unsubscribe = onSnapshot(userCollectionRef, (snapShot) => {
               var temp = [];
               snapShot.docs.forEach((doc) => {
                    temp.push({ id: doc.id, ...doc.data() })
               })
               setUsersData(temp)
               setUserDataGlobal(temp)
          }, (error) => console.log(error))

          // * cleanup function
          return unsubscribe
     }, [])

     // *all orders from all users
     useEffect(() => {
          const getAllData = () => {
               if (!docs?.length) return;
               var count = 0;
               const id = setInterval(() => {
                    const userOrderListRef = collection(db, `orders/${docs[count].id}/ordersData`);
                    getDocs(userOrderListRef).then((res) => {
                         const temp = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                         setOrdersData(prev => [...prev, ...temp])
                         count++;
                         if (count === docs.length) {
                              clearInterval(id)
                              setFinish(v => !v);
                         }
                    })
               }, 300)
          }
          getAllData();
          return () => { setOrdersData([]) };
     }, [docs])

     useEffect(() => {
          setAllOrderData([...ordersData])
          console.log("FInished")
     }, [finish])



     return (
          <>
               <Box>
                    {/* Statistics */}
                    <Statistics usersData={usersData} />
                    <Box>
                         <Heading textAlign={'center'} padding='5'>Users</Heading>
                         <Table>
                              <Thead bg='red.500' >
                                   <Tr>
                                        <Th>S.no</Th>
                                        <Th>User Id</Th>
                                        <Th>Email</Th>
                                        <Th>Is Active</Th>
                                   </Tr>
                              </Thead>
                              <Tbody>
                                   {usersData.map((data, i) => (
                                        <Tr key={data.id}>
                                             <Td>{i + 1}</Td>
                                             <Td>{data.id}</Td>
                                             <Td>{data.email}</Td>
                                             <Td color={data.isActive ? 'green.500' : "red.500"}>{data.isActive ? 'Active' : 'Passive'}</Td>
                                        </Tr>
                                   ))}
                              </Tbody>
                         </Table>
                    </Box>
               </Box>
          </>
     )
}

export default AdminDashboard