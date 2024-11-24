import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import styles from './SortArrows.module.scss';

const SortArrows = ( { dir, setDir } ) => {
    const onUp = () => {
        setDir( dir === 'asc' ? '' : 'asc' );
    };
    const onDown = () => {
        setDir( dir === 'desc' ? '' : 'desc' );
    };
    return (
        <div className={styles.cont}>
            <FontAwesomeIcon
                icon={faSortUp}
                size="xl"
                color={dir === 'asc' ? '#00cc00' : '#aaaaaa'}

            />
            <FontAwesomeIcon
                icon={faSortDown}
                size="xl"
                color={dir === 'desc' ? '#00cc00' : '#aaaaaa'}
            />
            <div onClick={onUp} />
            <div onClick={onDown} />
        </div>
    );
};

export default SortArrows;
