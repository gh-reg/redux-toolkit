import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { fetchUsers } from "./features/users/usersSlice";
import { fetchPosts } from './features/posts/postsSlice';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { apiSllice } from './features/api/apiSlice';
import { extendedApiSlice } from './features/posts2/postsSlice';
import { extendedApiSlice as extendedApiSlice2 } from './features/users2/usersSlice';
import { extendedApiSlice as extendedApiSlice3 } from './features/people/usersSlice';
import { extendedApiSlice as extendedApiSlice4 } from './features/countries/countriesSlice';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

console.log( 'index.js' );
store.dispatch( fetchPosts() );
store.dispatch( fetchUsers() );
store.dispatch( extendedApiSlice.endpoints.getPosts.initiate() );
store.dispatch( extendedApiSlice2.endpoints.getUsers.initiate() );
store.dispatch( extendedApiSlice3.endpoints.getUsers.initiate() );
store.dispatch( extendedApiSlice4.endpoints.getCountries.initiate() );
console.log( `index.js -> store: `, store );

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <React.StrictMode>
    {/* <ApiProvider api={apiSllice}> */}
    <Provider store={store}>

      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>

    </Provider>
    {/* </ApiProvider> */}
  </React.StrictMode>
);

