import { ApolloClient, InMemoryCache } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN } from "../graphql/mutations";

async function accessToken() {
    const client = new ApolloClient({ uri: import.meta.env.VITE_API_URL, cache: new InMemoryCache() });
    const currentToken = localStorage.getItem('accessToken');
    if (!currentToken) return '';
    let decoded;
    try {
        decoded = jwtDecode(currentToken);
    } catch (err) {
        return '';
    }
    if (!decoded.exp) return '';
    if (Date.now() >= decoded.exp * 1000) {
        try {
            const response = await client.mutate({
                mutation: REFRESH_TOKEN,
                variables: { refreshToken: localStorage.getItem('refreshToken') || '' }
            });
            const newToken = response.data.refreshToken.accessToken;
            localStorage.setItem('accessToken', newToken);
            return newToken;
        } catch (err) {
            return '';
        }
    } else {
        return currentToken;
    }
}

export default accessToken;