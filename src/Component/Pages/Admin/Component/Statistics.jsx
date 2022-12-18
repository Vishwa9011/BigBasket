import React from 'react'
import { Box, Text, Image } from '@chakra-ui/react'
import { useAdminProvider } from '../../../../Context/AdminProvider/AdminProvider'
const Statistics = () => {
     const { FindActiveUser, AllOrderData, userDataGlobal } = useAdminProvider()


     return (
          <Box className='admin-statistics'>
               <Box>
                    <Box>
                         <Text fontSize={'1.2em'} fontWeight='semibold'>Active Users</Text>
                         <Text fontSize={'2em'}>{FindActiveUser(userDataGlobal)?.activeUserCount}</Text>
                    </Box>
                    <Box >
                         <Image src='/admin-images/adminuser.png' className='admin-userImage' />
                    </Box>
               </Box>
               <Box>
                    <Box>
                         <Text fontSize={'1.2em'} fontWeight='semibold'>Orders</Text>
                         <Text fontSize={'2em'}>{AllOrderData?.length}</Text>
                    </Box>
                    <Box>
                         <Image src='/admin-images/order2.png' />
                    </Box>
               </Box>
               <Box>
                    <Box>
                         <Text fontSize={'1.2em'} fontWeight='semibold'>Users</Text>
                         <Text fontSize={'2em'}>{userDataGlobal?.length}</Text>
                    </Box>
                    <Box>
                         <Image src='/admin-images/data-analysis.png' />
                    </Box>
               </Box>
          </Box>

     )
}

export default Statistics