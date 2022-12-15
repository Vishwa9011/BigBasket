import React from 'react'

const CrudOperation = () => {
     const postData = async () => {
          await addDoc(usersCollectionRef, state)
     }

     const updateUser = async (id, email) => {
          const userDoc = doc(db, "users", id) //* to take a refernce of particular id
          const newFeilds = { email: email }; //* updating the particular element
          await updateDoc(userDoc, newFeilds);  //* function to update
     }

     const deleteUser = async (id) => {
          const userDoc = doc(db, "users", id);
          await deleteDoc(userDoc)
     }

     console.log(users)
     useEffect(() => {
          const getUser = async () => {
               const data = await getDocs(usersCollectionRef)
               setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          }
          getUser()
     }, [])

     return (
          <div>CrudOperation</div>
     )
}

export default CrudOperation