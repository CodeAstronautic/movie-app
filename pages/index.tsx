import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login'); // Redirect to the login page
    } else {

      router.push('/dashboard'); // Redirect to the login page
    }
  }, [isAuthenticated, router]);

  // Optionally, you can display a loading spinner or message while redirecting
  if (!isAuthenticated) return <p>Loading...</p>;

  return (null);
};

export default HomePage;
