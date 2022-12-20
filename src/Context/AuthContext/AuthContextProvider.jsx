import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../../Component/Firebase/firebase-config';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../Component/Firebase/firebase-config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useToast } from '@chakra-ui/react';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext) //* better way to write the useContext

const AuthContextProvider = ({ children }) => {
     const toast = useToast()
     const navigate = useNavigate()
     const location = useLocation()
     const [error, setError] = useState("")
     const [loading, setLoading] = useState(true);
     const [currentUser, setCurrentUser] = useState({})
     const [currentUserDetail, setCurrentUserDetail] = useState({})
     var isAuth = useState(JSON.parse(localStorage.getItem('isAuth')) || false)
     console.log('isAuth: ', isAuth);

     //* signup with email and password
     const signup = ({ email, password }) => {
          setLoading(true)
          // * signup and the user in database
          createUserWithEmailAndPassword(auth, email, password)
               .then(({ user }) => {
                    // * making one more request to store the data into the firestordatabase
                    const userRef = doc(db, 'users', user.uid);
                    setDoc(userRef, { email, password, isAdmin: false, isActive: true }).then(() => {
                         setLoading(false)
                         navigate("/", "/")
                         localStorage.setItem('isAuth', true);
                         showMsg("Successfully Registered", 'success')
                    })
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
               .then((userCredential) => {
                    console.log('userCredential: ', userCredential);
                    const userRef = doc(db, 'users', userCredential.user.uid);
                    setLoading(false)
                    showMsg("Login Success", 'success')
                    localStorage.setItem('isAuth', true);
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
               // * tell that user is not active anymore
               const userRef = doc(db, 'users', currentUser.uid)
               setDoc(userRef, { ...currentUserDetail, isActive: false }).then(() => {
                    setLoading(false)
                    localStorage.removeItem('isAuth')
                    showMsg("Successfully logout")
               }).catch(err => console.log(err))
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
               setLoading(false)
               setError("")
          })

          // * to get the info of user
          if (currentUser?.uid) {
               const userRef = doc(db, 'users', currentUser?.uid);
               getDoc(userRef).then(res => {
                    const data = res.data();
                    setCurrentUserDetail({ ...data })
               })
          }

          //* cleanup function
          return unsubscribe; 


     }, [currentUser])



     useEffect(() => {
          if (currentUser?.uid) {
               const userRef = doc(db, 'users', currentUser?.uid);
               setDoc(userRef, { ...currentUserDetail, isActive: true })
                    .then(() => {
                         showMsg("Status update", 'success');
                    }).catch(err => console.log(err))
          }
     }, [currentUserDetail])


      // * if you are inside the cart and you reload the page the it will login you
     //  * to know what was you previous rout
     // useEffect(() => {
     //      if (location.state) {
     //           setTimeout(() => {
     //                if (currentUser) return navigate(`/${location.state}`, `${location.state}`)
     //           }, 2000)
     //      }
     // }, [currentUser])

     return (
          <AuthContext.Provider value={{ currentUserDetail, setCurrentUserDetail, signup, error, loading, login, logout, resetPassword, currentUser }}>
               {children}
          </AuthContext.Provider>
     )
}

export default AuthContextProvider