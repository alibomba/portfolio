# Substantia

Substantia to wymyślona platforma pozwalająca publikować ekskluzywne treści przez twórców dla swoich odbiorców. Koncept jest podobny do stron takich jak Patronite czy OnlyFans. Użytkownicy mogą zakładać konta i subskrybować swoich ulubionych twórców lub utworzyć własny kanał/profil, na którym bedą publikować treści za paywallem. Twórcy mogą publikować posty ze zdjęciami, filmami oraz ankietami, a odbiorcy mogą dodać serce, zapisać post lub napisać komentarz i komunikować się z innymi członkami społeczności poprzez odpowiedzi do komentarzy. Przy tworzeniu profilu twórca może przesłać film poglądowy, który będzie służył jako zachęta do subskrypcji jego profilu, gdyż tylko on będzie widoczny od strony odbiorcy przed jego zasubskrybowaniem. Twórca może również ustalić cenę swojej miesięcznej subskrypcji, która może wynosić maksymalnie 200zł/mies. Jeżeli chodzi o techniczną stronę projektu, to projekt graficzny został zrobiony przeze mnie w Figmie, backend strony jest zrobiony w NodeJS(Typescript), baza danych to PostgreSQL, a ORM to Prisma. Backend jest zbudowany w architekturze MVC(Model-View-Controller) dla lepszej czytelności i rozwijalności kodu. Posiada też testy napisane za pomocą bibliotek supertest oraz vitest. System subskrypcji został zaimplementowany poprzez usługę Stripe. Wszystkie pliki użytkowników czyli: avatary, bannery, filmiki widoczne przed subskrypcją, zdjęcia i filmy do postów, są przesyłane i przechowywane w prywatnym kontenerze w chmurze Microsofta dzięki usłudze Azure Blob Storage. Jest to dodatkowa warstwa zabezpieczeń dla treści, które powinny być dostępne tylko na żądanie subskrybentów, dlatego linki do treści wygasają po pewnym czasie w zależności od typu zasobu. Przesyłanie plików do samego REST API dzieje się poprzez bibliotekę Multer. Autoryzacja użytkowników odbywa się za pomocą tokenów JWT w nagłówkach zapytań. Do wysłania e-maila do użytkownika resetującego hasło użyta została biblioteka NodeMailer i serwer SMTP Google'a. Przechodząc do frontendu strony, został on wykonany w ReactJS(Typescript) z bundlerem Vite, ostylowany w TailwindCSS, do komunikacji z backendem użyta jest biblioteka Axios, a automatyczne testy napisane za pomocą bibliotek: vitest, @testing-library/react, @testing-library/jest-dom i axios-mock-adapter. Do łatwego zdeployowania i potestowania aplikacji na jakimkolwiek komputerze, przygotowałem Dockerfile dla backendu i frontendu oraz plik docker-compose.yml w katalogu głównym.