import axios from 'axios';
import React from 'react';


export const PostData = (state) => {
     axios.post(`https://bigbasketdatabase-default-rtdb.firebaseio.com/user.json`, state)
          .then(res => console.log(res))
          .catch(err => console.log(err))
}
