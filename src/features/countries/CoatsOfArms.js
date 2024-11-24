// import {} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAllCountries, useGetCountriesQuery } from './countriesSlice';
import Back from '../../components/Back';
import styles from './CoatsOfArms.module.scss';
import { useEffect, useRef, useState } from 'react';

const CoatsOfArms = () => {
    // const result = useGetCountriesQuery();
    // console.log( 'useGetCountriesQuery', result );
    const {
        data,
        isSuccess
    } = useGetCountriesQuery();
    // const countries = useSelector( selectAllCountries );
    // console.log( 'CoatsOfArms', countries );
    const navigate = useNavigate();
    // const ref = useRef( null );
    const refContainer = useRef( null );
    const refTooltip = useRef( null );
    const [visible, setVisible] = useState( false );

    const process10 = ( n ) => {
        console.log( 'process10', n );
        setTimeout( () => {
            try {
                const m = Math.min( n + 20, refContainer.current.children.length );
                for ( let i = n; i < m; i++ ) {
                    let div = refContainer.current.children[i];
                    // div.children[0].src = countries.find( c => c.id === div.id ).coatOfArms?.svg;
                    div.children[0].src = data.entities[div.id].coatOfArms?.svg;
                }
                if ( m !== refContainer.current.children.length ) {
                    process10( m );
                }
            } catch ( err ) {
                console.error( err );
            }
        }, 0 );
    };

    useEffect( () => {
        process10( 0 );
    }, [] );

    const mouseOver = ( e ) => {
        console.log( e );
        const countryId = e.target.parentElement.id;
        // ref.current.innerHTML = countryId;
        setVisible( !!countryId );
        if ( !countryId ) return;
        refTooltip.current.innerHTML = data.entities[countryId].name.common;
        const cell = e.target.getBoundingClientRect();
        console.log( 'div:', cell, 'tooltip:', refTooltip.current );
        // ref.current.innerHTML += ( ' -> ' + cell.top + ' ' + cell.left );
        refTooltip.current.style.top = cell.bottom + 10 + "px";
        refTooltip.current.style.left = cell.left + 10 + "px";
    };

    const onClick = ( e ) => {
        if ( !e.target.parentElement.id ) return;
        navigate( `/api/country/${e.target.parentElement.id}` );
    };

    if ( !isSuccess ) {
        return <div>Loadinng...</div>;
    }

    return (
        <div style={{ position: 'relative' }}>
            <div
                className={styles.container}
                ref={refContainer}
                onMouseOver={mouseOver}
                onClick={onClick}
            >
                {Object.values( data.entities ).filter( ( country, i ) => /* i < 20 && */ country.coatOfArms?.svg ).map( country => (
                    <div className={styles.cell} key={country.id} id={country.id} tooltip="vdffvddds">
                        {/* <img src={country.coatOfArms?.svg} /> */}
                        <img />
                    </div>
                ) )}
            </div>
            <div ref={refTooltip} className={styles.tooltip} style={{ display: !visible ? 'none' : 'block' }} />
            <Back />
            {/* <label ref={ref}></label> */}
        </div>
    );
};

export default CoatsOfArms;
