import { Box, Heading, Image, Input, Text, Textarea, Button } from '@chakra-ui/react'
import { useGlobal } from '../../Context/GlobalDataProvider/GlobalProvider';
import { useAuth } from '../../Context/AuthContext/AuthContextProvider';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase-config';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './styles.css'
const Contact = () => {

     const { showMsg } = useGlobal();
     const { currentUser, currentUserDetail } = useAuth();
     const [message, setMessage] = useState({ name: currentUserDetail?.username || '', email: currentUserDetail?.email, message: "" });

     // * handle input feilds data.
     const HandleChange = (e) => {
          setMessage(prev => ({ ...prev, [e.target.name]: e.target.value }))
     }

     // * send contact detail from 
     const SendContactForm = (e) => {
          e.preventDefault();
          if (message.name == "" || message.email == "" || message.message == "") {
               return showMsg("Please fill all the required feilds.")
          }
          const messageId = Date.now();
          const userContactRef = doc(db, "messages", `@${messageId}`);
          setDoc(userContactRef, { ...message, userId: currentUser?.uid })
               .then(() => {
                    showMsg("Thanks for your feedback", 'success')
                    setMessage({ name: "", email: "", message: "" })
               })
               .catch(err => console.log(err));
     }

     return (
          <Box display='flex' justifyContent='center' alignItems='center' w='100%' minH='100vh'>
               <Link to='/'>
                    <Button title='Goto home' bg='none' color='black' display={'flex'} className='gobackBtn BtnClickEffect' justifyContent='space-around' p='1' m='0' width={'120px'} border='px'
                         alignItems='center' pos='absolute' top='4' left='4'>
                         <Image src='/admin-images/arrow.png' boxSize='5' />
                         <Text fontSize={'1.4em'} fontWeight='600' fontFamily=''>Go Back</Text>
                    </Button>
               </Link>
               <Box w='90%'>
                    <Box>
                         <Heading textAlign={'center'}>Contact Us</Heading>
                    </Box>

                    {/* <Box></Box> */}

                    <Box display='flex'>
                         <Box display={'flex'} w='40%' >
                              <Image src='https://img.freepik.com/free-vector/contact-center-abstract-concept_335657-3032.jpg?w=2000' />
                         </Box>
                         <Box w='100%'>
                              <form className='contact-form' onSubmit={SendContactForm}>
                                   <Box mt='4'>
                                        <Text>Name</Text>
                                        <Input name='name' textTransform={'capitalize'} value={message.name} placeholder='Enter Your Name' onChange={HandleChange} />
                                   </Box>
                                   <Box mt='4'>
                                        <Text>Email</Text>
                                        <Input type='email' value={message.email} name='email' placeholder='Enter Your Email' onChange={HandleChange} />
                                   </Box>
                                   <Box mt='4'>
                                        <Text>Message</Text>
                                        <Textarea placeholder='Write something here...' value={message.message} h='150px' name='message' onChange={HandleChange} />
                                   </Box>
                                   <Box mt='4' display={'flex'} justifyContent='flex-end'>
                                        <Input type='submit' w='fit-content' className='BtnClickEffect' borderRadius={'20px'} value='Send Message' bg='red.500' color='white' fontSize={'1.2em'} />
                                   </Box>
                              </form>
                         </Box>
                    </Box>
               </Box>
          </Box>
     )
}

export default Contact