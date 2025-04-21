import { useState, useEffect } from 'react';
import Container from '../components/Container/Container';
import CountryList from '../components/CountryList/CountryList';
import Section from '../components/Section/Section';
import { getCountries } from '../service/countryApi';
import Loader from '../components/Loader/Loader';
import Heading from '../components/Heading/Heading';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDataCountries = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getDataCountries();
  }, []);

  return (
    <Section>
      <Container>
        {isLoading && <Loader />}
        {error && <Heading title="Ooops! Something went wrong..." bottom />}
        {countries.length > 0 && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};
export default Home;
