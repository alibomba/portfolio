import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsLoading, setIsAuthorized, setIsCompany } from '../state/authSlice';
import { useLazyQuery } from '@apollo/client';
import { GET_AUTH } from '../graphql/queries';
import { AppDispatch } from '../state/store';

interface Props {
    children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [getAuthQuery] = useLazyQuery(GET_AUTH);

    useEffect(() => {
        async function fetchData() {
            const { data, error } = await getAuthQuery();
            if (error) {
                dispatch(setIsAuthorized(false));
                dispatch(setIsLoading(false));
                return;
            }
            dispatch(setIsAuthorized(true));
            const { isCompany } = data.getAuth;
            if (isCompany) {
                dispatch(setIsCompany(true));
            }
            dispatch(setIsLoading(false));
        }

        fetchData();

    }, []);

    return (
        <>{children}</>
    )
}

export default AuthProvider
