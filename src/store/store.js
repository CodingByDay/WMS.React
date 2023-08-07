import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit'
import {userSlice} from '../features/user'
import {dataSlice} from '../features/data'
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    data: dataSlice.reducer,
    middleware: getDefaultMiddleware(),
    // To disable devtools in production
    devTools: process.env.NODE_ENV !== 'production',
  },

  
})

