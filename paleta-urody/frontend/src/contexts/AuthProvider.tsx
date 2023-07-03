import { createContext, ReactNode, Dispatch, SetStateAction, useState, useEffect } from 'react';
import axiosClient from '../axiosClient';



interface Props {
    children: ReactNode
}

interface ContextValue {
    isLoggedIn: boolean | null;
    setIsLoggedIn: Dispatch<SetStateAction<boolean | null>>
}

const AuthContext = createContext<ContextValue | null>(null);

const AuthProvider = ({ children }: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    useEffect(() => {
        axiosClient({
            method: 'get',
            url: '/is-authorized'
        }).then(res => {
            setIsLoggedIn(true);
        }).catch(err => {
            setIsLoggedIn(false);
        })
    }, []);

    const initialValue: ContextValue = {
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn
    };


    return (
        <AuthContext.Provider value={initialValue}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }
