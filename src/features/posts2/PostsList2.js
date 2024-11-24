import { useSelector } from 'react-redux';
import { selectPostIds, useGetPostsQuery } from './postsSlice';
import PostsExcerpt2 from '../posts2/PostsExcerpt2';
import styles from './PostsList2.module.scss';

const PostsList2 = () => {
    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery();

    const orderedPostIds = useSelector( selectPostIds );

    let content;
    if ( isLoading ) {
        content = <p>Loading...</p>;
    }
    else if ( isSuccess ) {
        content = orderedPostIds.map( id => <PostsExcerpt2 key={id} postId={id} /> );
    }
    else if ( isError ) {
        content = <p>{error.message}</p>;
    }

    // console.log( 'before rendering PostsList2', content );
    return (
        <section className={styles.main}>
            {content}
        </section>
    );
};

export default PostsList2;
