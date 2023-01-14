import { Modal, ModalOverlay, ModalContent, Button, Box, Text, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Image } from '@chakra-ui/react';

import React from 'react';
import { useGlobal } from './../../../../Context/GlobalDataProvider/GlobalProvider';

export function ReadMessage({ isOpen, onClose, msg, image, gender }) {

     const { capitalize } = useGlobal()

     const Overlay = () => (
          <ModalOverlay
               bg='transparent'
               backdropFilter='auto'
               backdropBlur='4px'
          />
     )

     return (
          <>
               <Modal isCentered isOpen={isOpen} onClose={onClose}>
                    {isOpen && <Overlay />}
                    <ModalContent bg='gray.100' pt='3'>
                         <ModalCloseButton />
                         <ModalBody>
                              <Box>
                                   <Box display={'flex'} justifyContent='flex-start' alignItems={'center'}>
                                        <Box>
                                             {(image || gender) ? <Image src={image || (gender === 'male' ? `/admin-images/man.png` : gender == 'female' ? '/admin-images/woman.png' : "")} alt='' boxSize={"40px"} borderRadius='50%' />
                                                  :
                                                  <Image src='https://static.thenounproject.com/png/55168-200.png' alt='' boxSize={"40px"} filter={'invert(70%)'} />
                                             }
                                        </Box>
                                        <Box ml='3'>
                                             <Text>{capitalize(msg?.name, "*")}</Text>
                                             <Text fontWeight={'semibold'} cursor='pointer' _hover={{ textDecoration: "underline" }}>{msg?.email}</Text>
                                        </Box>
                                   </Box>
                                   <Box my='2'>
                                        <Text my='2' fontWeight={'semibold'} fontSize='1.2em'>Message</Text>
                                        <Text className='admin-read-message'>{capitalize(msg?.message, "#")}</Text>
                                   </Box>
                              </Box>
                         </ModalBody>
                         <ModalFooter>
                              <Button onClick={onClose} color='white' className='BtnClickEffect' bg='red.500' _hover={{ background: "red.600" }}>Close</Button>
                         </ModalFooter>
                    </ModalContent>
               </Modal>
          </>
     )
}