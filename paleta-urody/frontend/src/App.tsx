import { Home, Reservation, Blog, BlogPost, Contact, NotFound, Login, Messages, Appointments, Posts, PostForm } from './pages';
import DefaultLayout from './layouts/DefaultLayout';
import AdminLayout from './layouts/AdminLayout';
import { AuthProvider } from './contexts/AuthProvider';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path='rezerwacja' element={<Reservation />} />
            <Route path='blog' element={<Blog />} />
            <Route path='blog/:id' element={<BlogPost />} />
            <Route path='kontakt' element={<Contact />} />
          </Route>
          <Route path='/admin' element={<Login />} />
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='wiadomosci' element={<Messages />} />
            <Route path='wizyty' element={<Appointments />} />
            <Route path='posty' element={<Posts />} />
            <Route path='posty/nowy' element={<PostForm />} />
            <Route path='posty/:id' element={<PostForm />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
