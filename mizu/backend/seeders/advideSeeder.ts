import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function adviceSeeder() {
    await prisma.advice.createMany({
        data: [
            { title: 'Oszczędzanie Energii', content: 'Wyłącz światła i urządzenia elektryczne, gdy nie są w użyciu, i rozważ instalację energooszczędnych żarówek i urządzeń.' },
            { title: 'Recykling', content: 'Separuj i recyklinguj odpady, w tym papier, plastik, szkło i metal, aby zmniejszyć ilość odpadów trafiających na wysypiska.' },
            { title: 'Zużywaj Mniej Wody', content: 'Zainstaluj oszczędne baterie i prysznice, nie zostawiaj kranów otwartych podczas mycia rąk i ząbkowania, oraz napraw cieknące kraniki.' },
            { title: 'Jedz Mniej Mięsa', content: 'Rozważ redukcję spożycia mięsa, ponieważ przemysł mięsny jest odpowiedzialny za dużą emisję gazów cieplarnianych.' },
            { title: 'Wspieraj Energia Odnawialna', content: 'Jeśli to możliwe, wybieraj dostawców energii, którzy korzystają z energii odnawialnej, takiej jak energia słoneczna lub wiatrowa.' },
            { title: 'Redukuj Plastikowe Opakowania', content: 'Unikaj jednorazowych plastikowych opakowań, takich jak butelki, torby i jednorazowe sztućce. Wybieraj produkty w opakowaniach z recyklingu lub ostatecznie przekształcaj plastikowe opakowania na inne cele.' },
            { title: 'Zainstaluj Panele Słoneczne', content: 'Rozważ instalację paneli słonecznych na dachu swojego domu lub budynku. Energia słoneczna jest odnawialna i pomaga obniżyć rachunki za prąd.' },
            { title: 'Używaj Odnawialnych Źródeł Energii', content: 'Zwróć uwagę na dostawców energii, którzy korzystają z odnawialnych źródeł energii, takich jak energia wiatrowa lub wodna. Możesz zredukować swój wpływ na zmiany klimatu.' },
            { title: 'Wspieraj Lokalnych Producentów', content: 'Kupuj produkty od lokalnych producentów i rolników. To nie tylko wspiera lokalną gospodarkę, ale także zmniejsza emisję dwutlenku węgla związaną z transportem żywności.' },
            { title: 'Oszczędzaj Wodę', content: 'Oszczędzaj wodę w domu, naprawiając cieknące kraniki, instalując oszczędne baterie i unikając marnowania wody podczas mycia rąk i zębów.' },
            { title: 'Unikaj Zanieczyszczeń Powietrza', content: 'Wybieraj ekologiczne środki transportu, używaj komunikacji publicznej lub roweru. To pomaga w zmniejszeniu emisji szkodliwych substancji do atmosfery.' },
            { title: 'Sadź Drzewa', content: 'Przyczyniaj się do sadzenia drzew w swojej okolicy. Drzewa absorbują dwutlenek węgla i poprawiają jakość powietrza.' },
            { title: 'Unikaj Marnowania Żywności', content: 'Planuj zakupy i gotowanie, aby unikać marnowania żywności. Wyrzucone jedzenie przyczynia się do odpadów i emisji gazów cieplarnianych.' },
            { title: 'Edukacja Ekologiczna', content: 'Ucz się o ekologii i edukuj innych. Wiedza i świadomość ekologiczna są kluczowe dla zachowania środowiska.' }
        ]
    })
}

export default adviceSeeder;