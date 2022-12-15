import React, { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../Component/Firebase/firebase-config';


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext) //* better way to write the useContext

const AuthContextProvider = ({ children }) => {

     const [currentUser, setCurrentUser] = useState({})
     const [loading, setLoading] = useState(false);
     const [msg, setMsg] = useState({ msg: '', msgType: "", description: "" })
     const [error, setError] = useState("")
     console.log('currentUser: ', currentUser);

     //* signup with email and password
     const signup = async ({ email, password }) => {
          try {
               await createUserWithEmailAndPassword(auth, email, password);
               setMsg({ msg: "Successfully Registered", msgType: "success" })
          } catch (error) {
               console.log('error: ', error.message);
               setMsg({ msg: "Unable to Register!", msgType: 'warning', description: "Please Try again." })
          }
     }

     //* login with email and password
     const login = async ({ loginEmail, loginPassword }) => {
          try {
               await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
               setMsg({ msg: "Successfully Login", msgType: "success" })
          } catch (error) {
               console.log('error: ', error.message);
               setMsg({ msg: "Unable to login!", msgType: 'danger', description: "check the credentitials" })
          }
     }

     // *Logout user
     const logout = async () => {
          await signOut(auth)
          setMsg({ msg: "Successfully Signout", msgType: "success" })
     }

     // *reset the password by giving email
     const resetPassword = async (email) => {
          await auth.sendPasswordResetEmail(email) //* it will send the email to reset
     }

     useEffect(() => {
          onAuthStateChanged(auth, (user) => {
               setCurrentUser(user)
          })
          setMsg({ msg: "Welcome In BigBasket", msgType: "success" })
     }, [])


     return (
          <AuthContext.Provider value={{ msg, signup, login, logout, resetPassword, currentUser }}>
               {children}
          </AuthContext.Provider>


     )
}

export default AuthContextProvider