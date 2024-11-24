import { useSelector, /*useDispatch*/ } from 'react-redux';
import { selectAllPosts, selectPostIds, getPostsStatus, getPostsError/*, fetchPosts*/ } from './postsSlice';
import { useEffect } from 'react';
import PostsExcerpt from "./PostsExcerpt";

import styles from './PostsList.module.scss';

const PostsList = () => {
    // const dispatch = useDispatch();
    // const posts = useSelector( ( state ) => state.posts );
    // const posts = useSelector( selectAllPosts );
    const orderedPostIds = useSelector( selectPostIds );
    const postsStatus = useSelector( getPostsStatus );
    const error = useSelector( getPostsError );

    // useEffect( () => {
    //     if ( postsStatus === 'idle' ) {
    //         // console.log( 'calling fetchPosts from useEffect' );
    //         dispatch( fetchPosts() );
    //     }
    // }, [postsStatus, dispatch] );

    let content;
    if ( postsStatus === 'loading' ) {
        content = <p>Loading...</p>;
    }
    else if ( postsStatus === 'succeeded' ) {
        // const orderedPosts = posts.slice().sort( ( a, b ) => b.date.localeCompare( a.date ) );
        // content = orderedPosts.map( post => (
        //     <PostsExcerpt key={post.id} post={post} />
        // ) );
        content = orderedPostIds.map( postId => <PostsExcerpt key={postId} postId={postId} /> );
    }
    else if ( postsStatus === 'failed' ) {
        content = <p>{error}</p>;
    }

    return (
        <section className={styles.main}>
            {/* <h2>Posts</h2> */}
            {content}
        </section>
    );
};

export default PostsList;
