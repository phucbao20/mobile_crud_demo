import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface productState {
    productId: number
}

const initialState: productState = {
    productId: 1
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        startEditPost: (state, action: PayloadAction<number>) => {
            state.productId = action.payload
        },
        cancelEditPost: (state) => {
            state.productId = 0
        }
    }
})

const productReducer = productSlice.reducer
export const {startEditPost, cancelEditPost} = productSlice.actions
export default productReducer
