import { createContext, useState, useEffect } from 'react';
import axiosClient from '../axiosClient';
import axios from 'axios';


export interface ContextType {
    isAuthorized: boolean;
    isLoading: boolean;
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<ContextType>({
    isAuthorized: false,
    isLoading: true,
    setIsAuthorized: () => false
});

interface Props {
    children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/auth',
            cancelToken: source.token
        })
            .then(res => {
                setIsAuthorized(true);
            })
            .catch(err => {
                setIsAuthorized(false);
            })
            .finally(() => setIsLoading(false));

        return () => {
            source.cancel();
        }

    }, []);

    const initialValue: ContextType = {
        isAuthorized,
        isLoading,
        setIsAuthorized
    };

    return (
        <AuthContext.Provider value={initialValue}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
