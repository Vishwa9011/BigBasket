
import React, { useEffect } from 'react';
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


// * to calculate the total price
export const calcTotalPrice = (data) => {
     return data?.reduce((start, item) => {
          return start + (+item.price);
     }, 0)
}

// * to calculate the total savings
export const calcTotalSavings = (data) => {
     return calcTotalMrp(data) - calcTotalPrice(data);
}

// * to calculate the total mrp
const calcTotalMrp = (data) => {
     return data?.reduce((start, item) => {
          return start + (+item.mrp);
     }, 0)
}
