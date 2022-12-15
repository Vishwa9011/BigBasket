import { Box, Grid, Heading, Image, ScaleFade } from '@chakra-ui/react';
import React from 'react'
import Buttons from '../component/Buttons';
import Navbar from '../Navbar/Navbar';
import Slider from '../Slider/MainSlider/Slider';
import ProductSlider from '../Slider/ProductSlider/ProductSlider';
import { bankoffer, beautyAndHygiene, beaverage, cleaningHousehold, fruitVegCard, offer, snacks, staples, } from '../component/exportData';
import Footer from '../Footer/Footer'
import CardMaker from '../component/CardMaker';
import GridCardMaker from '../component/GridCardMaker';
const Dashoboard = () => {
     return (
          <>
               {/* navbar */}
               <Navbar />

               {/* Slider */}
               <Slider />

               {/* buttons with Link */}
               <Buttons />

               {/*Bank OFfers */}
               <CardMaker data={bankoffer} heading="Bank Offers" />

               {/* productSlider */}
               <ProductSlider />

               {/* Offer */}
               {/* <OfferCard /> */}
               <CardMaker data={offer} heading="Top Offers" />

               {/* fruits and vegetables card */}
               <CardMaker data={fruitVegCard} heading="Fruits and Vegetables" />

               {/*statple=> rice  */}
               <CardMaker data={staples} heading="Your Daily Staples" />

               {/* beaverage */}
               <GridCardMaker data={beaverage} heading={"Beaverages"} />

               {/* snacks */}
               <CardMaker data={snacks} heading="Snacks Store" />

               {/* cleaning and household */}
               <CardMaker data={cleaningHousehold} heading={"Cleaning & Household"} />

               {/* beauty and hygiene */}
               <GridCardMaker data={beautyAndHygiene} heading={"Beauty and Hygiene"} />

               {/* Footer */}
               <Footer />
          </>
     )
}

export default Dashoboard