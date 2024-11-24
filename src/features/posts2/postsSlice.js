import {
    createSelector,
    createEntityAdapter,
    ReducerType
} from '@reduxjs/toolkit';
import { sub } from "date-fns";
import { apiSlice } from '../api/apiSlice2';

const postsAdapter = createEntityAdapter( {
    sortComparer: ( a, b ) => b.date.localeCompare( a.date )
} );

console.log( 'postsAdapter', postsAdapter );

const initialState = postsAdapter.getInitialState();

console.log( 'posts initialState', initialState );

// console.log( 'before export const extendedApiSlice = apiSlice.injectEndpoints( {' );
export const extendedApiSlice = apiSlice.injectEndpoints( {
    endpoints: builder => ( {
        getPosts: builder.query( {
            query: () => '/posts',
            transformResponse: responseData => { // 3:20:09
                // console.log( 'getPosts() -> responseData:', responseData );
                let min = 1;
                const loadedPosts = responseData.map( post => {
                    if ( !post.date ) {
                        // console.log( `getPosts -> transformResponse`, { ...post } );
                        // console.log( post.date, !post.date, !post.date === true );
                        post.date = sub( new Date(), ( { minutes: min++ } ) ).toISOString();
                    }
                    if ( !post.reactions ) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    };
                    // console.log( 'transformed post:', post );
                    return post;
                } );
                return postsAdapter.setAll( initialState, loadedPosts );
            },
            providesTags: ( result, error, arg ) => [
                { type: 'Post', id: 'LIST' },
                ...result.ids.map( id => ( { type: 'Post', id } ) )
            ]
        } ),
        getPostsByUserId: builder.query( {
            query: id => `/posts/?userId=${id}`,
            transformResponse: responseData => {
                let min = 1;
                const loadedPosts = responseData.map( post => {
                    if ( !post.date ) post.date = sub( new Date(), { minutes: min++ } ).toISOString();
                    if ( !postsAdapter.reactions ) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    };
                    return post;
                } );
                return postsAdapter.setAll( initialState, loadedPosts );
            },
            providesTags: ( result, error, arg ) => {
                console.log( result );
                return [
                    ...result.ids.map( id => ( { type: 'Post', id } ) )
                ];
            }
        } ),
        addNewPost: builder.mutation( {
            query: initialPost => ( {
                url: '/posts',
                method: 'POST',
                body: {
                    ...initialPost,
                    userId: Number( initialPost.userId ),
                    date: new Date().toISOString(),
                    ractions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                }
            } ),
            invalidatesTags: [
                { type: 'Post', id: 'LIST' }
            ]
        } ),
        updatePost: builder.mutation( {
            query: initialPost => ( {
                url: `/posts/${initialPost.id}`,
                method: 'PUT',
                body: {
                    ...initialPost,
                    date: new Date().toISOString()
                }
            } ),
            invalidatesTags: ( result, error, arg ) => [
                { type: 'Post', id: arg.id }
            ]
        } ),
        deletePost: builder.mutation( {
            query: ( { id } ) => ( {
                url: `/posts/${id}`,
                method: 'DELETE',
                body: { id }
            } ),
            invalidatesTags: ( result, error, arg ) => [
                { type: 'Post', id: arg.id }
            ]
        } ),
        addReaction: builder.mutation( {
            query: ( { postId, reactions } ) => ( {
                url: `posts/${postId}`,
                method: 'PATCH',
                body: { reactions }
            } ),
            async onQueryStarted( { postId, reactions }, { dispatch, queryFulfilled } ) {
                // 'updateQueryData' requires the endpoint name and cache key arguments,
                // so that it knows which piece of cache state to update
                console.log( 'onQueryStarted' );
                const patchResult = dispatch(
                    extendedApiSlice.util.updateQueryData( 'getPosts', undefined, draft => {
                        // the 'draft' is immer-wrapped and can be 'mutated' like in createSlice
                        const post = draft.entities[postId];
                        console.log( 'extendedApiSlice.util.updateQueryData' );
                        console.log( 'before postId:', postId, 'post', { ...post } );
                        if ( post ) post.reactions = reactions;
                        console.log( 'after postId:', postId, 'post', { ...post } );
                    } )
                );
                try {
                    console.log( 'before await queryFulfilled' );
                    await queryFulfilled;
                    console.log( 'after await queryFulfilled' );
                }
                catch {
                    console.log( 'await queryFulfilled: ERROR' );
                    patchResult.undo();
                }
            }
        } )
    } )
} );
// console.log( 'after export const extendedApiSlice = apiSlice.injectEndpoints( {' );

export const {
    useGetPostsQuery,
    useGetPostsByUserIdQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddReactionMutation
} = extendedApiSlice;

// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

// creates memoized selector
const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data // normalized state object with ids & entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors( state => selectPostsData( state ) ?? initialState );
