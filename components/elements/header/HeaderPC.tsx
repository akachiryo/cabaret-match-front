'use client'

import {
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiUserPlus,
  FiLogIn,
} from 'react-icons/fi'

interface LinkItemProps {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
}

interface NavLinkProps {
  children: React.ReactNode
}

const LinkItems: Array<LinkItemProps> = [
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  { name: 'Home', icon: FiHome },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  { name: 'Trending', icon: FiTrendingUp },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  { name: 'Explore', icon: FiCompass },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  { name: 'Favourites', icon: FiStar },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  { name: 'Settings', icon: FiSettings },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  { name: 'UserPlus', icon: FiUserPlus },
]

export default function HeaderPC() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Cookieからトークンを取得
    const token = getCookie('token')
    setIsLoggedIn(!!token)
  }, [])

  return (
    <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
      <Box w={8} display={{ md: 'none' }}></Box>
      <HStack spacing={8} alignItems={'center'}>
        <Box>Night Match</Box>
        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
          {LinkItems.map((link) => (
            <NavLink key={link.name}>{link.name}</NavLink>
          ))}
        </HStack>
      </HStack>
      <Flex alignItems={'center'}>
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}
          >
            {isLoggedIn ? (
              <Avatar
                size={'sm'}
                src={
                  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
              />
            ) : (
              <Avatar size={'sm'} />
            )}
          </MenuButton>
          <MenuList>
            <MenuItem>
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
              <Icon as={FiUserPlus} mr="2" fontSize="16"></Icon>
              Sign up
            </MenuItem>
            <MenuItem>
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
              <Icon as={FiLogIn} mr="2" fontSize="16"></Icon>
              Login
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}

const NavLink = ({ children }: NavLinkProps) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}
    >
      {children}
    </Box>
  )
}
