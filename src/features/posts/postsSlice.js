import {
    createSlice,
    nanoid,
    createAsyncThunk,
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit';
import { sub } from "date-fns";
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const postsAdapter = createEntityAdapter( {
    sortComparer: ( a, b ) => b.date.localeCompare( a.date )
} );
const initialState_old = [
    {
        id: 1,
        title: "Learning Redux Toolkit",
        content: "I've heared good things.",
        date: sub( new Date(), { minutes: 10 } ).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {
        id: 2,
        title: "Slices...",
        content: "The more I say slice, the more I want pizza.",
        date: sub( new Date(), { minutes: 5 } ).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
];

const initialState = postsAdapter.getInitialState( {
    // posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    count: 0
} );

export const fetchPosts = createAsyncThunk( 'posts/fetchPosts',
    async () => {
        try {
            console.log( 'fetching posts' );
            const response = await axios.get( POSTS_URL /*+ '?_limit=2'*/ ); // + '?_limit=12'
            console.log( 'fetchPosts response:', response );
            return response.data;
        } catch ( err ) {
            return err.message;
        }
    } );

export const addNewPost = createAsyncThunk( 'posts/addNewPost',
    async ( initialPost ) => {
        try {
            // const response = await axios.post( POSTS_URL, initialPost );
            const response = await axios.post( 'https://jsonplaceholder.typicode.com/posts', initialPost );
            console.log( 'addNewPost response:', response );
            return response.data;
        } catch ( err ) {
            return err.message;
        }
    } );

export const updatePost = createAsyncThunk( 'posts/updatePost',
    async ( initialPost ) => {
        const { id } = initialPost;
        try {
            const response = await axios.put( `${POSTS_URL}/${id}`, initialPost );
            console.log( 'updatePost response:', response );
            return response.data;
        } catch ( err ) {
            // return err.message;
            return initialPost;
        }
    } );

export const deletePost = createAsyncThunk( 'posts/deletePost',
    async ( initialPost ) => {
        console.log( 'deletePost initialPost:', initialPost );
        const { id } = initialPost;
        try {
            const response = await axios.delete( `${POSTS_URL}/${id}` );
            if ( response?.status === 200 ) return initialPost;
            return `${response?.status}: ${( await response ).statusText}`;
        } catch ( err ) {
            return err.message;
        }
    } );

const postsSlice = createSlice( {
    name: "posts",
    initialState,
    reducers: {
        postAdded( state, action ) {
            state.posts.push( action.payload );
        },
        postAdded2: {
            reducer( state, action ) {
                state.posts.push( action.payload );
                console.log( 'posts', state.posts, action.payload );
            },
            prepare( title, body, userId ) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        body,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                };
            }
        },
        reactionAdded( state, action ) {
            const { postId, reaction } = action.payload;
            // const existingPost = state.posts.find( post => post.id === postId );
            const existingPost = state.entities[postId];
            if ( existingPost ) {
                existingPost.reactions[reaction]++;
            }
        },
        increaseCount( state, action ) {
            console.log( 'postsSlice.increaseCount()' );
            state.count = state.count + 1;
        }
    },
    extraReducers( builder ) {
        builder
            .addCase( fetchPosts.pending, ( state, action ) => {
                state.status = 'loading';
            } )
            .addCase( fetchPosts.fulfilled, ( state, action ) => {
                state.status = 'succeeded';
                let min = 1;
                const loadedPosts = action.payload.map( post => {
                    post.date = sub( new Date(), { minutes: min++ } ).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    };
                    return post;
                } );

                // // console.log( `1. state.posts: ${state.posts.length}; loadedPosts: ${loadedPosts.length}` );
                // state.posts = state.posts.concat( loadedPosts.filter( post => !state.posts.map( p => p.id ).includes( post.id ) ) );
                // // console.log( `2. state.posts: ${state.posts.length}; loadedPosts: ${loadedPosts.length}` );
                postsAdapter.upsertMany( state, loadedPosts );
            } )
            .addCase( fetchPosts.rejected, ( state, action ) => {
                state.status = 'failed';
                state.error = action.error.message;
            } )
            .addCase( addNewPost.fulfilled, ( state, action ) => {
                // console.log( '.addCase - before', { ...action.payload } );
                action.payload.userId = Number( action.payload.userId );
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                };
                // console.log( '.addCase - after', action.payload );
                // state.posts.push( action.payload );
                postsAdapter.addOne( state, action.payload );
            } )
            .addCase( updatePost.fulfilled, ( state, action ) => {
                console.log( 'updatePost action:', action );
                if ( !action.payload?.id ) {
                    console.log( 'Update could not complete' );
                    console.log( action.payload );
                    return;
                }
                // const { id } = action.payload;
                action.payload.date = new Date().toISOString();
                // action.payload.reactions = {
                //     thumbsUp: 0,
                //     wow: 0,
                //     heart: 0,
                //     rocket: 0,
                //     coffee: 0
                // };

                // const posts = state.posts.filter( post => post.id !== id );
                // state.posts = [...posts, action.payload];
                postsAdapter.upsertOne( state, action.payload );
            } )
            .addCase( deletePost.fulfilled, ( state, action ) => {
                console.log( 'deletePost action:', action );
                if ( !action.payload?.id ) {
                    console.log( 'Delete could not complete' );
                    console.log( action.payload );
                    return;
                }
                const { id } = action.payload;
                // const posts = state.posts.filter( post => post.id !== id );
                // state.posts = posts;
                postsAdapter.removeOne( state, id );
            } );
    }
} );

export const selectAllPosts_old = ( state ) => state.posts;
// export const selectAllPosts = ( state ) => {
//     console.log( state );
//     return state.posts;
// };
// export const selectAllPosts = ( state ) => state.posts.posts;
// export const selectPostById = ( state, postId ) =>
//     state.posts.posts.find( post => post.id === postId );


// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors( state => state.posts );

export const selectPostsByUser = createSelector(
    [selectAllPosts, ( state, userId ) => userId],
    ( posts, userId ) => posts.filter( post => post.userId === userId )
);

export const getPostsStatus = ( state ) => state.posts.status;
export const getPostsError = ( state ) => state.posts.error;
export const getPostsCount = ( state ) => state.posts.count;

export const { postAdded, postAdded2, reactionAdded, increaseCount } = postsSlice.actions;

export default postsSlice.reducer;