import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import { apiSlice } from '../features/api/apiSlice';
import { apiSlice as apiSlice2 } from '../features/api/apiSlice2';
import { apiSlice as apiSlice3 } from '../features/api/apiSlice3';
import { apiSlice as apiSlice4 } from '../features/api/apiSlice4';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore( {
    reducer: {
        counter: counterReducer,
        posts: postsReducer,
        users: usersReducer,
        api: apiSlice.reducer,
        [apiSlice2.reducerPath]: apiSlice2.reducer,
        [apiSlice3.reducerPath]: apiSlice3.reducer,
        [apiSlice4.reducerPath]: apiSlice4.reducer,
    },
    middleware: ( getDefaultMiddleware ) =>
        getDefaultMiddleware( {
            serializableCheck: false
        } )
            .concat( apiSlice.middleware )
            .concat( apiSlice2.middleware )
            .concat( apiSlice3.middleware )
            .concat( apiSlice4.middleware )
} );

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners( store.dispatch );