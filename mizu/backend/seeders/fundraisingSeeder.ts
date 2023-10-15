import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fundraisingSeeder() {
    await prisma.fundraising.createMany({
        data: [
            { image: 'sadzenie-drzew.webp', title: 'Sadzenie Drzew dla Przyszłości', description: 'Wspomóż naszą inicjatywę sadzenia drzew, które pomagają w oczyszczaniu powietrza i tworzeniu zdrowszych lasów. Każdy wkład pozwala na posadzenie jednego drzewa.', currentAmount: 233, targetAmount: 5000 },
            { image: 'edukacja-ekologiczna.webp', title: 'Edukacja Ekologiczna w Szkolach', description: 'Wspieraj nasze programy edukacyjne w szkołach, które uczą dzieci i młodzież o ochronie środowiska. Twoja darowizna pomoże dostarczyć materiały edukacyjne i warsztaty.', currentAmount: 480, targetAmount: 7500 },
            { image: 'czysta-woda.webp', title: 'Czysta Woda dla Wszystkich', description: 'Przyłącz się do naszej misji ochrony i zachowania czystej wody - podstawowego źródła życia na naszej planecie. Nasza organizacja non-profit z pasją i zaangażowaniem działa na rzecz zapewnienia dostępu do czystej wody dla wszystkich.', currentAmount: 700, targetAmount: 10000 },
            { image: 'plastik.webp', title: 'Zwalczenie Zanieczyszczeń Plastikowych', description: 'Pomóż nam w walce z zanieczyszczeniem plastikowym, finansując kampanie edukacyjne i akcje sprzątania. Twoja darowizna pomaga w ochronie oceanów.', currentAmount: 5010, targetAmount: 8000 },
            { image: 'zagrozone-gatunki.webp', title: 'Ratujmy Zagrożone Gatunki', description: 'Wspieraj nasze działania na rzecz ochrony i zachowania zagrożonych gatunków zwierząt i roślin. Twoja darowizna pomoże w ich ratowaniu.', currentAmount: 1522, targetAmount: 6000 },
            { image: 'ocalmy-pszczoly.webp', title: 'Bee Friendly - Ocalmy Pszczoły', description: 'Pszczoły odgrywają kluczową rolę w zapylaniu roślin. Nasz projekt polega na tworzeniu pszczelej przestrzeni i wspieraniu hodowców pszczół. Twoje wsparcie pomoże w ochronie pszczół i bioróżnorodności.', currentAmount: 1470, targetAmount: 4500 },
            { image: 'zielone-dachy.webp', title: 'Zielone Dachy w Mieście', description: 'Chcemy wspierać instalację zieleni na dachach budynków miejskich, co przyczyni się do poprawy jakości powietrza, zatrzymywania wody deszczowej i zwiększenia zielonych przestrzeni w mieście.', currentAmount: 300, targetAmount: 5500 },
            { image: 'obszary-naturalne.webp', title: 'Odzyskiwanie Obszarów Naturalnych', description: 'Naszym celem jest odzyskiwanie zdegradowanych obszarów naturalnych, takich jak bagna, łąki i lasy. Twoja darowizna pomoże w rewitalizacji tych cennych siedlisk.', currentAmount: 700, targetAmount: 6500 },
            { image: 'ogrodzenia.webp', title: 'Ogrodzenia Dla Zwierząt', description: 'Chcemy zbudować ogrodzenia wokół obszarów chronionych, aby zapewnić ochronę dzikim zwierzętom i zapobiec ich dostępowi do obszarów osiedlowych.', currentAmount: 600, targetAmount: 3000 },
            { image: 'zielony-transport.webp', title: 'Promocja Zielonego Transportu', description: 'Nasz projekt ma na celu promowanie zrównoważonych środków transportu, takich jak rowery i komunikacja publiczna. Twoje wsparcie pomoże w organizacji kampanii edukacyjnych.', currentAmount: 891, targetAmount: 4000 },
            { image: 'eko-technologie.webp', title: 'Eko-Technologie w Ochronie Środowiska', description: 'Chcemy inwestować w nowoczesne ekologiczne technologie, które pomogą w ochronie środowiska. Twoja darowizna wesprze badania i wdrożenie innowacyjnych rozwiązań.', currentAmount: 100, targetAmount: 7000 }
        ]
    })
}

export default fundraisingSeeder;