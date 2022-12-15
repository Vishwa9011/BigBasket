import { Box, Input, Select } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebase-config';

const CrudOperation = () => {
     const usersCollectionRef = collection(db, 'data/oil/oilData')
     const [formData, setFormData] = useState({});
     const [data, setData] = useState([]);

     console.log('data: ', data);

     console.log('formData: ', formData);

     const postData = async () => {
          await addDoc(usersCollectionRef, formData)
     }

     // const updateUser = async (id, email) => {
     //      const userDoc = doc(db, "users", id) //* to take a refernce of particular id
     //      const newFeilds = { email: email }; //* updating the particular element
     //      await updateDoc(userDoc, newFeilds);  //* function to update
     // }

     // const deleteUser = async (id) => {
     //      const userDoc = doc(db, "users", id);
     //      await deleteDoc(userDoc)
     // }

     useEffect(() => {
          const getUser = async () => {
               const data = await getDocs(usersCollectionRef)
               setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          }
          getUser()
     }, [])



     const HandleChange = (e) => {
          setFormData(prev => { return { ...prev, [e.target.name]: e.target.value } })
     }

     const HandleSubmit = (e) => {
          e.preventDefault()
          postData()
          e.target.reset()
          setFormData({})
     }

     return (
          <>
               <form onSubmit={HandleSubmit}>
                    <Box display={'flex'} flexDirection='column' gap='5' mt='10' pt='10' w='600px' m='auto'>
                         <Select onChange={HandleChange} name='type'>
                              <option>select</option>
                              {/* <option>fruits</option> */}
                              {/* <option>vegetables</option> */}
                              {/* <option>bakery</option> */}
                              <option>oil</option>
                         </Select>
                         <Select onChange={HandleChange} name='brand'>
                              <option>select</option>
                              <option>mama</option>
                              <option>borges</option>
                              <option>figaro</option>
                              <option>oleev</option>
                              <option>bb royal organic</option>
                              <option>del monte</option>
                              {/* <option>fresho</option> */}
                              {/* <option>falhari</option> */}
                         </Select>
                         <Input name='title' onChange={HandleChange} placeholder='Enter the title' w='600px' m='auto' />
                         <Input name='price' onChange={HandleChange} placeholder='Enter the price' w='600px' m='auto' />
                         <Input name='mrp' onChange={HandleChange} placeholder='Enter the mrp' w='600px' m='auto' />
                         <Input name='discount' onChange={HandleChange} placeholder='Enter the discount' w='600px' m='auto' />
                         <Input name='select_qty' onChange={HandleChange} placeholder='Enter the price/qty' w='600px' m='auto' />
                         <Select onChange={HandleChange} name='unit'>
                              <option>select</option>
                              <option>kg</option>
                              <option>g</option>
                              <option>pc</option>
                              <option>pack</option>
                              <option>l</option>
                         </Select>
                         <Input name='image' onChange={HandleChange} placeholder='Enter the image' w='600px' m='auto' />
                         <Input name='image1' onChange={HandleChange} placeholder='Enter the image1' w='600px' m='auto' />
                         <Input type={'submit'} placeholder='Enter the discount' w='600px' m='auto' />
                    </Box>
               </form>
          </>
     )
}

export default CrudOperation