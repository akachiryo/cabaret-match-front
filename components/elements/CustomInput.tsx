'use client'

import { Input, FormControl, FormErrorMessage } from '@chakra-ui/react'
import { FC } from 'react'
import { UseFormRegisterReturn, FieldErrors } from 'react-hook-form'

interface CustomInputProps {
  placeholder?: string
  name: string
  type: string
  register: UseFormRegisterReturn
  errors: FieldErrors
}

const CustomInput: FC<CustomInputProps> = ({
  placeholder,
  type,
  name,
  register,
  errors,
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
    // 他の type に対するバリデーションルールもここに追加できます
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
        <Input
          borderColor="#FFFFFF"
          rounded="full"
          boxShadow="md"
          mb={errors[name] ? 0 : 3}
          placeholder={placeholder}
          type={type}
          {...register}
          name={name}
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
