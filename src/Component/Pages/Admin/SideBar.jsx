import { Box, List, Image, Text, ListItem } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import React from 'react'

const SideBar = () => {
     return (
          <>
               <Box className='admin-sidebar-main'>
                    <Box py='2' borderBottom={'2px'} borderColor='gray.200'>
                         <NavLink to='/admin' className='flex' state='/admin'>
                              <Image src='/logo.png' alt='' boxSize={{ base: '30px', lg: "35px" }} width={{ base: '40px', lg: "45px" }} />
                              <Box fontSize={{ base: '1.7em', lg: "1.8em" }} fontWeight={'900'} h='100%' className='flex logoText' pt={{ base: '1', lg: "2" }}>
                                   <Text as='span' color={'red.500'} px={{ base: '1px', lg: "2px" }} className='flex' >BIG</Text>
                                   <Text as='span' className='flex'  >BASKET</Text>
                              </Box>
                         </NavLink>
                    </Box>
                    <List className='admin-sidebarList'>

                         <NavLink to='/admin/dashboard' className={({ isActive }) => (isActive ? 'admin-active-link' : "")}>
                              <ListItem>
                                   <Box>
                                        <Image src='/admin-images/dashboard.png' /> <Text>DashBoard</Text>
                                   </Box>
                              </ListItem>
                         </NavLink>

                         <NavLink to='/admin/users' className={({ isActive }) => (isActive ? 'admin-active-link' : "")}>
                              <ListItem>
                                   <Box>
                                        <Image src='/admin-images/team.png' /> <Text>Users</Text>
                                   </Box>
                              </ListItem>
                         </NavLink>

                         <NavLink to='/admin/orders' className={({ isActive }) => (isActive ? 'admin-active-link' : "")}>
                              <ListItem>
                                   <Box>
                                        <Image src='/admin-images/order.png' /> <Text>Orders</Text>
                                   </Box>
                              </ListItem>
                         </NavLink>

                         <NavLink to='/admin/about' className={({ isActive }) => (isActive ? 'admin-active-link' : "")}>
                              <ListItem>
                                   <Box>
                                        <Image src='/football.png' /><Text> About Us</Text>
                                   </Box>
                              </ListItem>
                         </NavLink>
                    </List>
               </Box>
          </>
     )
}

export default SideBar