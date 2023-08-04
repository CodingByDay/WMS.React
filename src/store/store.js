import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit'
import {userSlice} from '../features/user'
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    middleware: getDefaultMiddleware(),
    // To disable devtools in production
    devTools: process.env.NODE_ENV !== 'production',
  },

  
})

