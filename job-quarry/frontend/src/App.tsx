import { ApolloClient, ApolloProvider, InMemoryCache, split } from "@apollo/client"
import { getMainDefinition } from "@apollo/client/utilities"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthProvider from "./contexts/AuthProvider"
import DefaultLayout from "./layouts/DefaultLayout"
import { Bookmarks, Analytics, Application, Chat, CompanyProfile, CompanySettings, Feed, Homepage, Login, MyApplicationsCompany, MyApplicationsUser, MyOffers, NotFound, Offer, OfferForm, Register, UserProfile, UserSettings } from './pages';
import httpLink from "./utils/httpLink"
import wsLink from "./utils/wsLink"
import CompanyRestrictedLayout from "./layouts/CompanyRestrictedLayout"
import UserRestrictedLayout from "./layouts/UserRestrictedLayout"

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

function App() {

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path='/logowanie' element={<Login />} />
            <Route path='/rejestracja' element={<Register />} />
            <Route path='/' element={<DefaultLayout />}>
              <Route index element={<Homepage />} />
              <Route path='/przegladaj' element={<Feed />} />
              <Route path='/oferta/:id' element={<Offer />} />
              <Route path='/profil/:id' element={<UserProfile />} />
              <Route path='/firma/:id' element={<CompanyProfile />} />
              <Route path='/czaty' element={<Chat />} />
            </Route>
            <Route path='/' element={<CompanyRestrictedLayout />}>
              <Route path='/moje-oferty' element={<MyOffers />} />
              <Route path='/moje-aplikacje-firma' element={<MyApplicationsCompany />} />
              <Route path='/aplikacja/:id' element={<Application />} />
              <Route path='/ustawienia-firmy' element={<CompanySettings />} />
              <Route path='/dodaj-oferte' element={<OfferForm />} />
              <Route path='/edytuj-oferte/:id' element={<OfferForm />} />
              <Route path='/analityka/:id' element={<Analytics />} />
            </Route>
            <Route path='/' element={<UserRestrictedLayout />}>
              <Route path='/zapisane' element={<Bookmarks />} />
              <Route path='/moje-aplikacje' element={<MyApplicationsUser />} />
              <Route path='/ustawienia' element={<UserSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
