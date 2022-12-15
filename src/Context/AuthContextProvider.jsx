import React, { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../Component/Firebase/firebase-config';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext) //* better way to write the useContext

const AuthContextProvider = ({ children }) => {
     const toast = useToast()
     const navigate = useNavigate()
     const [currentUser, setCurrentUser] = useState({})
     const [isAuth, setIsAuth] = useState(false)
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState("")

     console.log('currentUser: ', currentUser);

     //* signup with email and password
     const signup = async ({ email, password }) => {
          try {
               await createUserWithEmailAndPassword(auth, email, password);
          } catch (error) {
               setError(error.message)
          }
     }

     //* login with email and password
     const login = async ({ loginEmail, loginPassword }) => {
          try {
               await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
                    .then(res => { navigate("/"); showMsg("Login Success", 'success') })
          } catch (error) {
               setError(error.message);
          }
     }

     // *Logout user
     const logout = async () => { 
          try {
               await signOut(auth)
                    .then(res => showMsg("Successfully logout"));
          } catch (error) {
               setError(error.message)
          }

     }

     const showMsg = (msg, msgType) => {
          return toast({
               title: msg,
               position: 'top', variant: 'left-accent',
               status: msgType, isClosable: true,
          })
     }


     // *reset the password by giving email
     const resetPassword = async (email) => {
          setLoading(true)
          await sendPasswordResetEmail(auth, email) //* it will send the email to reset
     }

     useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
               setCurrentUser(user)
               if (currentUser?.email) setIsAuth(true)
               else setIsAuth(false)
               setError("")
               setLoading(false)
          })
          return unsubscribe;
     }, [currentUser])

     useEffect(() => {
          if (error != "") showMsg(error, 'error')
          else console.log('error: ', error);
     }, [error]);

     return (
          <AuthContext.Provider value={{ isAuth, signup, error, loading, login, logout, resetPassword, currentUser }}>
               {children}
          </AuthContext.Provider>
     )
}

export default AuthContextProvider