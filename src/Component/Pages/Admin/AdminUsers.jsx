import { Heading, Table, Tbody, Thead, Tr, Th, Box, Td, Button, TableCaption, Text, Image } from '@chakra-ui/react';
import { useGlobal } from '../../../Context/GlobalDataProvider/GlobalProvider';
import { useAdminProvider } from '../../../Context/AdminProvider/AdminProvider';
import React, { useState, useEffect } from 'react'
import Statistics from './Component/Statistics';
import UserDetailCard from './Component/UserDetailCard';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase-config';

const AdminUsers = () => {

     const { showMsg } = useGlobal();
     const { globalData } = useAdminProvider();
     console.log('globalData: ', globalData);
     const [showProfile, setShowProfile] = useState(false)
     const [profileData, setProfileData] = useState({})


     // *to show the details of users
     const HandleShowDetail = (profile) => {
          setShowProfile(v => !v)
          setProfileData(profile);
     }

     // *deleting the users
     const DeleteUser = (item) => {
          deleteDoc(doc(db, "users", item.id)).then(() => {
               showMsg(`${item.username} has been deleted.`, 'success')
          })
     }

     return (
          <>
               <Box pos='relative'>

                    {/* Statistics */}
                    <Statistics />

                    {/* UserDetailCard */}
                    {showProfile && <UserDetailCard setShowProfile={setShowProfile} userProfile={profileData} />}
                    <Box>
                         <Heading textAlign={'center'} padding='5'>Users</Heading>
                         <Table>
                              <TableCaption>Here you can see the user details</TableCaption>
                              <Thead bg='red.500' >
                                   <Tr>
                                        <Th>S.no</Th>
                                        <Th>User Id</Th>
                                        <Th>User name</Th>
                                        <Th>Address</Th>
                                        <Th>Is Active</Th>
                                        <Th>Details</Th>
                                        <Th>Delete User</Th>
                                   </Tr>
                              </Thead>
                              <Tbody>
                                   {globalData.users?.map((data, i) => (
                                        <Tr key={data.id}>
                                             <Td >{i + 1}</Td>
                                             <Td opacity={'.7'}>{data.id}</Td>
                                             <Td >{data?.username?.split(" ").splice(0, 2).join(" ") || '---'}</Td>
                                             <Td >{data.email.split('@')[0]}</Td>
                                             <Td color={data.isActive ? 'green.700' : "red.500"}>{data.isActive ? 'Active' : 'Passive'}</Td>
                                             <Td>
                                                  <Button color='red.600' border={'2px'} borderStyle={'dotted'} borderColor='red.500' onClick={() => HandleShowDetail(data)}>Veiw</Button>
                                             </Td>
                                             <Td>
                                                  <Button color='blue.600' border={'2px'} borderStyle={'dotted'} borderColor='blue.500' onClick={() => DeleteUser(data)}>Delete User</Button>
                                             </Td>
                                        </Tr>
                                   ))}
                              </Tbody>
                         </Table>
                    </Box>
               </Box>
          </>
     )
}

export default AdminUsers