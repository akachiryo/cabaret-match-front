'use client'

import { Flex } from '@chakra-ui/react'

import Footer from '@/components/elements/Footer'
import Header from '@/components/elements/header/Header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Flex minHeight="100vh" flexDirection="column">
        <Header />
        <Flex
          flex="1"
          flexDirection="column"
          justifyContent={{ base: 'normal', md: 'center' }}
        >
          {children}
        </Flex>
        <Footer />
      </Flex>
    </>
  )
}
