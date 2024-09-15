import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import productReducer from './product.slice'
import { productApi } from './product.service'



// ...

export const store = configureStore({
  reducer: {
    product: productReducer,
    [productApi.reducerPath]: productApi.reducer // thêm reducer đc tạo từ api slice
  },
  //thêm middleware đêr enable các tính năng như caching, invalid, polling, rtk-query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware)
})
//Optional, bắc buộc để dùng refetchOnfocus/ refetchOnReconnect
setupListeners(store.dispatch)   


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch