import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthProvider';
import DefaultLayout from "./layouts/DefaultLayout";
import { About, Cart, Checkout, Contact, Home, Konto, Login, NotFound, Product, Register, ReturnPage, Sklep, Wyszukiwarka, Success } from "./pages";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/success" element={<Success />} />
          <Route path="/logowanie" element={<Login />} />
          <Route path="/rejestracja" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="/sklep" element={<Sklep />} />
            <Route path="/wyszukiwarka" element={<Wyszukiwarka />} />
            <Route path="/o-firmie" element={<About />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/konto" element={<Konto />} />
            <Route path="/koszyk" element={<Cart />} />
            <Route path="/dostawa-i-platnosc" element={<Checkout />} />
            <Route path="/produkt/:id" element={<Product />} />
            <Route path="/zwrot/:id" element={<ReturnPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
