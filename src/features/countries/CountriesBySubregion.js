import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCountriesBySubregion } from './countriesSlice';
import Back from '../../components/Back';

const CountriesBySubregion = () => {
    const [searchParams] = useSearchParams();
    const lang = searchParams.get( 'lang' );
    const { subregion } = useParams();
    const countries = useSelector( state => selectCountriesBySubregion( state, subregion ) );

    return (
        <section>
            <h2>Subregion: {subregion}</h2>
            {countries.map( country => (
                <div key={country.id}>
                    <Link to={`/api/country/${country.id}`}>
                        {country.name.common}
                        {lang && ` (${country.translations[lang].common})`}
                    </Link>
                </div>
            ) )}

            <Back />
        </section>
    );
};

export default CountriesBySubregion;
