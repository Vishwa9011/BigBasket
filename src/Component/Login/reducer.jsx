
export const reducer = (state, action) => {

     switch (action.type) {
          case "USER_NAME":
               return { ...state, firstName: action.payload }
          case "LAST_NAME":
               return { ...state, lastName: action.payload }
          case 'EMAIL':
               return { ...state, email: action.payload }
          case 'PASSWORD':
               return { ...state, password: action.payload }
          case 'PHONE':
               return { ...state, phone: action.payload }
          case 'IMAGE':
               return { ...state, image: action.payload }
          default:
               return state;
     }
}

export const ActionType = {
     username: "USER_NAME",
     email: "EMAIL",
     password: "PASSWORD",
     phone: "PHONE",
     image: "IMAGE"
}