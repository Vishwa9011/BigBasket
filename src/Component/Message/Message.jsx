import React, { useEffect, useState } from 'react';
import { Box, Center, Text } from '@chakra-ui/react';
import { IoClose } from 'react-icons/io5'
import { GoAlert } from 'react-icons/go'
import { FaCheckCircle } from 'react-icons/fa'

import './message.css';

const type = {
     success: <FaCheckCircle />,
     primary: <FaCheckCircle />,
     danger: <GoAlert />,
     warning: <GoAlert />,
}

export const Message = ({ msgType, msg, description }) => {
     // const toast = useToast()
     return (
          <>

               {/* (<Box className={`alertMessage ${msgType} active`}>
                    <Box pos='relative' className='flex' justifyContent={'space-between'} w='100%' p='3'>
                         <Box fontSize={'1.6em'}>{type[msgType]}</Box>
                         <Box color='black' ml='5' flex={1} justifyContent={'flex-start'}>
                              <Text fontSize='1.3em'>{msg}</Text>
                              {description && <Text fontSize={'.9em'}>{description}</Text>}
                         </Box>
                         <Box className='strokeline'></Box>

                         <Box>
                              <Box pos={'absolute'} className='msgLine'></Box>
                         </Box>
               </Box>
          </Box>) */}


          </>
     )

}
