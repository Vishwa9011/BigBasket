import { Box, Heading, Text, Button, Center } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export default function PageNotFound() {
     return (
          <Box textAlign="center" h='100%' w='100%'>
               <Center h='100vh' display={'flex'} flexDirection='column' s>
                    <Heading display="inline-block" as="h2" size="2xl" bgGradient="linear(to-r, red.500, red.400, red.600)" backgroundClip="text">
                         404
                    </Heading>

                    <Text fontSize="18px" mt={3} mb={2}>
                         Page Not Found
                    </Text>

                    <Text color={'gray.500'} mb={6}>
                         The page you're looking for does not seem to exist
                    </Text>

                    <NavLink to='/' state={'/'}>
                         <Button colorScheme="red.500" className='BtnClickEffect' bgGradient="linear(to-r, red.500, red.400, red.600)" color="white" variant="solid">
                              Go to Home
                         </Button>
                    </NavLink>
               </Center>
          </Box>
     );
}