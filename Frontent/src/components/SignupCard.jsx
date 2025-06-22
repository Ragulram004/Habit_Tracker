import { useState } from "react"
import { Button, Card, Input, Stack, Flex, Text, Link, Spinner } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { PasswordInput } from "./ui/password-input"
import { useSetRecoilState } from "recoil"
import authScreenAtom from "@/atom/authAtom"
// import useShowToast from "@/hooks/useShowToast"
import userAtom from "@/atom/userAtom"


const SignupCard = () => {
  const setAuthScreen = useSetRecoilState(authScreenAtom)
  const [inputs, setInputs] = useState({
    name:"",
    username:"",
    email:"",
    password:"",
    age: null,
    weigth: null,
    height: null,
    country: "",
  })
  // const showToast = useShowToast()
  const setUser = useSetRecoilState(userAtom)
  const [loading,setLoading] = useState(false)

  const handleSignup = async() =>{
    setLoading(true)
    try{
      const res = await fetch("/api/users/signup",{
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
      <Card.Root bg={"card"} maxW={{base:"full" ,sm:"500px"}} borderWidth="1px" borderRadius="lg" p={2} pb={6}>
          <Card.Header>
            <Card.Title textAlign={"center"} fontSize="2xl" fontWeight="bold">Sign up</Card.Title>
            <Card.Description textAlign={"center"} color="gray.500" fontSize="sm">
              Fill in the form below to create an account
            </Card.Description>
          </Card.Header>
          <Card.Body>
            <Stack direction={['column','row']} gap={4} mb={4}>
              <Field label="Full name" required >
                <Input placeholder="Your fullname" 
                  onChange={(e) => setInputs({...inputs, name:e.target.value})}
                  value={inputs.name}
                />
              </Field>
              <Field label="Username" required>
                <Input placeholder="Your username"
                  onChange={(e) => setInputs({...inputs, username:e.target.value})}
                  value={inputs.username}
                />
              </Field>
            </Stack>
            <Stack gap="4" w="full">
              <Field label="Email" required>
                <Input placeholder="Your email address" type="email"
                  onChange={(e)=>setInputs({...inputs, email:e.target.value})}
                  value={inputs.email}
                />
              </Field>
              <Field label="Password" required >
                <PasswordInput placeholder="Your password" type="password"
                  onChange={(e) => setInputs({...inputs, password:e.target.value})}
                  value = {inputs.password}
                />
              </Field>
              <Field label="Age" required >
                <Input placeholder="Your Age" type="number"
                  onChange={(e) => setInputs({...inputs, age:e.target.value})}
                  value = {inputs.age}
                />
              </Field>
              <Stack direction={['column','row']} gap={4} mb={4} >
                <Field label="Height">
                  <Input placeholder="Your height in cm" type="number"
                    onChange={(e) => setInputs({...inputs, height:e.target.value})}
                    value = {inputs.height}
                  />
                </Field>
                <Field label="Weight" >
                  <Input placeholder="Your weight in kg" type="number"
                    onChange={(e) => setInputs({...inputs, weigth:e.target.value})}
                    value = {inputs.weigth}
                  />
                </Field>
              </Stack>
              <Field label="Country" required >
                <Input placeholder="Your Country" type="text"
                  onChange={(e) => setInputs({...inputs, country:e.target.value})}
                  value = {inputs.country}
                />
              </Field>
            </Stack>
          </Card.Body>
          <Card.Footer  gap={2}>
            <Button w={"full"} 
              size={"sm"} 
              variant="solid" 
              colorScheme="blue"
              onClick={handleSignup}
            >
              {loading ? <Spinner size={"sm"} /> : "Sign up"}
            </Button>
          </Card.Footer>
          <Flex direction="column" align="center">
            <Text align="center" fontSize="sm" mt={2}>
              Already a user?{" "}
              <Link color="blue.400"
                onClick={()=> setAuthScreen('login')}
              >
                Login
              </Link>
            </Text>
          </Flex>
        </Card.Root>
     </Flex>
    </>
  )
}

export default SignupCard
