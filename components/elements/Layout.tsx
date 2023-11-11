'use client'

import { Flex } from '@chakra-ui/react'

import Footer from '@/components/elements/Footer'
import Header from '@/components/elements/header/Header'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Flex
        position={['fixed', 'fixed', 'fixed', 'static']}
        flexDirection="column"
        top="0"
        width="100vw"
        zIndex="1000"
      >
        <Header />
        {children}
        <Footer />
      </Flex>
    </>
  )
}
