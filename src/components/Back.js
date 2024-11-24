import { useNavigate } from 'react-router-dom';

const Back = ( props ) => {
    const navigate = useNavigate();

    const handleBack = ( e ) => {
        e.preventDefault();
        navigate( -1 );
    };

    return (
        <a
            href="#"
            style={{
                display: 'flex',
                width: props.width || 200,
                justifyContent: 'flex-end',
                marginTop: props.marginTop || 15,
            }}
            onClick={( e ) => handleBack( e )}
        >Back</a>
    );
};

export default Back;
