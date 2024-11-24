import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCountriesByLanguage } from './countriesSlice';
import Back from '../../components/Back';

const CountriesByLanguage = () => {
    const { lang } = useParams();
    const countries = useSelector( state => selectCountriesByLanguage( state, lang ) );

    return (
        <section>
            <h2>Language: {countries[0].languages[lang]}</h2>
            {countries.map( country => (
                <div key={country.id}>
                    <Link to={`/api/country/${country.id}`}>
                        {country.name.common}
                    </Link>
                </div>
            ) )}
            <Back />
        </section>
    );
};

export default CountriesByLanguage;
