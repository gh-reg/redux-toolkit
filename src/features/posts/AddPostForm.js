import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import styles from './AddPostForm.module.scss';
import { postAdded, postAdded2, addNewPost } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';
import { useNavigate } from 'react-router-dom';

const AddPostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState( '' );
    const [content, setContent] = useState( '' );
    const [userId, setUserId] = useState( '' );
    const [addRequestStatus, setAddRequestStatus] = useState( 'idle' );

    const users = useSelector( selectAllUsers );

    const onTitleChange = e => setTitle( e.target.value );
    const onContentChange = e => setContent( e.target.value );
    const onAuthorChange = e => setUserId( e.target.value );

    const onSavePostClicked = () => {
        if ( title && content ) {
            dispatch(
                postAdded( {
                    id: nanoid(),
                    title,
                    content,
                    userId
                } )
            );

            setTitle( '' );
            setContent( '' );
        }
    };

    // const canSave = Boolean( title ) && Boolean( content ) && Boolean( userId );
    const canSave = [title, content, userId].every( Boolean ) && addRequestStatus === 'idle';

    const onSavePostClicked2 = () => {
        // if ( title && content ) {
        //     dispatch(
        //         postAdded2( title, content, userId )
        //     );

        //     setTitle( '' );
        //     setContent( '' );
        // }
        if ( canSave ) {
            try {
                setAddRequestStatus( 'pending' );
                dispatch( addNewPost( { title, body: content, userId } ) ).unwrap();

                setTitle( '' );
                setContent( '' );
                setUserId( '' );
                navigate( '/' );
            } catch ( err ) {
                console.error( 'Failed to save the post', err );
            }
            finally {
                setAddRequestStatus( 'idle' );
            }
        }
    };


    const usersOptions = users.map( user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ) );

    return (
        <section className={styles.section}>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChange}
                />
                <label htmlFor="postAuthor">Post Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChange}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChange}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                >Save Post</button>
                <button
                    type="button"
                    onClick={onSavePostClicked2}
                    disabled={!canSave}
                >Save Post 2</button>
            </form>
        </section>
    );
};

export default AddPostForm;
