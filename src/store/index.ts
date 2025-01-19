import { configureStore } from '@reduxjs/toolkit'

import { cryptonAPI } from '@/service/crypton.js'

const store = configureStore({
  reducer: {
    [cryptonAPI.reducerPath]: cryptonAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cryptonAPI.middleware),
})

export default store
