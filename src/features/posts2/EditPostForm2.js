import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';
import { useParams, useNavigate } from 'react-router-dom';

import { selectAllUsers } from '../users/usersSlice';
import { useUpdatePostMutation, useDeletePostMutation } from './postsSlice';

import styles from "./EditPostForm2.module.scss";

const EditPostForm2 = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [updatePost, { isLoading }] = useUpdatePostMutation();
    const [deletePost] = useDeletePostMutation();

    // const post = useSelector( ( state ) => selectPostById( state, Number( postId ) ) );
    const post = useSelector( ( state ) => selectPostById( state, postId ) );
    const users = useSelector( selectAllUsers );

    const [title, setTitle] = useState( post?.title );
    const [content, setContent] = useState( post?.body );
    const [userId, setUserId] = useState( post?.userId );

    if ( !post ) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    console.log( 'post:', post );

    const onTitleChanged = e => setTitle( e.target.value );
    const onContentChanged = e => setContent( e.target.value );
    const onAuthorChanged = e => setUserId( e.target.value );

    const canSave = [title, content, userId].every( Boolean ) && !isLoading;

    const onSavePostClicked = async () => {
        if ( canSave ) {
            try {
                await updatePost( {
                    id: postId,
                    title,
                    body: content,
                    userId: Number( userId ),
                    reactions: post.reactions
                } ).unwrap();

                setTitle( '' );
                setContent( '' );
                setUserId( '' );
                navigate( `/home2/post/${postId}` );
            } catch ( err ) {
                console.error( 'Failed to save the post', err );
            }
        }
    };

    const userOptions = users.map( user => (
        <option
            key={user.id}
            value={user.id}
        >{user.name}</option>
    ) );

    const onDeletePostClicked = async () => {
        try {
            await deletePost( { id: post.id } ).unwrap();

            setTitle( '' );
            setContent( '' );
            setUserId( '' );
            navigate( '/home2' );
        } catch ( err ) {
            console.error( 'Failed to delete the post', err );
        }
    };

    return (
        <section className={styles.container}>
            <h2>Edit Post 2</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select
                    id="postAuthor"
                    name="postAuthor"
                    defaultValue={userId}
                    onChange={onAuthorChanged}
                >
                    {userOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
                <button
                    type="button"
                    onClick={onDeletePostClicked}
                >Delete Post</button>
            </form>
        </section>
    );
};

export default EditPostForm2;
