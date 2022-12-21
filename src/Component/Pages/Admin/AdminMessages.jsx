import { Box, Image, Text, Flex, Avatar, Badge, useDisclosure, Button } from '@chakra-ui/react'
import { useAdminProvider } from '../../../Context/AdminProvider/AdminProvider'
import { useGlobal } from '../../../Context/GlobalDataProvider/GlobalProvider';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import { RiChatDeleteFill, RiDeleteBack2Fill } from 'react-icons/ri'
import { MdDelete } from 'react-icons/md'
import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase/firebase-config'
import { ReadMessage } from './Component/ReadMessage'


const FilterUserImage = (userId, users) => {
     const temp = users.find((user) => user.id === userId)
     const image = temp.image;
     const gender = temp.gender;
     return { image, gender }
}

const MessageCard = ({ msg }) => {
     const { showMsg, capitalize } = useGlobal();
     const { globalData } = useAdminProvider()
     const { isOpen, onOpen, onClose } = useDisclosure()
     const { image, gender } = FilterUserImage(msg.userId, globalData.users)


     // * to delete the msg
     const DeleteMessage = (msg) => {
          const deleteRef = doc(db, 'messages', msg.id)
          deleteDoc(deleteRef).then(() => {
               showMsg(`Message from ${msg.name} has been deleted.`)
          }).catch(err => console.log(err));
     }

     return (
          <>
               {<ReadMessage isOpen={isOpen} onOpen={onOpen} onClose={onClose} msg={msg} image={image} gender={gender} />}
               <Box display='flex' minW='400px' justifyContent={'space-between'} alignItems='center' cursor={'pointer'} border={'1px'} w='fit-content' p='2' m='2' borderRadius={'10px'}>
                    <Box display='flex' alignItems={'center'} onClick={onOpen}>
                         <Box>
                              {
                                   image || gender ? < Image src={image || (gender === 'male' ? `/admin-images/man.png` : gender == 'female' ? '/admin/woman.png' : "")} alt='' boxSize={10} borderRadius='50%' />
                                        :
                                        <Image src='https://static.thenounproject.com/png/55168-200.png' alt='' filter={'invert(70%)'} />
                              }
                         </Box>
                         <Box border={'0px'} ml='5'>
                              <Box display={'flex'} justifyContent='flex-start' alignItems={'center'}>
                                   <Text fontWeight={'semibold'}>{capitalize(msg.name, "*")}</Text>
                                   <Badge colorScheme='green' ml='2'>New</Badge>
                              </Box>
                              <Text opacity={'.9'} _hover={{ textDecoration: "underline" }}>{msg.email}</Text>
                         </Box>
                    </Box>
                    <Box fontSize={'1.5em'}>
                         <Button m='1' p='0' bg='gray.200' h='30px' minW={'30px'} onClick={() => DeleteMessage(msg)}>
                              <MdDelete />
                         </Button>
                    </Box>
               </Box>
          </>
     )
}

const AdminMessages = () => {

     const [message, setMessage] = useState([])
     console.log('message: ', message);

     // * retrieving the data from server
     useEffect(() => {
          const unsubs = onSnapshot(collection(db, 'messages'), (snapShot) => {
               setMessage(snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          }, (err) => { console.log(err) })
          // * cleanup function
          return unsubs
     }, [])

     return (
          <>

               <Box p='4'>
                    <Box mb='5'>
                         <Text fontSize={'2em'} fontWeight='semibold'>Messages</Text>
                    </Box>
                    <Box border='px' h=''>
                         {message?.map((msg) => (<MessageCard key={msg.id} msg={msg} />))}
                    </Box>
               </Box>
          </>
     )
}

export default AdminMessages