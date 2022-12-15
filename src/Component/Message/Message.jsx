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
     return (
          msg.msg && (<Box className={`alertMessage ${msgType} active`} p='3' >
               <Box fontSize={'1.7em'}>{type[msgType]}</Box>
               <Box fontSize='1.4em' color='black'>
                    <Text>{msg}</Text>
                    {description && <Text>{description}</Text>}
               </Box>
               <Box className='BtnClickEffect' borderRadius='5px' fontSize={'1.7em'} cursor='pointer' onClick={() => setShowAlert(false)} >
                    <IoClose />
               </Box>
          </Box>)
     )

}
