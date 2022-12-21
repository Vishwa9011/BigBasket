
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
     console.log('data: ', data);
     return data?.reduce((start, item) => {
          return start + (+item.price * (+item.selected_qty_purchase));
     }, 0)
}

// * to calculate the total savings
export const calcTotalSavings = (data) => {
     return calcTotalMrp(data) - calcTotalPrice(data);
}

// * to calculate the total mrp
const calcTotalMrp = (data) => {
     return data?.reduce((start, item) => {
          return start + (+item.mrp * (+item.selected_qty_purchase));
     }, 0)
}

// * to calculate total item in cart
export const calcTotalItem = (data) => {
     return data?.reduce((start, item) => {
          return start + (+item.selected_qty_purchase)
     }, 0)
}


// * Sort data based on price
export const FilterPrice = (data, value) => {
     var temp = [];

     if (value['200'])
          temp = data.filter((el) => el.price >= 200)
     else if (value['199'])
          temp = data.filter((el) => el.price <= 199)
     else if (value['100'])
          temp = data.filter((el) => el.price <= 99)
     else if (value['50'])
          temp = data.filter((el) => el.price <= 49)

     if (value.lowTohigh) {
          temp = (temp.length ? temp : data).sort((a, b) => a.price - b.price);
     } else if (value.highTolow)
          temp = (temp.length ? temp : data).sort((a, b) => b.price - a.price);

     return temp;
}


// * filtering discount
export const FilterDiscount = (data, value) => {
     var temp = [];
     if (value['25'])
          temp = data.filter((el) => el.discount >= 25);
     if (value['24'])
          temp = data.filter((el) => el.discount <= 24);
     if (value['15'])
          temp = data.filter((el) => el.discount <= 14);

     return temp;
}

// * filtering brand
export const FilterBrand = (data, value) => {
     return data.filter((el) => el.brand === value)
}
