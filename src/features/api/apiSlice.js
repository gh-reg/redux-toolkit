import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//  json-server --watch data/db.json --port 3500
//  json-server --watch data/db2.json --port 3501

export const apiSlice = createApi( {
    reducerPath: 'api',
    baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:3500' } ),
    tagTypes: ['Todos'],
    endpoints: ( builder ) => ( {
        getTodos: builder.query( {
            query: () => '/todos',
            transformResponse: res => res.sort(
                ( a, b ) => parseInt( b.id, 16 ) - parseInt( a.id, 16 )
            ),
            providesTags: ['Todos']
        } ),
        addTodo: builder.mutation( {
            query: ( todo ) => ( {
                url: '/todos',
                method: 'POST',
                body: todo
            } ),
            invalidatesTags: ['Todos']
        } ),
        updateTodo: builder.mutation( {
            query: ( todo ) => ( {
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            } ),
            invalidatesTags: ['Todos']
        } ),
        deleteTodo: builder.mutation( {
            query: ( { id } ) => ( {
                url: `/todos/${id}`,
                method: 'DELETE',
                // body: id
            } ),
            invalidatesTags: ['Todos']
        } )
    } )
} );

console.log( 'apiSlice', apiSlice );

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = apiSlice;