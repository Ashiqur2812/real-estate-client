import { Helmet } from 'react-helmet-async';
import Plants from '../../components/Home/Plants';
import Banner from '../../components/Home/Banner';
import VirtualTour from '../../components/Home/VirtualTour';
import WhyChooseUs from '../../components/Home/WhyChooseUs';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> DreamWell | Buy Your Desired House</title>
      </Helmet>
      <Banner />
      <Plants />
      <VirtualTour />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
