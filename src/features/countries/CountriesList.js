import { useSelector } from 'react-redux';
import { useGetCountriesQuery, selectAllCountries, } from './countriesSlice';
import styles from './CountriesList.module.scss';
import { useEffect, useState } from 'react';
import SortArrows from '../../components/SortArrows';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQueryParams';
import { FilteSortable } from '../../classes/FilteSortable';


const CountriesList = () => {
    const [, setSearchParams] = useSearchParams();
    const [queryParams, setQueryParams] = useState( useQueryParams() );
    console.log( 'CountriesList -> query string params:', queryParams );

    const [id, setId] = useState( queryParams['id'] || '' );
    const [name, setName] = useState( queryParams['name'] || '' );
    const [capital, setCapital] = useState( queryParams['capital'] || '' );
    const [region, setRegion] = useState( queryParams['region'] || '' );
    const [top, setTop] = useState( queryParams['top'] || 0 );
    const [dirName, setDirName] = useState( 'asc' );
    const [dirCapital, setDirCapital] = useState( '' );
    const [dirRegion, setDirRegion] = useState( '' );
    const [dirPopulation, setDirPopulation] = useState( queryParams['dirPop'] || '' );
    const [dirArea, setDirArea] = useState( queryParams['dirArea'] || '' );

    const createHandler = ( setValFn, queryParamName ) => eventOrValue => {
        const value = eventOrValue.target?.value ?? eventOrValue;
        if ( !value ) delete queryParams[queryParamName];
        else queryParams[queryParamName] = value;
        setQueryParams( { ...queryParams } );
        setValFn( value );
    };

    const setDirPopulationW = createHandler( setDirPopulation, 'dirPop' );
    const setDirAreaW = createHandler( setDirArea, 'dirArea' );

    useEffect( () => {
        console.log( 'useEffect -> params:', queryParams );
        setSearchParams( queryParams, { replace: true } );
    }, [queryParams] );

    // const cs = localStorage.getItem( 'country_search' );
    // let searchParams = cs ? JSON.parse( cs ) : {};
    // console.log( 'searchParams:', searchParams );
    // const [name, setName] = useState( searchParams.name || '' );

    // const setNameW = s => {
    //     searchParams.name = s;
    //     localStorage.setItem( 'country_search', JSON.stringify( searchParams ) );
    //     setName( s );
    // };
    const { isLoading, isSuccess, isError, error } = useGetCountriesQuery();
    const countries = useSelector( selectAllCountries );

    let content;
    if ( isSuccess ) {
        const getCapital = country =>
            (
                Array.isArray( country.capital )
                    ? country.capital[0]
                    : country.capital
            ) ?? '';

        let orderedCountries = new FilteSortable( countries )
            .filter( x => x.name.common, name )
            .filter( x => x.id, id )
            .filter( x => getCapital( x ), capital )
            .filter( x => x.region, region )
            .sort( x => x.name.common, 'string', dirName )
            .sort( x => getCapital( x ), 'string', dirCapital )
            .sort( x => x.population, 'number', dirPopulation )
            .sort( x => x.area, 'number', dirArea )
            .sort( x => x.region, 'string', dirRegion )
            .selectTopBy( x => x.region, top );

        content = orderedCountries.map( ( country, idx ) => (
            <li key={country.id}>
                <span className={styles.no}>{idx + 1}.</span>
                <span className={styles.id}>{country.id}</span>
                <span className={styles.name}><Link to={`/api/country/${country.id}`}>{country.name.common}</Link></span>
                <span className={styles.capital}>{country.capital ?? String.fromCharCode( "\U+00a0" )}</span>
                <span className={styles.region}>{country.region}</span>
                <span className={styles.population}>{new Intl.NumberFormat( "en-EN" ).format( country.population )}</span>
                <span className={styles.area}>{new Intl.NumberFormat( "en-EN" ).format( country.area )}</span>
            </li>
        ) );
    };

    return (
        <div>
            <ul>
                <li>
                    <input
                        type="text"
                        className={styles.id}
                        value={id}
                        onChange={createHandler( setId, 'id' )}
                    />
                    <input
                        type="text"
                        className={styles.name}
                        value={name}
                        onChange={createHandler( setName, 'name' )}
                    />
                    <SortArrows dir={dirName} setDir={setDirName} />
                    <input
                        type="text"
                        className={styles.capital}
                        value={capital}
                        onChange={createHandler( setCapital, 'capital' )}
                    />
                    <SortArrows dir={dirCapital} setDir={setDirCapital} />
                    <input
                        type="text"
                        className={styles.region}
                        value={region}
                        onChange={createHandler( setRegion, 'region' )}
                    />
                    <SortArrows dir={dirRegion} setDir={setDirRegion} />
                    <span className={styles.dirPopulation} />
                    <SortArrows dir={dirPopulation} setDir={( dir ) => { setDirPopulationW( dir ); setDirAreaW( '' ); }} />
                    <span className={styles.top}>top-</span>
                    <input
                        type="number"
                        value={top}
                        onChange={createHandler( setTop, 'top' )}
                    />
                    <SortArrows dir={dirArea} setDir={( dir ) => { setDirAreaW( dir ); setDirPopulationW( '' ); }} />
                </li>
                {content}
            </ul>
        </div>
    );
};

export default CountriesList;;
