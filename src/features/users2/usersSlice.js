import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { apiSlice } from '../api/apiSlice2';

const usersAdapter = createEntityAdapter( {
    // sortComparer: ( a, b ) => a.name.localeCompare( b.name ) //a.id - b.id
    sortComparer: ( a, b ) => a.id - b.id
} );

console.log( 'usersAdapter', usersAdapter );

const initialState = usersAdapter.getInitialState();

console.log( 'users initialState', initialState );

export const extendedApiSlice = apiSlice.injectEndpoints( {
    endpoints: builder => ( {
        getUsers: builder.query( {
            query: () => '/users',
            transformResponse: responseData => {
                console.log( 'users:', responseData );
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
    useGetUsersQuery
} = extendedApiSlice;

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids & entities
);

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors( state => selectUsersData( state ) ?? initialState );


