'use client'

import { Button, VStack, Heading, Text, Box } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import CustomInput from '@/components/elements/CustomInput'

import api from '@/utils/api'

interface SignupData {
  email: string
  password: string
}

export const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>()

  const handleSignup = (data: SignupData) => {
    api
      .post('/api/v1/hosts', {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error('Error during the signup request:', error)
      })
  }

  return (
    <VStack>
      <Box w={{ base: '80vw', sm: '50vw', lg: '20vw' }} mt="20vh">
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(handleSignup)} noValidate>
          <Heading mb={16} fontSize="4xl" fontWeight="bold" textAlign="center">
            Sign up
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
            Sign up
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
