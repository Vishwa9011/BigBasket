import { Heading, Table, Tbody, Thead, Tr, Th, Box, Td, Button, Text, Image } from '@chakra-ui/react';
import { useGlobal } from '../../../Context/GlobalDataProvider/GlobalProvider';
import { useAdminProvider } from '../../../Context/AdminProvider/AdminProvider';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import Statistics from './Component/Statistics';
import { db } from '../../Firebase/firebase-config';
import UserDetailCard from './Component/UserDetailCard';

const AdminUsers = () => {

     const { showMsg } = useGlobal();
     const { FindActiveUser } = useAdminProvider();
     const [usersData, setUsersData] = useState([]);
     const userCollectionRef = collection(db, "users")
     const [showProfile, setShowProfile] = useState(false)
     const [userProfile, setUserProfile] = useState({})
     // * to get all the users from data base;
     useEffect(() => {
          // * for realtime update
          const unsubscribe = onSnapshot(userCollectionRef, (snapShot) => {
               var temp = [];
               snapShot.docs.forEach((doc) => {
                    temp.push({ id: doc.id, ...doc.data() })
               })
               setUsersData(temp)
          }, (error) => console.log(error))

          // * cleanup function
          return unsubscribe
     }, [])

     // * detete the user
     const DeleteUser = (user) => {
          console.log('user: ', user);
          const userDeleteRef = doc(db, 'users', user.id)
          deleteDoc(userDeleteRef).then(() => {
               showMsg(`${user.email} has been removed`, 'success')
          }).catch(err => console.log(err))
     }

     const HandleShowDetail = (user) => {
          setUserProfile(user)
          setShowProfile(v => !v)
     }


     return (
          <>
               <Box pos='relative'>
                    {/* Statistics */}
                    <Statistics usersData={usersData} />
                    {/* UserDetailCard */}
                    {showProfile && < UserDetailCard setShowProfile={setShowProfile} userProfile={userProfile} />}
                    <Box>
                         <Heading textAlign={'center'} padding='5'>Users</Heading>
                         <Table>
                              <Thead bg='red.500' >
                                   <Tr>
                                        <Th>S.no</Th>
                                        <Th>User Id</Th>
                                        <Th>Email</Th>
                                        <Th>Is Active</Th>
                                        <Th>Details</Th>
                                        <Th>Delete User</Th>
                                   </Tr>
                              </Thead>
                              <Tbody>
                                   {usersData.map((data, i) => (
                                        <Tr key={data.id}>
                                             <Td >{i + 1}</Td>
                                             <Td opacity={'.7'}>{data.id}</Td>
                                             <Td >{data.email}</Td>
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