import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import animate from '../assets/Animation - 1733668801995.json'

const ErrorPage = () => {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Player
        autoplay
        loop
        src={animate}
        style={{ height: '300px', width: '300px' }}
      />
      <h1 className="text-4xl font-bold text-gray-800 mt-8">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 mt-4">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-lg shadow-md hover:bg-rose-700 transition-all duration-300 ease-in-out">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
