import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit'
import {userSlice} from '../features/user'
import {dataSlice} from '../features/data'
import {settingsSlice} from '../features/settings'
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    data: dataSlice.reducer,
    settings: settingsSlice.reducer,
    middleware: getDefaultMiddleware(),
    // To disable devtools in production
    devTools: process.env.NODE_ENV !== 'production',
  },

  
})

