import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import { AuthProvider } from "./contexts/AuthProvider";
import { Application, Applications, Location, Locations, Login, Message, Messages, Portfolio, Project, Reservation, Reservations, Service, Services } from "./pages";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DefaultLayout />}>
            <Route path='/' element={<Reservations />} />
            <Route path='/rezerwacje' element={<Reservations />} />
            <Route path="/rezerwacje/:id" element={<Reservation />} />
            <Route path='/uslugi' element={<Services />} />
            <Route path='/uslugi/dodaj' element={<Service />} />
            <Route path='/uslugi/:id' element={<Service />} />
            <Route path='/portfolio' element={<Portfolio />} />
            <Route path='/portfolio/dodaj' element={<Project />} />
            <Route path='/portfolio/:id' element={<Project />} />
            <Route path='/lokacje' element={<Locations />} />
            <Route path='/lokacje/:id' element={<Location />} />
            <Route path='/lokacje/dodaj' element={<Location />} />
            <Route path='/aplikacje' element={<Applications />} />
            <Route path='/aplikacje/:id' element={<Application />} />
            <Route path='/wiadomosci' element={<Messages />} />
            <Route path='/wiadomosci/:id' element={<Message />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
