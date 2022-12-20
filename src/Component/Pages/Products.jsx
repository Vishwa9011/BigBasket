import { Box, Image, ListItem, Text, List, Checkbox, Grid } from '@chakra-ui/react';
import React, { useEffect, useReducer, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { useParams, NavLink } from 'react-router-dom'
import { db } from '../Firebase/firebase-config';
import { BiMinus } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io';
import { FilterBrand, FilterDiscount, FilterPrice, FilterReducer } from './Helper';
import Loader from '../component/Loader';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Card from '../Card/Card';
import './product.css';

const param = {
     fruits: "fruits",
     vegetables: "vegetables",
     foodgrain_oil_masala: "oil",
     bakery_cakes_dairy: "bakery"
}
// * price filter
const initialPriceFilter = {
     highTolow: false, lowTohigh: false, '50': false, '100': false, '199': false, '200': false
}
// * discount filter
const initialDiscountFilter = {
     '15': false,
     '24': false,
     '25': false
}

const inititalState = { brand: false, discount: false, price: false }

const Products = () => {

     const { id } = useParams();
     var tempParam = param[id.trim()]
     const [data, setData] = useState([])
     const [filtered, setFiltered] = useState([])
     const [loading, setLoading] = useState(false);
     const [brandNames, setBrandNames] = useState([]);
     const [showFilterData, setShowFilter] = useState(false)
     const [showFilter, filterDispatch] = useReducer(FilterReducer, inititalState)
     const usersCollectionRef = collection(db, `data/${tempParam}/${tempParam}Data`)

     const HandleBrandChange = (value) => {
          setFiltered(FilterBrand(data, value))
          setShowFilter(true);
     }

     const HandleDiscountFilter = (value) => {
          setFiltered(FilterDiscount(data, value));
          setShowFilter(true);
     }

     const HandlePriceFilter = (value) => {
          setFiltered(FilterPrice(data, value))
          setShowFilter(true);
     }

     useEffect(() => {
          setLoading(true)
          const getData = () => {
               getDocs(usersCollectionRef).then((res) => {
                    setData(res.docs.map(doc => ({ ...doc.data(), id: doc.id }))) //*setting the data
                    setLoading(false);
                    setShowFilter(false);
               })
          }
          getData()
     }, [id])

     useEffect(() => {
          if (data.length) {
               const temp = {};
               const arrayOfBrand = [];
               data.forEach((val) => {
                    if (!temp[val.brand]) {
                         temp[val.brand] = 1;
                         arrayOfBrand.push(val.brand)
                    }
               })
               setBrandNames(arrayOfBrand);
          }
     }, [data])

     return (
          <>
               {loading && < Loader />}
               <Navbar />
               <Box w='100%'>
                    <Box w='92%' m='auto'>
                         <Box className='main-container' >
                              <Box className='header'>
                                   <Text pt='4' pb='10' cursor={'pointer'}>🏠 <NavLink to='/' state='/'><Text _hover={{ textDecoration: "underline" }} as='span'>Home</Text></NavLink> / {id}</Text>
                                   <Box display='flex'>
                                        <Image src='https://www.bigbasket.com/media/uploads/flatpages/test-1/Fruits%20&%20vegetables.jpg' alt='' w='100%' />
                                   </Box>
                              </Box>
                              <Box display='flex' flexDirection={['column', 'row', 'row', 'row']} pos='relative' justifyContent='space-between' my='10'>
                                   <Box className='sidebar' w={{ base: "100%", sm: "40%", md: '20%' }} h={['', '', '100vh']} overflowY={'scroll'}>
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
                                                       <Text>{showFilter.brand ? <BiMinus /> : <IoMdAdd />}</Text>
                                                  </Box>
                                                  {showFilter.brand && <Box className='filteringList'>
                                                       {brandNames.map((brand, i) => (
                                                            <Checkbox key={i} onChange={e => HandleBrandChange(brand)}>{brand}</Checkbox>
                                                       ))}
                                                  </Box>}
                                             </ListItem>
                                             <ListItem>
                                                  <Box onClick={() => filterDispatch({ type: "price" })}>
                                                       <Text>Prices</Text>
                                                       <Text>{showFilter.price ? <BiMinus /> : <IoMdAdd />}</Text>
                                                  </Box>
                                                  {showFilter.price && <Box className='filteringList'>
                                                       <Checkbox onChange={e => HandlePriceFilter({ ...initialPriceFilter, 'lowTohigh': e.target.checked })}>Low to High</Checkbox>
                                                       <Checkbox onChange={e => HandlePriceFilter({ ...initialPriceFilter, 'highTolow': e.target.checked })}>High to Low</Checkbox>
                                                       <Checkbox onChange={e => HandlePriceFilter({ ...initialPriceFilter, '50': e.target.checked })}>Less than ₹50</Checkbox>
                                                       <Checkbox onChange={e => HandlePriceFilter({ ...initialPriceFilter, '100': e.target.checked })}>Less than ₹100</Checkbox>
                                                       <Checkbox onChange={e => HandlePriceFilter({ ...initialPriceFilter, '199': e.target.checked })}>Less than ₹200</Checkbox>
                                                       <Checkbox onChange={e => HandlePriceFilter({ ...initialPriceFilter, '200': e.target.checked })}>More than ₹200</Checkbox>
                                                  </Box>}
                                             </ListItem>
                                             <ListItem>
                                                  <Box onClick={() => filterDispatch({ type: "discount" })}>
                                                       <Text>Discount</Text>
                                                       <Text>{showFilter.discount ? <BiMinus /> : <IoMdAdd />}</Text>
                                                  </Box>
                                                  {showFilter.discount && <Box className='filteringList'>
                                                       <Checkbox onChange={e => HandleDiscountFilter({ ...initialDiscountFilter, '15': e.target.checked })}>Less than 15%</Checkbox>
                                                       <Checkbox onChange={e => HandleDiscountFilter({ ...initialDiscountFilter, '24': e.target.checked })}>Less than 25%</Checkbox>
                                                       <Checkbox onChange={e => HandleDiscountFilter({ ...initialDiscountFilter, '25': e.target.checked })}>More than 25%</Checkbox>
                                                  </Box>}
                                             </ListItem>
                                        </List>

                                   </Box>
                                   <Box className='product-container' w={{ base: "", sm: "60%", md: '80%' }} p='2' overflowY={['none', '', 'scroll']} h='100%'>
                                        {/* card */}
                                        <Text textTransform={'capitalize'} fontWeight='semibold' py='2' fontSize={'2.5em'}>{tempParam}</Text>
                                        <Grid w='100%' justifyContent='center' templateColumns={{ base: "repeat(1,1fr)", sm: 'repeat(1,1fr)', md: 'repeat(2,1fr)', lg: "repeat(3,1fr)" }} gap={['5', 5, 2, 6,]} >
                                             {(showFilterData ? filtered : data)?.map((el) => (
                                                  <Box w='100%' key={el.id} className='product-card' >
                                                       <Card data={el} setLoading={setLoading} />
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