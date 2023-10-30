import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import { Homepage, Cennik, Portfolio, Projekt, Lokacje, Aplikuj, About, Contact, Process, NotFound } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<Homepage />} />
          <Route path='/cennik' element={<Cennik />} />
          <Route path='/portfolio' element={<Portfolio />} />
          <Route path='/projekt/:id' element={<Projekt />} />
          <Route path='/lokacje' element={<Lokacje />} />
          <Route path='/aplikuj' element={<Aplikuj />} />
          <Route path='/o-nas' element={<About />} />
          <Route path='/kontakt' element={<Contact />} />
          <Route path='/jak-to-dziala' element={<Process />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
