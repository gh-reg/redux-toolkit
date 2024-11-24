import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice4';

const countriesAdapter = createEntityAdapter( {
    // sortComparer: ( a, b ) => a.name.common.localeCompare( b.name.common )
    sortComparer: ( a, b ) => Math.random() - 1
} );

const initialState = countriesAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints( {
    endpoints: build => ( {
        getCountries: build.query( {
            query: () => 'countries',
            transformResponse: response => {
                console.log( 'getCountries -> response:', response );
                let id = 1;
                const transformed = response.map( country => {
                    // console.log( '1', country );
                    if ( ( country.id.length ?? 4 ) > 3 ) country.id = ( id++ ).toString();
                    // else console.log( country.id.length );
                    // console.log( '2', country );
                    return country;
                } );
                return countriesAdapter.setAll( initialState, transformed );
            }
        } ),
        getCountryById: build.query( {
            query: ( id ) => `countries/${id}`,
            transformResponse: response => {
                console.log( 'getCountryById -> response:', response );
                return countriesAdapter.setAll( initialState, [response] );
            }
        } )
        // getCountriesByLanguage:build.query({
        //     query: langCode=>''
        // })
    } )
} );

export const {
    useGetCountriesQuery,
    useGetCountryByIdQuery,
} = extendedApiSlice;

const selectCountriesResult = extendedApiSlice.endpoints.getCountries.select();

const selectCountriesData = createSelector(
    selectCountriesResult,
    countriesResult => countriesResult.data
);

export const {
    selectAll: selectAllCountries,
    selectById: selectCountryById,
    selectIds: selectCountryIds
} = countriesAdapter.getSelectors( state => selectCountriesData( state ) ?? initialState );

export const selectCountriesByLanguage = createSelector(
    [selectAllCountries, ( state, lang ) => lang],
    ( countries, lang ) => {
        const lngCountries = countries.filter( country => country.languages?.hasOwnProperty( lang ) )
            .sort( ( a, b ) => a.name.common.localeCompare( b.name.common ) );
        console.log( `selectCountriesByLanguage: '${lang}' ==>`, lngCountries );
        return lngCountries;
    }
);

export const selectCountriesBySubregion = createSelector(
    [selectAllCountries, ( state, subregion ) => {
        // console.log( 'selectCountriesBySubregion ===> state:', subregion, state );
        return subregion;
    }],
    ( countries, subregion ) => {
        const subregionCountries = countries
            .filter( country => country.subregion === subregion )
            .sort( ( a, b ) => a.name.common.localeCompare( b.name.common ) );
        console.log( `selectCountriesBySubregion: '${subregion}' ==>`, subregionCountries );
        return subregionCountries;
    }
);

export const selectCountriesByCca3 = createSelector(
    [selectAllCountries, ( state, arrCca3 ) => arrCca3],
    ( countries, arrCca3 ) => {
        const result = arrCca3.map( cca3 => {
            const country = countries.find( c => c.cca3 === cca3 );
            // console.log( 'country for ' + cca3, country );
            return country;
            // return countries.find( country => country.cca3 === cca3 );
        } );
        console.log( `selectCountriesByCca3: [${arrCca3}] ==>`, result );
        return result;
    }
);

export const selectSubregionsByRegion = createSelector(
    [selectAllCountries, ( state, region ) => region],
    ( countries, region ) => [...new Set( countries
        .filter( country => country.region === region )
        .map( country => country.subregion )
        .sort( ( a, b ) => a.localeCompare( b ) )
    )]
);