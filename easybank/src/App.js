import { Navbar, Hero, WhyUs, Latest, Footer } from './components';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <Latest />
      </main>
      <Footer />
    </>
  );
}

export default App;
