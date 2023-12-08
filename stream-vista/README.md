# Stream Vista

Stream Vista to wymyślona platforma streamingowa oferująca filmy i seriale. Posiada takie funkcje jak: proponowanie użytkownikowi produkcji, które mogą mu się spodobać na podstawie kategorii wybranych przy zakładaniu konta, możliwych do późniejszej zmiany w ustawieniach, wyszukiwanie produkcji po kategorii, tytule, treści opisu, obsadzie czy twórcach, dodawanie produkcji do listy do obejrzenia później, śledzenie postępu w oglądaniu danego filmu czy serialu, aby użytkownik mógł wrócić dokładnie do momentu, w którym skończył oglądać czy zmiana swoich ustawień wraz z zarządzaniem subskrypcją usługi. Jeżeli chodzi o subkrypcje, to są one zrobione za pomocą usługi Stripe, dzięki której użytkownik może wybrać plan miesięczny, 3-miesięczny lub roczny, a następnie nim zarządzać za pomocą interfejsu dostarczonego przez Stripe. Wszystkie produkcje, ich zwiastuny i miniatury są hostowane w chmurze za pomocą usługi S3 od AWS(Amazon Web Services) i każde zapytanie o te zasoby jest przetwarzane przez REST API wykonane w ExpressJS(NodeJS) i wysyła zapytanie do bucketu w S3 o bezpieczny link, który wygasa po określonym czasie, aby treści platformy nie wyciekały. Strona posiada też panel administracyjny jako osobna aplikacja, który służy do zarządzania serialami, filmami, napisami i kategoriami. Napisy można dodać w języku polskim i angielskim, a następnie są one dostępne w danych produkcjach. Projekt strony został zrobiony w Figmie przez mnie, frontend strony oraz CMS'a(Content Management System) został wykonany w ReactJS(TypeScript) z bundlerem Vite, a backend został zrobiony w NodeJS(TypeScript) we frameworku ExpressJS z bazą danych PostgreSQL, z którą aplikacja komunikuje się za pomocą ORM'a Prisma.