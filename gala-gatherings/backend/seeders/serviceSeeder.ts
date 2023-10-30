import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function serviceSeeder() {
    await prisma.service.createMany({
        data: [
            { title: 'Organizacja Wesela', description: 'Pomoc w zaplanowaniu i zrealizowaniu wymarzonego ślubu, włączając w to wybór lokalizacji, dekoracje, catering, muzyczną oprawę i koordynację wydarzenia.', image: 'organizacja-wesela.webp', price: '8 000 - 20 000' },
            { title: 'Imprezy Firmowe', description: 'Organizacja imprez korporacyjnych, w tym bankietów, konferencji, eventów integracyjnych i spotkań biznesowych.', image: 'imprezy-firmowe.webp', price: '10 000 - 30 000' },
            { title: 'Imprezy prywatne', description: 'Planowanie i organizacja imprez okolicznościowych, takich jak urodziny, zaręczyny i jubileusze.', image: 'imprezy-prywatne.webp', price: '5 000 - 15 000' },
            { title: 'Dekoracje i Florystyka', description: 'Tworzenie dekoracji, bukietów kwiatowych i dekoracji stołów, aby nadać wydarzeniom elegancji i wyjątkowego wyglądu.', image: 'dekoracje-i-florystyka.webp', price: '2 000 - 10 000' },
            { title: 'Koordynacja Wydarzenia', description: 'Zapewnienie sprawnego przebiegu wydarzenia, koordynacja dostawców, harmonogramu i opieka nad gośćmi.', image: 'koordynacja-wydarzenia.webp', price: '4 000 - 8 000' },
            { title: 'Catering', description: 'Organizacja cateringowa na wydarzenia, w tym przygotowanie menu, obsługę kelnerską i dostawę jedzenia.', image: 'catering.webp', price: '60 - 150 / osoba' },
            { title: 'Rozrywka i Muzycy', description: 'Znalezienie i zatrudnienie artystów, zespołów muzycznych, DJ-ów i innych atrakcji rozrywkowych.', image: 'rozrywka-i-muzycy.webp', price: '2 000 - 10 000' },
            { title: 'Fotografia i Wideo', description: 'Fotografowanie i wideofilmowanie wydarzeń, aby uwiecznić je na zdjęciach i filmach.', image: 'fotografia-i-wideo.webp', price: '4 000 - 12 000' },
            { title: 'Drukowanie i Zaproszenia', description: 'Projektowanie i drukowanie zaproszeń, kartek, menu i innych materiałów promocyjnych.', image: 'drukowanie-i-zaproszenia.webp', price: '1 000 - 4 000' },
            { title: 'Transport', description: 'Organizacja transportu gości i dostawców na wydarzenia.', image: 'transport.webp', price: '2 000 - 6 000' },
            { id: '1cec86cb-8920-427c-8ffa-c71f7d4f81bc', title: 'Ekskluzywny pakiet slubny', description: 'Nasz najbardziej luksusowy pakiet dla przyszłych małżonków, obejmujący kompleksową organizację ślubu, w tym wybór lokacji, dekoracje, catering, i koordynację. To rozwiązanie dla tych, którzy marzą o bajkowym ślubie.', image: 'ekskluzywny-pakiet-slubny.webp', price: '25 000' },
            { id: 'fbe66c9c-5d66-45cd-af25-d856a3630686', title: 'Pakiet urodzinowy deluxe', description: 'Idealny pakiet na urodziny, który zawiera przygotowanie dekoracji, katering, rozrywkę oraz koordynację. Zapewniamy, że Twój dzień będzie pełen zabawy i niespodzianek.', image: 'pakiet-urodzinowy-deluxe.webp', price: '10 000' },
            { id: 'be75c8cd-9b23-4657-aa40-a35fa6cc556d', title: 'Impreza firmowa all-inclusive', description: 'Nasz pakiet dla firm, który obejmuje organizację konferencji, bankietów, eventów integracyjnych i więcej. Zapewniamy kompleksową obsługę, od planowania po realizację.', image: 'impreza-firmowa-all-inclusive.webp', price: '11 000' }
        ]
    })
}

export default serviceSeeder;