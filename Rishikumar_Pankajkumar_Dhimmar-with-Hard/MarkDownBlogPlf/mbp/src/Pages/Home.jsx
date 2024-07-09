import { Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import Footer from '../Components/Footer'
import FloatingButton from '../Components/FloatingButton'

function Home() {
  return (
      <Container maxWidth="full" sx = {{ p : { xs: 0 , md : 2}}}>
        <NavBar/>
        <Outlet />
        <FloatingButton />
        <Footer />
      </Container>
  )
}

export default Home