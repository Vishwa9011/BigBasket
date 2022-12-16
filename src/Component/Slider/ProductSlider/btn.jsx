import axios from "axios";

export const PrevBtn = (sliderContainer) => {
     if (sliderContainer !== null) {
          const width = sliderContainer.current.clientWidth;
          sliderContainer.current.scrollLeft = sliderContainer.current.scrollLeft - width
          console.log('width: ', width);
     }
}
export const NextBtn = (sliderContainer) => {
     if (sliderContainer !== null) {
          const width = sliderContainer.current.clientWidth;
          sliderContainer.current.scrollLeft = sliderContainer.current.scrollLeft + width
          console.log('width: ', width);
     }
}

// // *getting the data from server
export const getData = () => {

}