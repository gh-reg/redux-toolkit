import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCount, getPostsCount } from '../features/posts/postsSlice';
import styles from './components.module.scss';

const Header = () => {
    const dispatch = useDispatch();
    const count = useSelector( getPostsCount );

    console.log( 'rendering Header' );

    return (
        <header className={styles.Header}>
            <h1>Redux Blog</h1>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="post">Posts</Link></li>
                        <li><Link to="user">Users</Link></li>
                        <li><Link to="todo">Todos</Link></li>
                        <li><Link to="home2">Home2</Link></li>
                        <li><Link to="home2/post">Post</Link></li>
                        <li><Link to="home2/user">Users</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="api/user">People</Link></li>
                        <li><Link to="api/country">Countries</Link></li>
                        <li><Link to="api/country/coa">CoA</Link></li>
                    </ul>
                </nav>
                <button
                    type="button"
                    onClick={() => dispatch( increaseCount() )}
                >{count}</button>
            </div>
        </header>
    );
};

export default Header;
