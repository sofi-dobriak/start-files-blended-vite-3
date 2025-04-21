import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import SearchForm from '../components/SearchForm/SearchForm';
import Section from '../components/Section/Section';
import { useEffect, useState } from 'react';
import { fetchByRegion } from '../service/countryApi';
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import CountryList from '../components/CountryList/CountryList';

const SearchCountry = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const region = searchParams.get('region');

  useEffect(() => {
    if (!region) return;
    const getDataCountries = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchByRegion(region);
        setCountries(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getDataCountries();
  }, [region]);

  const handleSubmit = value => {
    setSearchParams({ region: value });
  };

  return (
    <Section>
      <Container>
        <SearchForm onHandleSubmit={handleSubmit} />
        {isLoading && <Loader />}
        {error && <Heading title="Ooops! Something went wrong..." bottom />}
        {countries.length > 0 && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};

export default SearchCountry;
