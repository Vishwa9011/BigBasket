import { Box, Button, Text } from "@chakra-ui/react"

function MessageDeleteConfirmation() {
     const { isOpen, onToggle, onClose } = useDisclosure()

     return (
          <>
               <Box>
                    <Text>Delete Message</Text>
                    <Text>Are you sure? you want to delete this message.</Text>
                    <Box>
                         <Button>Confirm</Button>
                    </Box>
               </Box>
          </>
     )
}