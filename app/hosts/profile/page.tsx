'use client'

import {
  Button,
  VStack,
  HStack,
  Heading,
  Text,
  Box,
  IconButton,
} from '@chakra-ui/react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CiSearch } from 'react-icons/ci'

import CustomInput from '@/components/elements/CustomInput'

import { useUserStore } from '@/stores/UserStore'
import api from '@/utils/api'

interface ProfileData {
  name: string
  gender: string
  postcode: number
  prefecture: string
  city: string
  district: string
  block: string
  building: string
}

interface ZipCloudResponse {
  message: string | null
  results: AddressResult[]
  status: number
}

interface AddressResult {
  address1: string // 都道府県
  address2: string // 市区町村
  address3: string // 町域
  kana1: string // 都道府県のカナ
  kana2: string // 市区町村のカナ
  kana3: string // 町域のカナ
  prefcode: string // 都道府県コード
  zipcode: string // 郵便番号
}

const genderEnum = {
  男性: 0,
  女性: 1,
  ノンバイナリー: 2,
}

export const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileData>()

  const [selectedGender, setSelectedGender] = useState<number>()
  const watchedPostcode: number | undefined = watch('postcode')
  const watchedPrefecture: string | undefined = watch('prefecture')

  const router = useRouter()
  const role = useUserStore((state) => state.role)
  const updateRole = useUserStore((state) => state.updateRole)

  const handleProfile = (data: ProfileData) => {
    api
      .post('/api/v1/hosts/profile', {
        name: data.name,
        gender: selectedGender,
        postcode: data.postcode,
        prefecture: data.prefecture,
        city: data.city,
        district: data.district,
        block: data.block,
        building: data.building,
      })
      .then((response) => {
        console.log(response.data)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setCookie('token', response.data.token)
        updateRole('host')
        console.log('role', role)
        router.push('/')
      })
      .catch((error) => {
        console.error('Error during the signup request:', error)
      })
  }

  const fetchAddress = () => {
    api
      .get<ZipCloudResponse>(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${watchedPostcode}`,
      )
      .then((response) => {
        console.log(response.data)
        const address = response.data.results[0]
        setValue('prefecture', address.address1)
        setValue('city', address.address2)
        setValue('district', address.address3)
      })
      .catch((error) => {
        console.error('Error during the signup request:', error)
      })
  }

  return (
    <VStack>
      <Box w={{ base: '80vw', sm: '50vw', lg: '20vw' }}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(handleProfile)} noValidate>
          <Heading mb={16} fontSize="4xl" fontWeight="bold" textAlign="center">
            Profile
          </Heading>
          <CustomInput
            name="name"
            placeholder="name"
            type="name"
            label="name"
            register={register('name', {
              required: '必須項目です',
              maxLength: {
                value: 50,
                message: '50文字以内で入力してください',
              },
            })}
            errors={errors}
          />
          <Text>性別</Text>
          <HStack>
            {Object.keys(genderEnum).map((gender) => (
              <Button
                key={gender}
                onClick={() =>
                  setSelectedGender(
                    genderEnum[gender as keyof typeof genderEnum],
                  )
                }
                style={{
                  opacity:
                    selectedGender === undefined ||
                    selectedGender ===
                      genderEnum[gender as keyof typeof genderEnum]
                      ? 1
                      : 0.5,
                  cursor: 'pointer',
                }}
                colorScheme="pink"
              >
                {gender}
              </Button>
            ))}
          </HStack>
          <HStack>
            <CustomInput
              name="postcode"
              placeholder="postcode"
              type="postcode"
              label="postcode"
              register={register('postcode', {
                required: '必須項目です',
              })}
              errors={errors}
            />
            <IconButton
              colorScheme="blue"
              aria-label="Search database"
              icon={<CiSearch />}
              onClick={() => fetchAddress()}
            />
          </HStack>
          <CustomInput
            name="prefecture"
            placeholder="都道府県"
            type="prefecture"
            label="都道府県"
            register={register('prefecture', {
              required: '必須項目です',
            })}
            errors={errors}
          />
          <CustomInput
            name="city"
            placeholder="市区町村"
            type="city"
            label="市区町村"
            register={register('city', {
              required: '必須項目です',
            })}
            errors={errors}
          />
          <CustomInput
            name="district"
            placeholder="町名"
            type="district"
            label="町名"
            register={register('district', {
              required: '必須項目です',
            })}
            errors={errors}
          />
          <CustomInput
            name="block"
            placeholder="番地"
            type="block"
            label="番地"
            register={register('block', {
              required: '必須項目です',
            })}
            errors={errors}
          />
          <CustomInput
            name="building"
            placeholder="建物名"
            type="building"
            label="建物名"
            register={register('building')}
            errors={errors}
          />
          <Button
            mb={3}
            colorScheme="pink"
            width="full"
            fontWeight="bold"
            type="submit"
          >
            更新
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
