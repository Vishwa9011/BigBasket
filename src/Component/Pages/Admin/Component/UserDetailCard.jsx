import React from 'react'
import { IoClose } from 'react-icons/io5';
import { Box, Image, Button, Text } from '@chakra-ui/react'
import { isAdmin } from '@firebase/util';
const UserDetailCard = ({ setShowProfile, userProfile }) => {


     const { username, email, phone, gender, isActive, id, isAdmin, image } = userProfile


     return (

          <Box pos={'fixed'} w='450px' className='admin-detail-container'>
               <Box className='admin-detail'>
                    <Box mb='5'>
                         <Image src={image || '/admin-images/man.png'} alt='' boxSize={'150px'} borderRadius='50%' />
                    </Box>
                    <Box>
                         <Text>Id: </Text>
                         <Text color={'whiteAlpha.700'}>{id || "not updated"}</Text>
                    </Box>
                    <Box>
                         <Text>Name: </Text>
                         <Text>{username || "not updated"}</Text>
                    </Box>
                    <Box>
                         <Text>Email: </Text>
                         <Text>{email || "not updated"}</Text>
                    </Box>
                    <Box>
                         <Text>Gender:</Text>
                         <Text>{gender || "not updated"}</Text>
                    </Box>
                    <Box>
                         <Text>Phone Number: </Text>
                         <Text>{phone || "not updated"}</Text>
                    </Box>
                    <Box >
                         <Box display={'flex'} border='1px' borderStyle='dotted' p='2' borderRadius='6px' my='2'>
                              <Text>IsActive: </Text>
                              <Text ml='3' color={isAdmin ? 'green.500' : "red"}>{isActive ? 'Yes' : "No"}</Text>
                         </Box>
                         <Box display={'flex'} border='1px' borderStyle='dotted' p='2' borderRadius='6px' my='2'>
                              <Text>IsAdmin: </Text>
                              <Text ml='3' color={isAdmin ? 'green.500' : "red"}>{isAdmin ? 'Yes' : 'No'}</Text>
                         </Box>
                    </Box>
               </Box>
               <Box pos='absolute' top='-13px' right={'-13px'}>
                    <Button bg='red.500' minW={'30px'} m='0' className='BtnClickEffect' colorScheme={'red.600'} onClick={() => setShowProfile(v => !v)} _hover={{ background: "red.600" }} p='0' fontSize={'1.5em'} borderRadius={"50%"} h={'30px'} >
                         <IoClose />
                    </Button>
               </Box>
          </Box>

     )
}

export default UserDetailCard