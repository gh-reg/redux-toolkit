import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';

import React from 'react';

const PostAuthor = ( { userId, className } ) => {
    // console.log( 'props:', className );
    const users = useSelector( selectAllUsers );

    const author = users.find( user => user.id === userId );

    return (
        <span className={className}>by {author ? author.name : 'Unknown author'}</span>
    );
};

export default PostAuthor;
