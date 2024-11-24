import { useSelector } from 'react-redux';
import { selectPostById } from "./postsSlice";

import TimeAgo from '../posts/TimeAgo';
import ReactionButtons from './ReactionButtons2';

import { useParams, Link } from 'react-router-dom';

import styles from './SinglePostPage2.module.scss';
import PostAuthor2 from './PostAuthor2';
// import styles2 from './PostsList.module.scss';

const SinglePostPage2 = () => {

    // const { postId } = useParams();
    const params = useParams();
    // console.log( params );
    const { postId } = params;

    // const post = useSelector( ( state ) => selectPostById( state, Number( postId ) ) );
    const post = useSelector( ( state ) => selectPostById( state, postId ) );

    if ( !post ) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    return (
        <article>
            <h2>2 - {post.title}</h2>
            <p>{post.body}</p>
            <p className={styles.postCredit}>
                <Link to={`/home2/post/edit/${post.id}`}>Edit Post</Link>
                <PostAuthor2 userId={post.userId} className={styles.postAuthor} />
                <TimeAgo timestamp={post.date} className={styles.timeAgo} />
            </p>
            <ReactionButtons post={post} />
        </article>
    );
};

export default SinglePostPage2;
