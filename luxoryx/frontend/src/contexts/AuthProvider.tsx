import { createContext, useState, useEffect } from 'react';
import axiosClient from '../axiosClient';
import axios from 'axios';

export interface ContextType {
  isAuthorized: boolean;
  isLoading: boolean;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
  cart: UICartElement[];
  setContextCart: React.Dispatch<React.SetStateAction<UICartElement[]>>;
}

const AuthContext = createContext<ContextType>({
  isAuthorized: false,
  isLoading: true,
  setIsAuthorized: () => false,
  cart: [],
  setContextCart: () => []
});

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cart, setContextCart] = useState<UICartElement[]>([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    async function fetchData() {
      try {
        const res = await axiosClient({
          method: 'get',
          url: '/auth',
          cancelToken: source.token
        });
        setIsAuthorized(true);
      } catch (err) {
        setIsAuthorized(false);
      }
      setIsLoading(false);
    }

    fetchData();

    return () => {
      source.cancel();
    }
  }, []);

  const initialValue: ContextType = {
    isAuthorized,
    isLoading,
    setIsAuthorized,
    cart,
    setContextCart
  };

  return (
    <AuthContext.Provider value={initialValue}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
