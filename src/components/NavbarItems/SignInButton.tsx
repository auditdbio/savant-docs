import React, { useEffect, useState } from 'react';
import { appendUTMToUrl } from '../../utils/utm';

interface User {
  id: string;
  // Add other user properties as needed
}

export default function SignInButton(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/v1/user/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <a
      href={appendUTMToUrl(user ? '/dashboard' : '/dashboard/login')}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover"
      style={{
        textDecoration: 'none',
      }}
    >
      {user ? 'Dashboard' : 'Sign In'}
    </a>
  );
}
