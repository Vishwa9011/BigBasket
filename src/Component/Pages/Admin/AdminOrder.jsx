import { useAdminProvider } from '../../../Context/AdminProvider/AdminProvider';
import React, { useEffect, useState } from 'react'
import Statistics from './Component/Statistics';
import { Box, Table, Thead, Heading, Th, Td, Tr, Tbody } from '@chakra-ui/react';

const AdminOrder = () => {

     const { AllOrderData, setChange } = useAdminProvider()

     console.log('AllOrderData: ', AllOrderData);


     useEffect(() => {
          setChange(v => !v)
     }, [])

     return (
          <>
               <Box>
                    {/* Statistics */}
                    <Statistics />

                    <Box>
                         <Heading textAlign={'center'} padding='5'>Users</Heading>
                         <Table>
                              <Thead bg='red.500' >
                                   <Tr>
                                        <Th>S.no</Th>
                                        <Th>User Id</Th>
                                        <Th>Email</Th>
                                        <Th>Price</Th>
                                        <Th>Delivered</Th>
                                   </Tr>
                              </Thead>
                              <Tbody>
                                   {AllOrderData?.map((data, i) => (
                                        <Tr key={i}>
                                             <Td>{i + 1}</Td>
                                             <Td>#{data.id}</Td>
                                             <Td>{data.title}</Td>
                                             <Td>{data.price}</Td>
                                             <Td color={data.isPlaced ? 'green.500' : "red.500"}>{data.isPlaced ? 'Delivered' : 'On the way'}</Td>
                                        </Tr>
                                   ))}
                              </Tbody>
                         </Table>
                    </Box>


               </Box>
          </>
     )
}

export default AdminOrder