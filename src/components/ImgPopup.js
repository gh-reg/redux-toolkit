import { useEffect, useLayoutEffect, useRef, useState } from "react";

const ImgPopup = ( { src, isVisible, onClickCb, ...props } ) => {
    const [imgWidth, setImgWidth] = useState( 30 );
    const [mode, setMode] = useState( 'dark' );
    const refDiv = useRef( null );
    const refImg = useRef( null );

    useEffect( () => {
        if ( !isVisible ) {
            setImgWidth( 30 );
            setMode( 'dark' );
        }
    }, [isVisible] );

    useLayoutEffect( () => {
        const img = refImg.current.getBoundingClientRect();
        if ( img.width !== 30 ) return;
        const container = refDiv.current.getBoundingClientRect();
        setImgWidth( img.width * Math.min( container.height / img.height, container.width / img.width ) / 1.1 );
    } );

    const onClickBtn = ( e ) => {
        e.stopPropagation();
        setMode( mode => mode === 'dark' ? 'light' : 'dark' );
    };

    return (
        <div
            ref={refDiv}
            onClick={onClickCb}
            style={{
                position: 'absolute',
                display: isVisible ? 'flex' : 'none',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 3,
                boxSizing: 'border-box',
                margin: 0,
                padding: 0,
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                background: mode === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
            }}
        >
            <div style={{ position: 'absolute', zIndex: 5, top: 5, left: 5, }}>
                <button
                    type="button"
                    onClick={onClickBtn}
                    style={{
                        borderRadius: 10,
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        width: 120,
                        height: 50,
                        cursor: 'pointer',
                        backgroundColor: mode === 'dark' ? 'white' : 'black',
                        color: mode === 'dark' ? 'black' : 'white',
                    }}
                >
                    {mode === 'dark' ? 'Light' : 'Dark'}
                </button>
            </div>
            <img ref={refImg} src={src} width={imgWidth} />
        </div>
    );
};

export default ImgPopup;
