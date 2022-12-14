import { Box, Heading, Image } from '@chakra-ui/react'
import React from 'react'

const bankoffer = [
     'https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/79e284b5-4eb8-4e08-b32f-de87a6dcb369/51aad6de-a6a3-4c76-a073-eeb0915e8f14/t1_hp_aff_m_bob_360_101222.jpg?tr=w-1920,q=80',
     'https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/79e284b5-4eb8-4e08-b32f-de87a6dcb369/51aad6de-a6a3-4c76-a073-eeb0915e8f14/t1_hp_aff_m_onecard_360_101222.jpg?tr=w-1920,q=80',
     'https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/79e284b5-4eb8-4e08-b32f-de87a6dcb369/51aad6de-a6a3-4c76-a073-eeb0915e8f14/t1_hp_aff_m_IndusInd_360_101222.jpg?tr=w-1920,q=80',
     'https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/79e284b5-4eb8-4e08-b32f-de87a6dcb369/51aad6de-a6a3-4c76-a073-eeb0915e8f14/t1_hp_aff_m_dbs_360_101222.jpg?tr=w-1920,q=80'
]


const BankOfferCard = () => {
     return (
          <>
               <Box>
                    <Box w='90%' mx='auto' my='10'>
                         <Heading my='4'>Bank Offers</Heading>
                         <Box display='flex' gap='10'>
                              {bankoffer?.map((el, i) => (
                                   <Box key={i} className='offerCard'>
                                        <Image src={el} alt="" title='Bank Offer' className='scaleOfferImage' />
                                   </Box>
                              ))}
                         </Box>
                    </Box>
               </Box>
          </>
     )
}

export default BankOfferCard