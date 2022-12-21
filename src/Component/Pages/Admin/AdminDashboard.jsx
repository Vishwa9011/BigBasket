import { Box, Heading, Image, Table, Tbody, Td, Text, Th, Thead, Tr, TableCaption } from '@chakra-ui/react'
import { useAdminProvider } from '../../../Context/AdminProvider/AdminProvider'
import React, { useEffect, useState } from 'react'
import Statistics from './Component/Statistics'

const AdminDashboard = () => {

     const { globalData } = useAdminProvider();

     return (
          <>
               <Box>
                    {/* Statistics */}
                    <Statistics />
                    <Box>
                         <Heading textAlign={'center'} padding='5'>Users</Heading>
                         <Table>
                              <TableCaption>Here you can see the users, they are active or not.</TableCaption>
                              <Thead bg='red.500' >
                                   <Tr>
                                        <Th>S.no</Th>
                                        <Th>User Id</Th>
                                        <Th>Email</Th>
                                        <Th>Is Active</Th>
                                   </Tr>
                              </Thead>
                              <Tbody>
                                   {
                                        globalData?.users &&
                                        globalData.users?.map((data, i) => (
                                        <Tr key={data.id}>
                                             <Td>{i + 1}</Td>
                                             <Td opacity={'.7'}>{data.id}</Td>
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