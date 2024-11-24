import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users2/usersSlice';
import { useNavigate } from 'react-router-dom';
import { useAddNewPostMutation } from './postsSlice';
import styles from './AddPostForm2.module.scss';

const AddPostForm2 = () => {
    const [addNewPost, { isLoading }] = useAddNewPostMutation();

    const navigate = useNavigate();

    const [title, setTitle] = useState( '' );
    const [content, setContent] = useState( '' );
    const [userId, setUserId] = useState( '' );

    const users = useSelector( selectAllUsers );

    const onTitleChange = e => setTitle( e.target.value );
    const onContentChange = e => setContent( e.target.value );
    const onAuthorChange = e => setUserId( e.target.value );

    const canSave = [title, content, userId].every( Boolean ) && !isLoading;

    const onSavePostClicked = async () => {
        if ( canSave ) {
            try {
                await addNewPost( { title, body: content, userId } ).unwrap();

                setTitle( '' );
                setContent( '' );
                setUserId( '' );
                navigate( '/home2' );
            } catch ( err ) {
                console.error( 'Failed to save the post', err );
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
            <h2>Add a New Post 2</h2>
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
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
    );
};

export default AddPostForm2;
