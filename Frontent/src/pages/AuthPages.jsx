import React from 'react'
import SignupCard from '@/components/SignupCard'
import LoginCard from '@/components/LoginCard'
import { useRecoilValue } from 'recoil'
import authScreenAtom from '../atom/authAtom'
import { Box } from '@chakra-ui/react'

const AuthPage = () => {
  
  const authScreenState = useRecoilValue(authScreenAtom)
  return (
    <Box w={"full"} display={"flex"} justifyContent={"center"} minH={"100vh"}>
      {authScreenState === 'login' ? <LoginCard/> : <SignupCard/>}
    </Box>
  )
}

export default AuthPage
