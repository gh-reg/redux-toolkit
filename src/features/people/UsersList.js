import { useSelector } from 'react-redux';
import { useGetUsersQuery, selectAllUsers } from './usersSlice';
import styles from './UsersList.module.scss';

export const UsersList = () => {
    console.log( 'UsersList...' );
    const {
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery();

    const users = useSelector( selectAllUsers );

    console.log( 'users 3:', users );

    let content;
    if ( isLoading ) {
        content = <p>Loading...</p>;
    }
    else if ( isError ) {
        content = <p>{error}</p>;
    }
    else if ( isSuccess ) {
        content = users.map( user => (
            <li key={user.id}>
                <span className={styles.id}>{user.id}</span>
                <span className={styles.name}>{user.first_name} {user.last_name}</span>
                <span className={styles.email}>{user.email}</span>
            </li>
        ) );
    }

    return (
        <div className={styles.userList}>
            <ul>{content}</ul>
        </div>
    );
};

// export default UsersList;
