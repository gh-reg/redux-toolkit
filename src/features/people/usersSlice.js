import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice3';

const usersAdapter = createEntityAdapter( {
    sortComparer: ( a, b ) => a.id - b.id
} );

const initialState = usersAdapter.getInitialState();
console.log( 'initialState:', initialState );

export const extendedApiSlice = apiSlice.injectEndpoints( {
    endpoints: build => ( {
        getUsers: build.query( {
            query: () => '/users',
            transformResponse: responseData => {
                return usersAdapter.setAll( initialState, responseData );
            },
            // providesTags: ( result, error, arg ) => [
            //     { type: 'User', id: 'LIST' },
            //     ...result.ids.map( id => ( { type: 'User', id } ) )
            // ]
        } ),

    } )
} );

export const {
    useGetUsersQuery,
} = extendedApiSlice;

const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
);

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors( state => selectUsersData( state ) ?? initialState );