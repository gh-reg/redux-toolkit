import { useGetCountriesQuery, selectSubregionsByRegion } from './countriesSlice';
import { useSelector } from 'react-redux';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';

import React from 'react';

const RegionPage = () => {
    const navigate = useNavigate();
    const { region } = useParams();
    const [searchParams] = useSearchParams();
    const lang = searchParams.get( 'lang' );
    const subregions = useSelector( state => selectSubregionsByRegion( state, region ) )
        .sort( ( a, b ) => a.localeCompare( b ) );

    const handleBack = ( e ) => {
        // console.log( 'EVENT:', e );
        e.preventDefault();
        navigate( -1 );
    };
    return (
        <section>
            <h2>Region: {region}</h2>
            {/* {isSuccess && subregions.map( subregion => (
                <div key={subregion}><Link to={`/api/country/sub/${subregion}?lang=${lang}`}>{subregion}</Link></div>
            ) )} */}
            {subregions?.map( subregion => (
                <div key={subregion}><Link to={`/api/country/sub/${subregion}?lang=${lang}`}>{subregion}</Link></div>
            ) )}

            <a
                href="#"
                style={{
                    display: 'flex',
                    width: 200,
                    justifyContent: 'flex-end',
                    marginTop: 15,
                }}
                onClick={( e ) => handleBack( e )}
            >Back</a>
        </section>
    );
};

export default RegionPage;
