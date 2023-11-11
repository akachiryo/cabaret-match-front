'use client'

import { Box, useColorModeValue } from '@chakra-ui/react'

import HeaderPC from './HeaderPC'
import HeaderSP from './HeaderSP'

export default function Header() {
  return (
    <>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
        display={{ base: 'none', md: 'block' }}
      >
        <HeaderPC />
      </Box>
      <HeaderSP />
    </>
  )
}
