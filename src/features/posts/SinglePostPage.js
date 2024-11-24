import { useSelector } from 'react-redux';
import { selectPostById } from "./postsSlice";

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

import { useParams, Link } from 'react-router-dom';

import styles from './SinglePostPage.module.scss';
// import styles2 from './PostsList.module.scss';

const SinglePostPage = () => {

    // const { postId } = useParams();
    const params = useParams();
    console.log( params );
    const { postId } = params;

    const post = useSelector( ( state ) => selectPostById( state, Number( postId ) ) );

    if ( !post ) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p className={styles.postCredit}>
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                <PostAuthor userId={post.userId} className={styles.postAuthor} />
                <TimeAgo timestamp={post.date} className={styles.timeAgo} />
            </p>
            <ReactionButtons post={post} />
        </article>
    );
};

export default SinglePostPage;
