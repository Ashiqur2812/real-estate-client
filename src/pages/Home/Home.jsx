import { Helmet } from 'react-helmet-async'
import Plants from '../../components/Home/Plants'
import Banner from '../../components/Home/Banner';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> DreamWell | Buy Your Desired House</title>
      </Helmet>
      <Banner/>
      <Plants />
    </div>
  )
}

export default Home
