import { useState } from 'react'
import {Box, Container} from '@chakra-ui/react'
import Headers from './components/Header'
// import Toaster from './components/ui/toaster'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import userAtom from './atom/userAtom'
import AuthPage from './pages/AuthPages'
import Dashboard from './pages/Dashboard'
import {Toaster} from './components/ui/toaster'



function App() {

  const user = useRecoilValue(userAtom)
  const {pathname} = useLocation()

  return (
    <Box position={"relative"} w={"full"}>
      <Container maxW={pathname === '/'? {base:"620px", md:"900px"}:"620px"}>
        {/* <Headers/> */}
        <Toaster/>
        <Routes>
          <Route path="/" element={user ? <Dashboard/> : <Navigate to="/auth"/>} />
          <Route path="/auth" element={!user ? <AuthPage/> : <Navigate to= '/' />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default App
