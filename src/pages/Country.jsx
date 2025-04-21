import { useEffect, useRef, useState } from 'react';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import { useLocation, useParams } from 'react-router-dom';
import { fetchCountry } from '../service/countryApi';
import Loader from '../components/Loader/Loader';
import CountryInfo from '../components/CountryInfo/CountryInfo';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';

const Country = () => {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { countryId } = useParams();

  const location = useLocation();
  const goBack = useRef(location?.state ?? '/');

  useEffect(() => {
    const getDataCountries = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchCountry(countryId);
        setCountry(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getDataCountries();
  }, [countryId]);

  return (
    <Section>
      <Container>
        <GoBackBtn path={goBack.current} />
        {isLoading && <Loader />}
        {error && <Heading title="Ooops! Something went wrong..." bottom />}
        {country && <CountryInfo {...country} />}
      </Container>
    </Section>
  );
};

export default Country;
