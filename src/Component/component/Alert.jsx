import { AlertDialog, AlertDialogBody, Button, Text, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, } from '@chakra-ui/react'
import React from 'react';

const Alert = ({ isOpen, onClose, totalPrice, BtnText, msg, data = "", text, execution }) => {
     const cancelRef = React.useRef() 
     const HandleCheckout = () => {
          execution()
          onClose()
     }

     return (
          <>
               {/* <Button colorScheme='red' onClick={onOpen}>Delete Customer</Button> */}
               <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                    <AlertDialogOverlay>
                         <AlertDialogContent>
                              {totalPrice ? 
                                   <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                        Total : ₹{totalPrice}
                                   </AlertDialogHeader>
                                   :
                                   <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                        {text}
                                   </AlertDialogHeader>
                              }

                              <AlertDialogBody>
                                   {msg} {(data ? (<Text as='span' fontWeight='semibold'>{data.name || data.email}</Text>) : "")}.
                              </AlertDialogBody>

                              <AlertDialogFooter>
                                   <Button ref={cancelRef} onClick={onClose}>
                                        Cancel
                                   </Button>
                                   <Button colorScheme='red' onClick={HandleCheckout} ml={3}>
                                        {BtnText}
                                   </Button>
                              </AlertDialogFooter>
                         </AlertDialogContent>
                    </AlertDialogOverlay>
               </AlertDialog>
          </>
     )
}

export default Alert;