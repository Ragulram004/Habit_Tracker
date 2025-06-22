import { useState } from "react"
import { Flex, Image, Link,  Text, Box} from "@chakra-ui/react"
import { useColorMode } from "./ui/color-mode"
import { useRecoilValue, useSetRecoilState } from "recoil"
import userAtom from "@/atom/userAtom"
import {Link as RouterLink} from "react-router-dom"
import { AiFillHome } from "react-icons/ai"
import { FaUserAlt } from "react-icons/fa";
import React from "react"
import { IoMdLogOut } from "react-icons/io"
import { Button } from "./ui/button"
// import useLogout from "@/hooks/useLogout"
import authScreenAtom from "@/atom/authAtom"
import { BsFillChatQuoteFill } from "react-icons/bs"
import { MdOutlineSettings } from "react-icons/md"
import { GiHamburgerMenu } from "react-icons/gi";

import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu"

const Header = () => {
  const {colorMode,toggleColorMode} = useColorMode()
  const user = useRecoilValue(userAtom)
  // const logout = useLogout()
  const setAuthScreen = useSetRecoilState(authScreenAtom)

  return (
    <Flex 
      justifyContent={"space-between"} 
      mt={4} 
      mb='12' 
      bg={colorMode === "dark" ? "gray.dark" : "gray.200"} 
      p={4}
      border={"1px solid"}
      borderColor={colorMode === "dark" ? "gray.600" : "gray.300"}
      borderRadius={"30px"}  
      shadow={"lg"}
    >
			{user && (
				<Link as={RouterLink} to='/'>
					<AiFillHome size={24} />
				</Link>
			)}
			{!user && (
				<Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("login")}>
					Login
				</Link>
			)}

			<Image
				cursor={"pointer"}
				alt='logo'
				w={6}
				src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
				onClick={toggleColorMode}
			/>

			{user && (
				<Flex alignItems={"center"}>
					<MenuRoot positioning={{ placement: "right-start" }}>
						<MenuTrigger asChild>
							<GiHamburgerMenu size={24} />
						</MenuTrigger>
						<MenuContent >
							<MenuItem value="profile">
								<Link as={RouterLink} to={`/${user.username}`} p={1} px={7} >
									<FaUserAlt size={19} /> <Text fontSize={"md"} fontWeight={600}>Profile</Text>
								</Link>
							</MenuItem>
							<MenuItem value="chat">
								<Link as={RouterLink} to={`/chat`} p={1} px={7}>
									<BsFillChatQuoteFill size={20} /> <Text fontSize={"md"} fontWeight={600}>Chat</Text>
								</Link>
							</MenuItem>
							<MenuItem value="settings">
								<Link as={RouterLink} to={`/settings`} p={1} px={7}>
									<MdOutlineSettings size={20} /> <Text fontSize={"md"} fontWeight={600}>Settings</Text>
								</Link>	
							</MenuItem>
							<MenuItem value="logout"  >
								<Flex onClick={/*logout*/""} p={1} px={7} gap={1}>
									<IoMdLogOut size={23}  cursor={"pointer"} title="Logout" /> <Text fontSize={"md"} fontWeight={600}>Logout</Text>
								</Flex>
							</MenuItem>
						</MenuContent>
					</MenuRoot>
				</Flex>
				// <Flex alignItems={"center"} gap={4}>
				// 	<Link as={RouterLink} to={`/${user.username}`}>
				// 		<FaUserAlt size={19} />
				// 	</Link>
				// 	<Link as={RouterLink} to={`/chat`}>
				// 		<BsFillChatQuoteFill size={20} />
				// 	</Link>
				// 	<Link as={RouterLink} to={`/settings`}>
				// 		<MdOutlineSettings size={20} />
				// 	</Link>					
				// 	<IoMdLogOut size={23} onClick={logout} cursor={"pointer"} title="Logout" />
					
				// </Flex>
			)}

			{!user && (
				<Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("signup")}>
					Sign up
				</Link>
			)}
		</Flex>
    
  )
}

export default Header
