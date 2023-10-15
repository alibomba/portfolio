import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import { Homepage, ProjectsAndNews, Wesprzyj, ProjectAndNews, About, Advice, FAQ, Contact, NotFound } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<Homepage />} />
          <Route path='/wesprzyj' element={<Wesprzyj />} />
          <Route path='/projekty' element={<ProjectsAndNews variant='projects' />} />
          <Route path='/aktualnosci' element={<ProjectsAndNews variant='news' />} />
          <Route path='/projekt/:id' element={<ProjectAndNews variant='project' />} />
          <Route path='/aktualnosc/:id' element={<ProjectAndNews variant='news' />} />
          <Route path='/o-nas' element={<About />} />
          <Route path='/porady-ekologiczne' element={<Advice />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/kontakt' element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
