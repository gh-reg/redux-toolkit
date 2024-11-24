import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi( {
    reducerPath: "api3",
    baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:3502' } ),
    tagTypes: ['User3'],
    endpoints: ( build ) => ( {} )
} );