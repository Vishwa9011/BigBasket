import { Heading, Table, Tbody, Thead, Tr, Th, Box, Td, Button, TableCaption, useDisclosure } from '@chakra-ui/react';
import { useGlobal } from '../../../Context/GlobalDataProvider/GlobalProvider';
import { useAdminProvider } from '../../../Context/AdminProvider/AdminProvider';
import React, { useState, useEffect } from 'react'
import Statistics from './Component/Statistics';
import UserDetailCard from './Component/UserDetailCard';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase/firebase-config';
import Alert from '../../component/Alert';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminUsers = () => {
     const navigate = useNavigate();
     const { showMsg, capitalize } = useGlobal();
     const { globalData } = useAdminProvider();
     const [profileData, setProfileData] = useState({})
     const [deleteUserData, setDeleteUserData] = useState({});
     const { isOpen, onOpen, onClose } = useDisclosure();
     const [showProfile, setShowProfile] = useState(false)


     // *to show the details of users
     const HandleShowDetail = (profile) => {
          setShowProfile(v => !v)
          setProfileData(profile);
     }

     const DeleteUserConfirmation = (data) => {
          setDeleteUserData(data);
          onOpen();
     }

     // *deleting the users
     const DeleteUser = () => {
          const item = deleteUserData;
          deleteDoc(doc(db, "users", item.id)).then(() => {
               showMsg(`${item.username} has been deleted.`, 'success')
          })    
     }

     return (
          <>
               <Alert isOpen={isOpen} onOpen={onOpen} onClose={onClose} text={'Delete user'} BtnText={'Confirm'} msg={`Are you sure? You want to Delete `} data={deleteUserData} execution={DeleteUser} />
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
                                   {
                                        globalData?.users &&
                                        globalData.users?.map((data, i) => (
                                        <Tr key={data.id}>
                                             <Td >{i + 1}</Td>
                                             <Td opacity={'.7'}>{data.id}</Td>
                                                  <Td >{capitalize(data?.username?.split(" ").splice(0, 2).join(" "), "*") || '---'}</Td>
                                             <Td >{data.email.split('@')[0]}</Td>
                                             <Td color={data.isActive ? 'green.700' : "red.500"}>{data.isActive ? 'Active' : 'Passive'}</Td>
                                             <Td>
                                                  <Button color='red.600' border={'2px'} borderStyle={'dotted'} borderColor='red.500' onClick={() => HandleShowDetail(data)}>Veiw</Button>
                                             </Td>
                                             <Td>
                                                       <Button color='blue.600' title={data.isAdmin ? "Admin can't be deleted" : "Delete User"} border={'2px'} borderStyle={'dotted'} borderColor='blue.500' disabled={data.isAdmin} onClick={() => DeleteUserConfirmation(data)}>Delete User</Button>
                                             </Td>
                                        </Tr>
                                        ))
                                   }
                              </Tbody>
                         </Table>
                    </Box>
               </Box>
          </>
     )
}

export default AdminUsers