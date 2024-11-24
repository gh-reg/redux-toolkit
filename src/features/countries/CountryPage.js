import { useState, useRef } from 'react';
import MapErrorBoundary from '../../components/MapErrorBoundary';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    selectCountryById,
    selectCountriesByCca3,
    useGetCountryByIdQuery,
    useGetCountriesQuery
} from './countriesSlice';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import styles from './CountryPage.module.scss';
import TestErr from '../../components/TestErr';
import ImgPopup from '../../components/ImgPopup';

const emptyBordersArray = [];

const CountryPage = () => {
    const navigate = useNavigate();
    // console.log( 'PARAMS: ', useParams() );
    const { countryId } = useParams();
    const [lang, setLang] = useState( localStorage.getItem( 'CountryPage_lang' ) || 'rus' );
    // const [borders, setBorders] = useState( [] );

    // const {
    //     data: countryById,
    //     isSuccess,
    //     isFetching,
    //     isLoading,
    //     isError,
    //     error
    // } = useGetCountryByIdQuery( countryId );
    const {
        isSuccess,
        isFetching,
        isLoading,
        isError,
        error
    } = useGetCountriesQuery();
    // if ( !isSuccess ) {
    //     return (
    //         <p>Loading...</p>
    //     );
    // }
    const country = useSelector( state => selectCountryById( state, countryId ) );
    const borders = useSelector( state => selectCountriesByCca3( state, country?.borders ?? emptyBordersArray ) );
    // console.log( 'countryById, borders:', country, borders );

    const [flagVisible, setFlagVisible] = useState( false );
    const [coaVisible, setCoaVisible] = useState( false );
    const refFlag = useRef();
    const refCoa = useRef();

    const setLangW = lang => {
        localStorage.setItem( 'CountryPage_lang', lang );
        setLang( lang );
    };

    if ( isError ) {
        return (
            <>
                <h2>ERROR</h2>
                <p>{error}</p>
            </>
        );
    }
    else if ( !isSuccess ) {
        return (
            <p>Loading...</p>
        );
    }
    // console.log( 'countryById:', countryById );
    // const country = countryById.entities[countryById.ids[0]];

    const onImgClick = ( e, src ) => {
        console.log( e.target.style, e.target.width, e );
        e.target.width = 100;
        e.target.height = 100;
        e.target.backgroundColor = 'red';
    };

    let langOptions;
    if ( country.translations ) {
        langOptions = Object.keys( country.translations ).map( lng => (
            <option id={lng} key={lng} value={lng}>{lng}</option>
        ) );
    }

    return (
        <section className={styles.country}>
            <ImgPopup
                src={country.coatOfArms?.svg}
                onClickCb={() => setCoaVisible( false )}
                isVisible={coaVisible}
            />
            <ImgPopup
                src={country.flags?.svg ?? country.flags?.png}
                onClickCb={() => setFlagVisible( false )}
                isVisible={flagVisible}
            />
            {/* <label className={styles.flag}>Flag:</label>{country.flag}<br /> */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2, marginTop: 3 }}>
                <img src={country.flags?.svg} onClick={() => setFlagVisible( true )} className={styles.smallImg} />
                <img ref={refCoa} src={country.coatOfArms?.svg} onClick={() => setCoaVisible( true )} className={styles.smallImg} />
                <label style={{ backgroundColor: 'transparent', marginLeft: 30, marginBottom: 0 }}> Translate Name to</label>
                <select value={lang} onChange={( e ) => setLangW( e.target.value )}>
                    {langOptions}
                </select>
            </div>
            <label>Common Name: </label>
            <span>{country.name.common}</span>
            <span> ( {country.translations[lang]?.common} )</span> <br />
            <label>Official Name: </label>
            <span>{country.name.official}</span>
            <span> ( {country.translations[lang]?.official} )</span> <br />
            <label>Population: </label>
            <span>{new Intl.NumberFormat( "en-EN" ).format( country.population )}</span><br />
            <label>Area: </label>
            <span>{new Intl.NumberFormat( "en-EN" ).format( country.area )}</span><br />
            <label>Capital: </label>
            <span>{country.capital}</span><br />
            <label>Independent</label>
            <input readOnly type="checkbox" checked={country.independent} /><br />
            <label>Status: </label>
            <span>{country.status}</span><br />
            <label>UN Member</label>
            <input readOnly type="checkbox" checked={country.unMember} /><br />
            {country.currencies &&
                <ul className={styles.currencies}><label>Currencies:</label>
                    {Object.entries( country.currencies ).map( ( [key, value] ) => (
                        <li key={key}>
                            <span>{key}</span>
                            <span>{value.symbol}</span>
                            <span>{value.name}</span>
                        </li>
                    ) )}
                </ul>
            }
            <label>Traffic: </label>
            <span>{country.car.side}-side</span><br />
            <label>Timezones: </label>
            <span>{country.timezones.join( ', ' )}</span><br />
            <label>Region: </label>
            <span><Link to={`/api/country/reg/${country.region}?lang=${lang}`}>{country.region}</Link></span><br />
            <label>Subregion: </label>
            <span>
                <Link to={`/api/country/sub/${country.subregion}?lang=${lang}`}>{country.subregion}</Link>
            </span><br />
            <label>Borders: </label>
            <span className={styles.trBorders1}>{country.borders?.map( ( cca3, idx ) => {
                const name = borders[idx].name.common;
                const id = borders[idx].id;
                return (
                    <Link key={cca3} to={`/api/country/${id}`}>{idx > 0 ? ', ' : ''}{name}</Link>
                );
            } )}</span><br />
            <span className={styles.trBorders2}>{country.borders?.map( ( cca3, idx ) => {
                const name = borders[idx].translations[lang]?.common;
                const id = borders[idx].id;
                return (
                    <Link key={cca3} to={`/api/country/${id}`}>{idx > 0 ? ', ' : ''}{name}</Link>
                );
            } )}</span>
            <br />
            <label>Languages: </label>
            <span>{Object.entries( country.languages ?? [] ).map( ( [key, value], idx ) => {
                return (
                    <Link key={key} to={`/api/country/lang/${key}`}>{idx > 0 ? ', ' : ''}{value}</Link>
                );
            } )}</span>

            {/* <div style="text-decoration:none; overflow:hidden;max-width:100%;width:500px;height:500px;">
                <div id="embed-ded-map-canvas" style="height:100%; width:100%;max-width:100%;">
                    <iframe style={{ height: '100%', width: '100%', border: 0 }} frameborder="0" src="https://www.google.com/maps/embed/v1/view?zoom=10¢er=40.7128,-74.0060&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8">
                    </iframe>
                </div>
                <a class="my-codefor-googlemap" rel="nofollow" href="https://www.bootstrapskins.com/themes" id="inject-map-data">premium bootstrap themes</a> 
            <style>#embed-ded-map-canvas img{{ maxHeight: none, maxWidth: noneimportant; background: noneimportant; }</style>
        </div> */}

            {/* {country.latlng.toString()} */}

            <div className={styles.links}>
                <Link to={country.maps.openStreetMaps} target="_blank">OpenStreetMap</Link>
                <Link to={country.maps.googleMaps} target="_blank">Google Maps</Link>
                <a href="#" onClick={( e ) => { e.preventDefault(); navigate( -1 ); }}>Back</a>
                <Link to="..">Home</Link>
            </div>
            <br />

            {/* <MapErrorBoundary>
                <TestErr />
            </MapErrorBoundary> */}

            <MapErrorBoundary>
                <YMaps>
                    <div>
                        {/* My awesome application with maps! */}
                        <Map
                            width={600}
                            height={350}
                            state={{
                                center: country.capitalInfo?.latlng || country.latlng,
                                zoom: 4,
                                controls: ["zoomControl", "fullscreenControl"],
                            }}
                            modules={["control.ZoomControl", "control.FullscreenControl"]}
                        >
                            {!country.capitalInfo && <Placemark geometry={country.latlng} />}
                            {country.capitalInfo && <Placemark geometry={country.capitalInfo.latlng} />}
                        </Map>
                    </div>
                </YMaps>
            </MapErrorBoundary>

        </section >
    );
};

export default CountryPage;
