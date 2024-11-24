import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// console.log( 'before export const apiSlice = createApi( {' );

export const apiSlice = createApi( {
    reducerPath: 'api2',
    baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:3501' } ),
    tagTypes: ['Post', 'User'],
    endpoints: builder => ( {} )
} );

// console.log( 'after export const apiSlice = createApi( {' );
