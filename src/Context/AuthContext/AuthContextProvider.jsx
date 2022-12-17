import React, { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../Component/Firebase/firebase-config';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../Component/Firebase/firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { useToast } from '@chakra-ui/react';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext) //* better way to write the useContext

const AuthContextProvider = ({ children }) => {
     const toast = useToast()
     const navigate = useNavigate()
     const location = useLocation()
     const [error, setError] = useState("")
     const [isAuth, setIsAuth] = useState(false)
     const [loading, setLoading] = useState(true);
     const [isAdmin, setIsAdmin] = useState(false)
     const [currentUser, setCurrentUser] = useState({})

     //* signup with email and password
     const signup = ({ email, password }) => {
          setLoading(true)
          // * signup and the user in database
          createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
               console.log('user: ', user.email, "user uid", user.uid);
               // * making one more request to store the data into the firestordatabase
               const userRef = doc(db, 'users', user.uid);
               setDoc(userRef, { email, password }).then(() => {
                    setLoading(false)
                    showMsg("Successfully Registered", 'success')
                    navigate("/", "/")
               }).catch(err => console.log("err add doc", err))
          }).catch(error => {
               setLoading(false)
               if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
                    showMsg("Email already exist.", 'error')
               } else if (error.message == 'Firebase: Error (auth/invalid-email).') {
                    showMsg("Please fill correct Email Id", 'error')
               } else if (error.message == 'Password should be at least 6 characters (auth/weak-password).') {
                    showMsg("Password should be at least 6 characters", error)
               }
          })
     }

     //* login with email and password
     const login = ({ loginEmail, loginPassword }) => {
          setLoading(true)
          // *request to login
          signInWithEmailAndPassword(auth, loginEmail, loginPassword)
               .then(res => {
                    setLoading(false)
                    showMsg("Login Success", 'success')
                    navigate("/", "/");
               })
               .catch((error) => {
                    setLoading(false)
                    showMsg(error.message, 'error');
               })
     }

     // *Logout user
     const logout = () => {
          setLoading(true)
          signOut(auth).then(res => {
               setLoading(false)
               showMsg("Successfully logout")
          }).catch(error => {
               setLoading(false)
               showMsg(error.message, 'error')
          })
     }

     //* toast function to make toast msg inside auth
     const showMsg = (msg, msgType) => {
          return toast({
               title: msg,
               position: 'top', variant: 'left-accent',
               status: msgType, isClosable: true,
          })
     }

     // *reset the password by giving email
     const resetPassword = (email) => {
          setLoading(true)
          //* it will send the email to reset
          sendPasswordResetEmail(auth, email).then(() => {
               setLoading(false);
               showMsg("Reset Email has been sent", 'success');
          }).catch(error => {
               setLoading(false)
          })
     }

     useEffect(() => {
          setLoading(true)
          const unsubscribe = onAuthStateChanged(auth, (user) => {
               setCurrentUser(user)
               if (currentUser?.email) {
                    setIsAuth(true)
               } else setIsAuth(false)
               setLoading(false)
               setError("")
          })

          if (currentUser?.email === 'vishu842301@gmail.com') {
               setIsAdmin(true)
          }

          //* cleanup function
          return unsubscribe; 
     }, [currentUser])

      // * if you are inside the cart and you reload the page the it will login you
     useEffect(() => {
          if (location.state == 'cart') {
               setTimeout(() => {
                    if (currentUser) return navigate(`/${location.state}`, { state: "cart" })
               }, 2000)
          }
     }, [])

     return (
          <AuthContext.Provider value={{ isAdmin, isAuth, signup, error, loading, login, logout, resetPassword, currentUser }}>
               {children}
          </AuthContext.Provider>
     )
}

export default AuthContextProvider