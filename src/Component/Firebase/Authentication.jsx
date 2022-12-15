import { Box, Button, Center, Heading, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './firebase-config'
const Authentication = () => {

     const [user, setUser] = useState({})
     console.log('user: ', user?.email);
     const [registerEmail, setRegisterEmail] = useState("")
     const [registerPass, setRegisterPass] = useState("")
     const [loginEmail, setLoginEmail] = useState("")
     const [loginPass, setLoginPass] = useState("")


     const Register = async () => {
          try {
               const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPass);
          } catch (error) {
               console.log('error: ', error.message);
          }

     }

     const login = async () => {
          try {
               await signInWithEmailAndPassword(auth, loginEmail, loginPass)
          } catch (error) {
               console.log('error: ', error.message);
          }
     }

     const logout = async () => {
          await signOut(auth)
     }


     useEffect(() => {
          // todo whenever page load it will tell the user if he logedin
          onAuthStateChanged(auth, (currentUser) => {
               setUser(currentUser)
          })
     }, [])

     return (
          <Box w='80%' m='auto' my='100'>
               <Heading>Register here</Heading>
               <Box display='flex' my='5'>
                    <Input type='email' placeholder='email' onChange={e => setRegisterEmail(e.target.value)} />
                    <Input type='password' placeholder='password' onChange={e => setRegisterPass(e.target.value)} />
                    <Button onClick={Register}>Signup</Button>
               </Box>
               <Heading>Login here</Heading>
               <Box display='flex' my='5'>
                    <Input type='email' placeholder='email' onChange={e => setLoginEmail(e.target.value)} />
                    <Input type='password' placeholder='password' onChange={e => setLoginPass(e.target.value)} />
                    <Button onClick={login}>Login</Button>
               </Box>

               <Heading>Email: {user?.email}</Heading>

               <Button onClick={logout}>Logout</Button>
          </Box>
     )
}

export default Authentication