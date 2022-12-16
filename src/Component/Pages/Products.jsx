import { Box, Heading, Image, ListItem, Text, List, Checkbox, Grid } from '@chakra-ui/react';
import React, { useEffect, useReducer, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/firebase-config';
import { IoMdAdd } from 'react-icons/io'
import { FilterReducer } from './Helper';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Card from '../Card/Card';
import './product.css'

const param = {
     fruits: "fruits",
     vegetables: "vegetables",
     foodgrain_oil_masala: "oil",
     bakery_cakes_dairy: "bakery"
}
const inititalState = { brand: false, discount: false, price: false }

const Products = () => {

     const { id } = useParams();
     var tempParam = param[id.trim()]
     const [data, setData] = useState([])
     const [brandNames, setBrandNames] = useState([])
     const usersCollectionRef = collection(db, `data/${tempParam}/${tempParam}Data`)
     const [showFilter, filterDispatch] = useReducer(FilterReducer, inititalState)
     console.log('brandNames: ', brandNames);


     const HandleBrandChange = (e) => {
          console.log('e: ', e)
     }

     const HandlePriceFilter = (value) => {
          console.log(value)
     }

     useEffect(() => {
          const getData = async () => {
               const res = await getDocs(usersCollectionRef)
               setData(res.docs.map(doc => ({ ...doc.data(), id: doc.id }))) //*setting the data
          }
          getData()
     }, [id])

     useEffect(() => {
          const temp = [];
          data.forEach((data) => {
               if (!temp.includes(data.brand)) {
                    temp.push(data.brand)
               }
          })
          setBrandNames(temp)
     }, [data])

     return (
          <>
               <Navbar />
               <Box w='100%'>
                    <Box w='92%' m='auto'>
                         <Box className='main-container' >
                              <Box className='header'>
                                   <Text pt='4' pb='10' cursor={'pointer'}>🏠 Home / {id}</Text>
                                   <Box display='flex'>
                                        <Image src='https://www.bigbasket.com/media/uploads/flatpages/test-1/Fruits%20&%20vegetables.jpg' alt='' w='100%' />
                                   </Box>
                              </Box>
                              <Box display='flex' pos='relative' justifyContent='space-between' my='10'>
                                   <Box className='sidebar' w='20%' h='100vh' overflowY={'scroll'}>
                                        <Text className='filterText'>Filter</Text>
                                        <List className='FilterList'>
                                             <ListItem>
                                                  <Box>
                                                       <Text>Shop by category</Text>
                                                  </Box>
                                                  <List className='filterBycategory'>
                                                       <ListItem>
                                                            <NavLink className={({ isActive }) => (isActive ? "activeLink" : "")} to='/products/fruits'>Fresh Fruits</NavLink>
                                                       </ListItem>
                                                       <ListItem>
                                                            <NavLink className={({ isActive }) => (isActive ? "activeLink" : "")} to='/products/vegetables'>Fresh Vegetables</NavLink>
                                                       </ListItem>
                                                       <ListItem>
                                                            <NavLink className={({ isActive }) => (isActive ? "activeLink" : "")} to='/products/foodgrain_oil_masala'>Oils</NavLink>
                                                       </ListItem>
                                                       <ListItem>
                                                            <NavLink className={({ isActive }) => (isActive ? "activeLink" : "")} to='/products/bakery_cakes_dairy'>Bakery</NavLink>
                                                       </ListItem>
                                                  </List>
                                             </ListItem>
                                             <ListItem>
                                                  <Box onClick={() => filterDispatch({ type: "brand" })}>
                                                       <Text>Brand</Text>
                                                       <Text><IoMdAdd /></Text>
                                                  </Box>
                                                  {showFilter.brand && <Box className='filteringList'>
                                                       {brandNames.map((brand, i) => (
                                                            <Checkbox key={i} onChange={e => HandleBrandChange({ [brand]: e.target.checked })}>{brand}</Checkbox>
                                                       ))}
                                                  </Box>}
                                             </ListItem>
                                             <ListItem>
                                                  <Box onClick={() => filterDispatch({ type: "price" })}>
                                                       <Text>Prices</Text>
                                                       <Text><IoMdAdd /></Text>
                                                  </Box>
                                                  {showFilter.price && <Box className='filteringList'>
                                                       <Checkbox onChange={e => HandlePriceFilter({ filterPrice: e.target.checked })}>Low to High</Checkbox>
                                                       <Checkbox onChange={e => HandlePriceFilter({ filterPrice: e.target.checked })}>High to Low</Checkbox>
                                                       <Checkbox onChange={e => HandlePriceFilter({ filterPrice: e.target.checked })}>Less than ₹50</Checkbox>
                                                       <Checkbox onChange={e => HandlePriceFilter({ filterPrice: e.target.checked })}>Less than ₹100</Checkbox>
                                                       <Checkbox onChange={e => HandlePriceFilter({ filterPrice: e.target.checked })}>Less than ₹200</Checkbox>
                                                       <Checkbox onChange={e => HandlePriceFilter({ filterPrice: e.target.checked })}>More than ₹200</Checkbox>
                                                  </Box>}
                                             </ListItem>
                                             <ListItem>
                                                  <Box onClick={() => filterDispatch({ type: "discount" })}>
                                                       <Text>Discount</Text>
                                                       <Text><IoMdAdd /></Text>
                                                  </Box>
                                                  {showFilter.discount && <Box className='filteringList'>
                                                       <Checkbox >Less than 15%</Checkbox>
                                                       <Checkbox >Less than 25%</Checkbox>
                                                       <Checkbox >More than 25%</Checkbox>
                                                  </Box>}
                                             </ListItem>
                                        </List>

                                   </Box>
                                   <Box className='product-container' w='80%' p='2' overflowY={'scroll'}>
                                        {/* card */}
                                        <Text textTransform={'capitalize'} fontWeight='semibold' py='2' fontSize={'2.5em'}>{tempParam}</Text>
                                        <Grid w='100%' templateColumns={{ sm: 'repeat(2,1fr)', md: 'repeat(3,1fr)' }} gap='5' >

                                             {data?.map((el) => (
                                                  <Box w='100%' key={el.id} h='430px' className='product-card'>
                                                       <Card data={el} />
                                                  </Box>
                                             ))}
                                        </Grid>
                                   </Box>
                              </Box>
                         </Box>
                    </Box>
               </Box>

               <Footer />
          </>
     )
}

export default Products