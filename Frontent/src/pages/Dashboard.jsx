
import React, { useState } from 'react'
import {
  Box,
  Flex,
  Text,
  Input,
  Stack,
  Button,
  Heading,
  Textarea,
  Spinner,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import userAtom from '@/atom/userAtom'
import { useSetRecoilState } from 'recoil'

const Dashboard = () => {
  const [formData, setFormData] = useState({
    sleepHours: '',
    waterIntake: '',
    mealsLogged: '',
    workoutTime: '',
  })

  const [tips, setTips] = useState({
    sleep: '',
    diet: '',
    workout: ''
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const setUser = useSetRecoilState(userAtom)

  const handleGenerateTips = async () => {
    setLoading(true)
    try {
      const prompt = `
        sleep: ${formData.sleepHours}hrs,
        water: ${formData.waterIntake}ltr,
        meals: ${formData.mealsLogged},
        workout: ${formData.workoutTime}mins

        Give Sleep Improvement, Diet Tip, and Workout Suggestion based on this data in JSON format advicd the user with the care.
      `
      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      })

      const data = await res.json()
      if (data?.["Sleep Improvement"]) {
        setTips({
          sleep: data["Sleep Improvement"],
          diet: data["Diet Tip"],
          workout: data["Workout Suggestion"]
        })
      } else {
        setTips({
          sleep: "Error generating tip",
          diet: "Error generating tip",
          workout: "Error generating tip"
        })
      }

    } catch (err) {
      console.error("Error fetching tips:", err)
      setTips({
        sleep: "Failed to connect to API",
        diet: "Failed to connect to API",
        workout: "Failed to connect to API"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Top-right Logout Button */}
      <Flex position="absolute" top="4" right="6" zIndex="10">
        <Button
          colorScheme="red"
          size="sm"
          onClick={() => {
            localStorage.clear()
            setUser(null)
            navigate('/auth')
          }}
        >
          Logout
        </Button>
      </Flex>

      {/* Main layout */}
      <Flex
        h="100vh"
        w="100%"
        justifyContent="center"
        alignItems="center"
        p={4}
        flexWrap={{ base: 'wrap', md: 'nowrap' }}
        gap={6}
      >
        {/* Left: Form */}
        <Box flex="1" maxW="500px" borderWidth="1px" borderRadius="lg" p={6}>
          <Heading size="xl" mb={4} textAlign={'center'}>
            Daily Health Form
          </Heading>
          <Stack spacing={4}>
            <Box>
              <Text fontWeight="medium">Sleep Hours</Text>
              <Input
                placeholder="e.g. 7.5"
                type="number"
                name="sleepHours"
                value={formData.sleepHours}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <Text fontWeight="medium">Water Intake (Liters)</Text>
              <Input
                placeholder="e.g. 2.5"
                type="number"
                name="waterIntake"
                value={formData.waterIntake}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <Text fontWeight="medium">Meals Logged</Text>
              <Input
                placeholder="e.g. 3"
                type="number"
                name="mealsLogged"
                value={formData.mealsLogged}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <Text fontWeight="medium">Workout Time (Minutes)</Text>
              <Input
                placeholder="e.g. 45"
                type="number"
                name="workoutTime"
                value={formData.workoutTime}
                onChange={handleChange}
              />
            </Box>
            <Button
              colorScheme="blue"
              onClick={handleGenerateTips}
              isDisabled={loading}
            >
              {loading ? <Spinner size="sm" /> : 'Generate Health Tips'}
            </Button>
          </Stack>
        </Box>

        {/* Right: Suggestions */}
        <Box
          flex="1"
          maxW="500px"
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          display={{ base: 'none', md: 'block' }}
        >
          <Heading size="xl" mb={4} textAlign={'center'}>
            Suggestions
          </Heading>
          <Stack spacing={4}>
            <Box>
              <Text fontWeight="semibold">Sleep Improvement</Text>
              <Textarea
                value={tips.sleep}
                placeholder="AI-generated tip..."
                isReadOnly
              />
            </Box>
            <Box>
              <Text fontWeight="semibold">Diet Tip</Text>
              <Textarea
                value={tips.diet}
                placeholder="AI-generated tip..."
                isReadOnly
              />
            </Box>
            <Box>
              <Text fontWeight="semibold">Workout Suggestion</Text>
              <Textarea
                value={tips.workout}
                placeholder="AI-generated tip..."
                isReadOnly
              />
            </Box>
          </Stack>
        </Box>
      </Flex>
    </>
  )
}

export default Dashboard
