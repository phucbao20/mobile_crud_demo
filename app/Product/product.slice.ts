import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface productState {
    productId: string
}

const initialState: productState = {
    productId: ""
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        startEditPost: (state, action: PayloadAction<string>) => {
            state.productId = action.payload
        },
        cancelEditPost: (state) => {
            state.productId = ""
        }
    }
})

const productReducer = productSlice.reducer
export const {startEditPost, cancelEditPost} = productSlice.actions
export default productReducer
