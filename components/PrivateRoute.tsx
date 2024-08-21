import { useEffect, ReactNode, useState } from 'react';
import { useRouter } from 'next/router';

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for authentication status only on the client side
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const user = localStorage.getItem("User");
        setIsAuthenticated(!!user); // Update authentication status
      }
    };

    checkAuth();

    // Redirect to login if not authenticated
    if (isAuthenticated === false) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  // Show nothing or a loading spinner while checking authentication
  if (isAuthenticated === null) return <div>Loading...</div>;

  if (!isAuthenticated) return null;

  return <>{children}</>;
};

export default PrivateRoute;
