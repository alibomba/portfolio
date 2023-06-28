import { Home, Reservation, Blog, BlogPost, Contact, NotFound } from './pages';
import DefaultLayout from './layouts/DefaultLayout';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path='rezerwacja' element={<Reservation />} />
          <Route path='blog' element={<Blog />} />
          <Route path='blog/:id' element={<BlogPost />} />
          <Route path='kontakt' element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
