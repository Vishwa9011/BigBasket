import { Box, Heading, Image, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

const AdminDashboard = () => {
     return (
          <>
               <Box>
                    <Box className='admin-statistics'>
                         <Box>
                              <Box>
                                   <Text fontSize={'1.2em'} fontWeight='semibold'>Active Users</Text>
                                   <Text fontSize={'2em'}>2181</Text>
                              </Box>
                              <Box >
                                   <Image src='/admin-images/adminuser.png' className='amin-userImage' />
                              </Box>
                         </Box>
                         <Box>
                              <Box>
                                   <Text fontSize={'1.2em'} fontWeight='semibold'>Orders</Text>
                                   <Text fontSize={'2em'}>34234</Text>
                              </Box>
                              <Box>
                                   <Image src='/admin-images/order2.png' />
                              </Box>
                         </Box>
                         <Box>
                              <Box>
                                   <Text fontSize={'1.2em'} fontWeight='semibold'>Users</Text>
                                   <Text fontSize={'2em'}>234234</Text>
                              </Box>
                              <Box>
                                   <Image src='/admin-images/data-analysis.png' />
                              </Box>
                         </Box>
                    </Box>

                    <Box>
                         <Heading>Users</Heading>
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
                                   <Tr>
                                        <Td>1</Td>
                                        <Td>KDSELDMOA234LMSF</Td>
                                        <Td>Vishu842301@gmail.com</Td>
                                        <Td>Active</Td>
                                   </Tr>
                                   <Tr>
                                        <Td>1</Td>
                                        <Td>KDSELDMOA234LMSF</Td>
                                        <Td>Vishu842301@gmail.com</Td>
                                        <Td>Active</Td>
                                   </Tr>
                                   <Tr>
                                        <Td>1</Td>
                                        <Td>KDSELDMOA234LMSF</Td>
                                        <Td>Vishu842301@gmail.com</Td>
                                        <Td>Active</Td>
                                   </Tr>

                              </Tbody>
                         </Table>
                    </Box>
               </Box>
          </>
     )
}

export default AdminDashboard