

export const FilterReducer = (state, action) => {
     switch (action.type) {
          case 'price':
               return { ...state, price: !state.price }
          case 'discount':
               return { ...state, discount: !state.discount }
          case 'brand':
               return { ...state, brand: !state.brand }
          default:
               return state;
     }
}


