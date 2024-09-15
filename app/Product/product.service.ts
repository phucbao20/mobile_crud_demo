import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from './product.type';

export const productApi = createApi({
    reducerPath: 'productApi',
    tagTypes: ['Post'],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://x9j46mtv-8080.asse.devtunnels.ms/api/v1' }),
    endpoints: build => ({
        //query = get
        // mutation = post, put, delete
        // generic type theo thứ tự kiểu response trả về và argument
        getPosts: build.query<Product[], void>({
            query: () => '/product',
            providesTags(result) {
                if (result) {
                    const final = [...result.map(({ id }) => ({ type: 'Post' as const, id })), { type: 'Post' as const, id: 'LIST' }]
                    return final;
                }
                const final = [{ type: 'Post' as const, id: 'LIST' }]
                return final;
            }
        }),
        getById : build.query<Product, number>({
            query: (id) => `/product/${id}`
        }),
        createPost: build.mutation<Product, Omit<Product, 'id'>>({
            query(body) {
                return {
                    url: '/product',
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: (result, error, body) => [{ type: 'Post', id: 'LIST' }]
        }),
        deletePost: build.mutation<{}, number>({
            query(id) {
                return {
                    url: `/product/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (result, error, id) => [{ type: 'Post', id }]
        })
    })
})
export const { useGetPostsQuery, useCreatePostMutation, useDeletePostMutation, useGetByIdQuery } = productApi