import { useState } from "react"
import { Button, Card, Input, Stack, Flex, Text, Link, Spinner } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { PasswordInput } from "./ui/password-input"
import authScreenAtom from "@/atom/authAtom"
import { useSetRecoilState } from "recoil"
import useShowToast from "@/hooks/useShowToast"
import userAtom from "@/atom/userAtom"

const SignupCard = () => {
  const setAuthScreen = useSetRecoilState(authScreenAtom)
  const showToast = useShowToast()
  const setUser = useSetRecoilState(userAtom)
  const [inputs, setInputs] = useState({
    username:"",
    password:""
  })
  const [loading,setLoading] = useState(false)

  const handlelogin = async() =>{
    setLoading(true)
    try{
      const res = await fetch("/api/users/login",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
      })
      const data = await res.json()
      if(data.error){
        showToast(null,data.error,"error")
        return
      }
      localStorage.setItem("user-habit",JSON.stringify(data))
      setUser(data)
    }catch(error){
      showToast("Error",error,"error")
    }finally{
      setLoading(false)
    }
  }
  return (
    <>
     <Flex justifyContent="center" alignItems={"center"}>
      <Card.Root bg={"card"} w={{base:"full",sm:"400px"}} borderWidth="1px" borderRadius="lg" p={2} pb={6}>
          <Card.Header>
            <Flex direction="column" align="center">
              <Card.Title fontSize="2xl" fontWeight="bold">Login</Card.Title>
            </Flex>
          </Card.Header>
          <Card.Body>
            <Stack gap="4" w="full">
              <Field label="Username" required>
                <Input placeholder="Enter your Username" type="text"
                  onChange={(e) => setInputs((inputs)=>({...inputs, username:e.target.value}))}
                  value={inputs.username}
                />
              </Field>
              <Field label="Password" required >
                <PasswordInput placeholder="Enter your password" type="password"
                  onChange={(e) => setInputs((inputs)=>({...inputs, password:e.target.value}))}
                  value = {inputs.password}
                />
              </Field>
            </Stack>
          </Card.Body>
          <Card.Footer  gap={2}>
            <Button w={"full"} size={"sm"} variant="solid" colorScheme="blue"
             onClick={handlelogin}
            >
              {loading ? <Spinner size={"sm"} /> : "Login"}
            </Button>
          </Card.Footer>
          <Flex direction="column" align="center">
            <Text align="center" fontSize="sm" mt={2}>
              Don't have an account?{" "}
              <Link color="blue.400"
                onClick={() => setAuthScreen('signup')}
              >
                Sign up
              </Link>
            </Text>
          </Flex>
        </Card.Root>
     </Flex>
    </>
  )
}

export default SignupCard
