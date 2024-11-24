import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi( {
    reducerPath: 'api4',
    baseQuery: fetchBaseQuery( { baseUrl: "http://localhost:3503" } ),
    tagTypes: ['Countries'],
    endpoints: ( build ) => ( {} )
} );