'use client'

import {
  Box,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  useColorModeValue,
  Icon,
  IconButton,
  CloseButton,
  Flex,
  FlexProps,
  Avatar,
} from '@chakra-ui/react'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi'

interface NavItemProps extends FlexProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactText
}

interface LinkItemProps {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
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
]

export default function HeaderSP() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Cookieからトークンを取得
    const token = getCookie('token')
    setIsLoggedIn(!!token)
  }, [])
  return (
    <>
      <Box>
        <SidebarContent onClose={() => onClose} display={{ base: 'none' }} />
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav
          display={{ base: 'flex', md: 'none' }}
          onOpen={onOpen}
          isLoggedIn={isLoggedIn}
        />
        <Box ml={{ base: 0, md: 60 }} p="4">
          {/* Content */}
        </Box>
      </Box>
    </>
  )
}

interface SidebarProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, isLoggedIn, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="space-between"
      {...rest}
    >
      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
      {isLoggedIn ? (
        <IconButton
          variant="outline"
          onClick={onOpen}
          aria-label="open menu"
          icon={<FiMenu />}
        />
      ) : (
        <Avatar size={'sm'} display={{ base: 'flex', md: 'none' }} />
      )}
    </Flex>
  )
}
