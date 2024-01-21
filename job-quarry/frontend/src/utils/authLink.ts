import { setContext } from '@apollo/client/link/context';
import accessToken from './accessToken';

const authLink = setContext(async () => {
    const token = await accessToken();
    return {
        headers: {
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

export default authLink;