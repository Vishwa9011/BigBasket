import { AlertDialog, AlertDialogBody, Button, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, } from '@chakra-ui/react'
import React from 'react';

const Alert = ({ isOpen, onClose, totalPrice, CheckoutCart }) => {
     const cancelRef = React.useRef()

     const HandleCheckout = () => {
          CheckoutCart()
          onClose()
     }

     return (
          <>
               {/* <Button colorScheme='red' onClick={onOpen}>Delete Customer</Button> */}
               <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                    <AlertDialogOverlay>
                         <AlertDialogContent>
                              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                   Total : ₹{totalPrice}
                              </AlertDialogHeader>

                              <AlertDialogBody>
                                   Are you sure? You want to Checkout.
                              </AlertDialogBody>

                              <AlertDialogFooter>
                                   <Button ref={cancelRef} onClick={onClose}>
                                        Continue Shopping
                                   </Button>
                                   <Button colorScheme='red' onClick={HandleCheckout} ml={3}>
                                        Checkout
                                   </Button>
                              </AlertDialogFooter>
                         </AlertDialogContent>
                    </AlertDialogOverlay>
               </AlertDialog>
          </>
     )
}

export default Alert;