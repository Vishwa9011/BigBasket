import axios from "axios";

export const PrevBtn = (sliderContainer) => {
     if (sliderContainer !== null) {
          const width = sliderContainer.current.clientWidth;
          sliderContainer.current.scrollLeft = sliderContainer.current.scrollLeft - width
          console.log(width)
     }
}
export const NextBtn = (sliderContainer) => {
     if (sliderContainer !== null) {
          const width = sliderContainer.current.clientWidth;
          sliderContainer.current.scrollLeft = sliderContainer.current.scrollLeft + width
          console.log(width)
     }
}

// *getting the data from server
export const getData = () => {
     return axios.get('/fruits')
          .then(res => res)
          .catch(err => console.log(err))
}