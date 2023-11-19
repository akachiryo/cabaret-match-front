'use client'

import { Button, VStack, Heading, Text, Box } from '@chakra-ui/react'
import { setCookie } from 'cookies-next'
import { useForm } from 'react-hook-form'

import CustomInput from '@/components/elements/CustomInput'

import api from '@/utils/api'

interface LoginData {
  email: string
  password: string
}

export const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>()

  const handleLogin = (data: LoginData) => {
    api
      .post('/api/v1/hosts/login', {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        setCookie('token', response.data)
      })
      .catch((error) => {
        console.error('Error during the signup request:', error)
      })
  }

  return (
    <VStack>
      <Box w={{ base: '80vw', sm: '50vw', lg: '20vw' }} mt="20vh">
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(handleLogin)} noValidate>
          <Heading mb={16} fontSize="4xl" fontWeight="bold" textAlign="center">
            Login
          </Heading>
          <CustomInput
            name="email"
            placeholder="Email address"
            type="email"
            register={register('email', {
              required: '必須項目です',
              maxLength: {
                value: 50,
                message: '50文字以内で入力してください',
              },
              pattern: {
                value: /^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+$/,
                message: 'メールアドレスを入力してください',
              },
            })}
            errors={errors}
          />
          <CustomInput
            name="password"
            placeholder="Password"
            type="password"
            register={register('password', {
              required: '必須項目です',
              minLength: {
                value: 8,
                message: '8文字以上で入力してください',
              },
              maxLength: {
                value: 50,
                message: '50文字以内で入力してください',
              },
            })}
            errors={errors}
          />
          <Button
            mb={3}
            colorScheme="pink"
            width="full"
            fontWeight="bold"
            type="submit"
          >
            Login
          </Button>
        </form>
        <Text mt={4} textAlign="center">
          New around here?{' '}
          <Text as="span" color="blue.500" fontWeight="bold" cursor="pointer">
            Sign Up
          </Text>
        </Text>
      </Box>
    </VStack>
  )
}

export default Signup
