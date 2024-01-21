import { from, HttpLink } from "@apollo/client";
import authLink from "./authLink";

const httpLink = from([authLink, new HttpLink({ uri: import.meta.env.VITE_API_URL })]);

export default httpLink;