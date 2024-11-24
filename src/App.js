import logo from './logo.svg';
import './App.css';
import Counter from './features/counter/Counter';
import PostsList from './features/posts/PostsList';
import PostsList2 from './features/posts2/PostsList2';
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from './features/posts/SinglePostPage';
import EditPostPage from './features/posts/EditPostPage';
import UsersList from './features/users/UsersList';
import UsersList2 from './features/users2/UsersList2';
import UserPage from './features/users/UserPage';
import UserPage2 from './features/users2/UserPage2';
import TodoList from './features/todos/TodoList';
import Layout from './components/Layout';
import { Routes, Route, Navigate } from "react-router-dom";
import EditPostForm2 from './features/posts2/EditPostForm2';
import SinglePostPage2 from './features/posts2/SinglePostPage2';
import AddPostForm2 from './features/posts2/AddPostForm2';
import CountriesList from './features/countries/CountriesList';
import CountryPage from './features/countries/CountryPage';
import { UsersList as UsersList3 } from './features/people/UsersList';
import CountriesByLanguage from './features/countries/CountriesByLanguage';
import CountriesBySubregion from './features/countries/CountriesBySubregion';
import CoatsOfArms from './features/countries/CoatsOfArms';
import RegionPage from './features/countries/RegionPage';
import MapErrorBoundary from './components/MapErrorBoundary';

function App() {
  return (
    // <main className="App">
    //   {/* <Counter /> */}
    //   <AddPostForm />
    //   <PostsList />
    // </main>
    // <MapErrorBoundary>
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostPage />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        <Route path="todo">
          <Route index element={<TodoList />} />
        </Route>

        <Route path="home2">
          <Route index element={<PostsList2 />} />

          <Route path="post">
            <Route index element={<AddPostForm2 />} />
            <Route path=":postId" element={<SinglePostPage2 />} />
            <Route path="edit/:postId" element={<EditPostForm2 />} />
          </Route>

          <Route path="user">
            <Route index element={<UsersList2 />} />
            <Route path=":userId" element={<UserPage2 />} />
          </Route>
          {/* <Route path="post/edit/:postId" element={<EditPostForm2 />} /> */}
        </Route>

        <Route path="api/user">
          <Route index element={<UsersList3 />} />
        </Route>

        <Route path="api/country">
          <Route index element={<CountriesList />} />
          <Route path=":countryId" element={<MapErrorBoundary><CountryPage /></MapErrorBoundary>} />
          <Route path="lang/:lang" element={<CountriesByLanguage />} />
          <Route path="reg/:region" element={<RegionPage />} />
          <Route path="sub/:subregion" element={<CountriesBySubregion />} />
          <Route path="coa" element={<CoatsOfArms />} />
        </Route>
        {/* Catch all - replace with 404 component */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Route>
    </Routes>
    // {/* </MapErrorBoundary> */ }
  );
}

export default App;
