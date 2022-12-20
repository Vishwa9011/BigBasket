import { useAdminProvider } from '../../../Context/AdminProvider/AdminProvider';
import React, { useEffect, useState } from 'react'
import Statistics from './Component/Statistics';
import { Box, Table, Thead, Heading, Th, Td, Tr, Tbody, TableContainer, TableCaption, Button } from '@chakra-ui/react';
import './admin.css'
import { setDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase-config';
import { useGlobal } from '../../../Context/GlobalDataProvider/GlobalProvider';

const AdminOrder = () => {

     const { showMsg } = useGlobal();
     const { globalData } = useAdminProvider()


     const ToggleDeliveryStatus = (data) => {
          console.log('data: ', data);
          setDoc((doc(db, 'orders', data.orderId)), { ...data, isPlaced: !data.isPlaced }).then(() => {
               showMsg("Order status has been changed");
          })
     }

     useEffect(() => {
          // * to calculate the total price
          const calcTotalPrice = (data) => {
               return data?.reduce((start, item) => {
                    return start + (+item.price);
               }, 0)
          }

          console.log(calcTotalPrice(globalData.orders))
     }, [globalData])



     return (
          <>
               <Box>
                    {/* Statistics */}
                    <Statistics />
                    <Box>
                         <Heading textAlign={'center'} padding='5'>Users</Heading>
                         <TableContainer p='2'>
                              <Table >
                                   <TableCaption>Here you can see all the users</TableCaption>
                                   <Thead bg='red.500' >
                                        <Tr py='6'>
                                             <Th>S.no</Th>
                                             <Th>order Id</Th>
                                             <Th>Product Name</Th>
                                             <Th>Customer Name</Th>
                                             <Th>Price</Th>
                                             <Th>Delivery Status</Th>
                                             <Th>Change Status</Th>
                                        </Tr>
                                   </Thead>
                                   <Tbody>
                                        {globalData.orders?.map((data, i) => (
                                             <Tr key={i}>
                                                  <Td>{i + 1}</Td>
                                                  <Td opacity={'.7'}>{data.orderId}</Td>
                                                  <Td>{data.title.slice(0, 15)} {data.title.length >= 15 ? "..." : ""}</Td>
                                                  <Td>{data.email}</Td>
                                                  <Td>₹ {parseInt(data.price)} /-</Td>
                                                  <Td color={data.isPlaced ? 'green.500' : "red.500"}>{data.isPlaced ? 'Delivered' : 'On the way'}</Td>
                                                  <Td color={data.isPlaced ? 'green.500' : "red.500"}>
                                                       <Button color='green.600' border={'2px'} borderStyle={'dotted'} borderColor='green.500' onClick={() => ToggleDeliveryStatus(data)}>
                                                            {data.isPlaced ? 'Delivered' : 'Toggle to Status'}
                                                       </Button>
                                                  </Td>
                                             </Tr>
                                        ))}
                                   </Tbody>
                         </Table>
                         </TableContainer>

                    </Box>
               </Box>
          </>
     )
}

export default AdminOrder