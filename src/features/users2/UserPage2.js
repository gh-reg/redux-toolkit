import { useSelector } from 'react-redux';
import { selectUserById } from './usersSlice';
import { Link, useParams } from 'react-router-dom';
import { useGetPostsByUserIdQuery } from '../posts2/postsSlice';
import { format } from 'date-fns';
import styles from './UserPage2.module.scss';

const UserPage2 = () => {
    const { userId } = useParams();
    const user = useSelector( state => selectUserById( state, Number( userId ) ) );
    if ( !user ) {
        console.log( `NOT FOUND userId: ${userId}, user: `, user );
        // console.log( 'state:', state );
    }

    const {
        data: postsForUser,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsByUserIdQuery( userId );

    // const postTitles = postsForUser.map( post => (
    //     <li key={post.id}>
    //         <Link to={`/post/${post.id}`}>{post.title}</Link>
    //     </li>
    // ) );

    let content;
    if ( isLoading ) {
        content = <p>Loading...</p>;
    }
    else if ( isSuccess ) {
        console.log( `postsForUser ${userId}`, postsForUser );
        const { ids, entities } = postsForUser;
        content = ids.map( id => {
            const post = entities[id];
            const idStr = id.toString().padStart( 4, ' ' );
            const dt = format( post.date, 'MM/dd/yy HH:mm:ss' );
            return (
                <li key={id}>
                    <Link to={`/home2/post/${id}`}>
                        <span className={styles.id}>{idStr}</span>
                        <span className={styles.date}>{dt}</span>{post.title}
                    </Link>
                </li>
            );
        } );
    }
    else if ( isError ) {
        content = <p>{error}</p>;
    }

    return (
        <section>
            <h2>2: {user.name}</h2>
            <ol>{content}</ol>
        </section>
    );
};

export default UserPage2;
