import PostAuthor2 from "./PostAuthor2";
import TimeAgo from "../posts/TimeAgo";
import ReactionButtons2 from './ReactionButtons2';
import { Link } from 'react-router-dom';
import styles from './PostsList2.module.scss';
import React from 'react';
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

let PostsExcerpt2 = ( { postId } ) => {
    const post = useSelector( state => selectPostById( state, postId ) );

    return (
        <article className={styles.excerptArticle}>
            <h2>{post.title}</h2>
            {/* <p>{post.body.substring( 0, 100 )}</p> */}
            <p className={styles.excerpt}>{post.body.substring( 0, 75 ) + ( post.body.length > 75 ? '...' : '' )}</p>
            <p className={styles.postCredit}>
                <Link to={`post/${post.id}`}>View Post</Link>
                <PostAuthor2 userId={post.userId} className={styles.postAuthor} />
                <TimeAgo timestamp={post.date} className={styles.timeAgo} />
            </p>
            <ReactionButtons2 post={post} className={styles.reactionButton} />
        </article>
    );
};

PostsExcerpt2 = React.memo( PostsExcerpt2 );

export default PostsExcerpt2;
