import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users2/usersSlice';

const PostAuthor2 = ( { userId, className } ) => {
    const users = useSelector( selectAllUsers );
    // console.log( 'users', users );
    const author = users.find( user => user.id.toString() === userId.toString() );

    return (
        <span>by {author
            ? <Link to={`/home2/user/${userId}`}>{author.name}</Link>
            : 'Unknown author'}</span>
    );
};

export default PostAuthor2;
