import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from './ReactionButtons';
import { Link } from 'react-router-dom';
import styles from './PostsList.module.scss';
import React from 'react';
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

let PostsExcerpt = ( { postId } ) => {
    const post = useSelector( state => selectPostById( state, postId ) );

    return (
        <article className={styles.excerptArticle}>
            <h2>{post.title}</h2>
            {/* <p>{post.body.substring( 0, 100 )}</p> */}
            <p className={styles.excerpt}>{post.body.substring( 0, 75 )}...</p>
            <p className={styles.postCredit}>
                <Link to={`post/${post.id}`}>View Post</Link>
                <PostAuthor userId={post.userId} className={styles.postAuthor} />
                <TimeAgo timestamp={post.date} className={styles.timeAgo} />
            </p>
            <ReactionButtons post={post} className={styles.reactionButton} />
        </article>
    );
};

PostsExcerpt = React.memo( PostsExcerpt );

export default PostsExcerpt;
