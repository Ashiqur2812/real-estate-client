import { Helmet } from 'react-helmet-async';
import Plants from '../../components/Home/Plants';
import Banner from '../../components/Home/Banner';
import VirtualTour from '../../components/Home/VirtualTour';
import WhyChooseUs from '../../components/Home/WhyChooseUs';
import PropertyCategories from '../../components/Home/PropertyCategories';
import ClientSuccessStories from '../../components/Home/ClientSuccessStories';
import MarketTrends from '../../components/Home/MarketTrends';
import CallToAction from '../../components/Home/CallToAction';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> DreamWell | Buy Your Desired House</title>
      </Helmet>
      <Banner />
      <Plants />
      <VirtualTour />
      <PropertyCategories />
      <ClientSuccessStories />
      <WhyChooseUs />
      <MarketTrends />
      <CallToAction />
    </div>
  );
};

export default Home;
