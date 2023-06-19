import { useState, useEffect } from 'react';
import { Header, Service, FAQ, Footer } from './sections';
import { AiOutlineDownload } from 'react-icons/ai';
import SectionBorder from './components/sectionBorder/SectionBorder';

function App() {
  const [downloadIconSize, setDownloadIconSize] = useState(40);

  function adjustDownloadIconSize() {
    const screenSize = window.screen.width;
    if (screenSize > 570) {
      setDownloadIconSize(40);
    }
    else if (screenSize < 570 && screenSize > 430) {
      setDownloadIconSize(30);
    }
    else if (screenSize < 430) {
      setDownloadIconSize(25);
    }
  }

  useEffect(() => {
    adjustDownloadIconSize();
    window.addEventListener('resize', adjustDownloadIconSize)
  }, []);


  return (
    <>
      <Header />
      <SectionBorder />
      <main>
        <Service
          heading="Oglądaj na telewizorze"
          description="Oglądaj na telewizorach Smart TV, konsolach PlayStation i Xbox, odtwarzaczach Chromecast, Apple TV oraz Blu-ray i nie tylko."
          textFirst={true}
        >
          <div className="section-first__imgContainer">
            <img className="section-first__img" src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" alt="" />
            <video className="section-first__video" muted autoPlay loop src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"></video>
          </div>
        </Service>

        <SectionBorder />

        <Service
          heading="Pobierz ulubione tytuły i oglądaj offline"
          description="Zapisz ulubione tytuły, aby zawsze mieć coś do obejrzenia."
          textFirst={false}
        >
          <div className="section-second__imgContainer">
            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" alt="" className="section-second__img" />
            <div className="section-second__rect">
              <div className="section-second__rect__left">
                <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png" alt="" className="section-second__rect__img" />
                <div className="section-second__rect__text">
                  <div className="section-second__rect__title">Stranger Things</div>
                  <div className="section-second__rect__subtitle">Pobieranie...</div>
                </div>
              </div>
              <AiOutlineDownload color='#0071eb' size={downloadIconSize} />
            </div>
          </div>
        </Service>

        <SectionBorder />

        <Service
          heading="Oglądaj wszędzie"
          description="Oglądaj filmy, seriale i programy bez ograniczeń na telefonie, tablecie, laptopie i telewizorze."
          textFirst={true}
        >
          <div className="section-third__imgContainer">
            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png" alt="" className="section-third__img" />
            <video className="section-third__video" muted autoPlay loop src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v"></video>
          </div>
        </Service>

        <SectionBorder />

        <Service
          heading="Utwórz profile dla dzieci"
          description="Pozwól dzieciom przeżywać przygody w towarzystwie uwielbianych bohaterów — w specjalnej sekcji serwisu oferowanej bezpłatnie w ramach członkostwa."
          textFirst={false}
        >
          <img src="https://occ-0-4815-1432.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVeb9WgHJAQ51lMCwaZI_9hRyyVKgx7TSDEUt_aP4EgNgHxIXVfxGZydMosO3ursIoWni766MKqGl-efdXXkfdgm22H9EeEy5kld.png?r=5ea" alt="" className="section-fourth__img" />
        </Service>

        <SectionBorder />

        <FAQ />

        <SectionBorder />
      </main>
      <Footer />
    </>
  );
}

export default App;
