'use client'

import {
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react'
import { FC } from 'react'
import { UseFormRegisterReturn, FieldErrors } from 'react-hook-form'

interface CustomInputProps {
  placeholder?: string
  name: string
  type: string
  register: UseFormRegisterReturn
  errors: FieldErrors
  label: string
}

const CustomInput: FC<CustomInputProps> = ({
  placeholder,
  type,
  name,
  register,
  errors,
  label,
}) => {
  let validationRules: Record<string, unknown> = {}

  switch (type) {
    case 'email':
      validationRules = {
        required: '必須項目です',
        maxLength: { value: 50, message: '50文字以内で入力してください' },
        pattern: {
          value: /^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+$/,
          message: 'メールアドレスを入力してください',
        },
      }
      break

    default:
      validationRules = {}
      break
  }
  2

  return (
    <div>
      <FormControl
        mb={{ base: 4, md: 8 }}
        isInvalid={Boolean(errors[name]?.message)}
      >
        <FormLabel>{label}</FormLabel>
        <Input
          borderColor="#FFFFFF"
          boxShadow="md"
          mb={errors[name] ? 0 : 3}
          placeholder={placeholder}
          type={type}
          {...register}
          name={name}
          w="full"
        />
        {errors[name] && (
          <FormErrorMessage fontSize="xs" ml={4}>
            {errors[name].message}
          </FormErrorMessage>
        )}
      </FormControl>
    </div>
  )
}

export default CustomInput
