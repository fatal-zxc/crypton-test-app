import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { FieldValues } from 'react-hook-form'

interface UserProfile {
  email: string
  id: string
}

interface TokenData {
  token: string
  type: string
}

export const cryptonAPI = createApi({
  reducerPath: 'cryptonAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-ashen-seven-22.vercel.app',
    prepareHeaders: (headers) => {
      const authToken = Cookies.get('authToken')
      if (authToken) {
        headers.set('Authorization', authToken)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    fetchUser: build.query<UserProfile, void>({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
    }),
    registerUser: build.mutation<TokenData, FieldValues>({
      query: (data: FieldValues) => ({
        url: '/register',
        method: 'POST',
        body: {
          email: data.email,
          password: data.password,
        },
      }),
    }),
    loginUser: build.mutation<TokenData, FieldValues>({
      query: (data: FieldValues) => ({
        url: '/login',
        method: 'POST',
        body: {
          email: data.email,
          password: data.password,
        },
      }),
    }),
  }),
})

export const { useRegisterUserMutation, useLoginUserMutation, useFetchUserQuery } = cryptonAPI
