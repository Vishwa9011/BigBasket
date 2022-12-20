import { Box, Heading, Input, Text, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import './styles.css'

const Contact = () => {


     const [message, setMessage] = useState({ name: "", email: "", message: "" });

     const HandleChange = (e) => {
          setMessage(prev => ({ ...prev, [e.target.name]: e.target.value }))
     }

     const SendContactForm = (e) => {
          e.preventDefault();
          if (message.name == "" || message.email == "" || message.message == "") return

          
     }

     return (
          <Box>
               <Box w='60%' m='auto' mt='20'>
                    <Box>
                         <Heading textAlign={'center'}>Contact Us</Heading>
                    </Box>
                    <form className='contact-form' onSubmit={SendContactForm}>
                         <Box mt='4'>
                              <Text>Name</Text>
                              <Input name='name' placeholder='Enter Your Name' onChange={HandleChange} />
                         </Box>
                         <Box mt='4'>
                              <Text>Email</Text>
                              <Input type='email' name='email' placeholder='Enter Your Email' onChange={HandleChange} />
                         </Box>
                         <Box mt='4'>
                              <Text>Message</Text>
                              <Textarea placeholder='Write something here...' name='message' onChange={HandleChange} />
                         </Box>
                         <Box mt='4' display={'flex'} justifyContent='flex-end'>
                              <Input type='submit' w='fit-content' className='BtnClickEffect' borderRadius={'20px'} value='Send Message' bg='red.500' color='white' fontSize={'1.2em'} />
                         </Box>
                    </form>
               </Box>
          </Box>
     )
}

export default Contact