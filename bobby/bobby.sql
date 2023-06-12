-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 10 Paź 2022, 21:41
-- Wersja serwera: 10.4.24-MariaDB
-- Wersja PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `bobby`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `danie`
--

CREATE TABLE `danie` (
  `id_danie` int(11) NOT NULL,
  `typ` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `nazwa` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `opis` mediumtext COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `obraz` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `cena` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `danie`
--

INSERT INTO `danie` (`id_danie`, `typ`, `nazwa`, `opis`, `obraz`, `cena`) VALUES
(1, 'zupy', 'Rosół', 'bulion z mięsa i warzyw z makaronem', 'img/posilki/rosol.jpg', '15.99'),
(2, 'zupy', 'Zupa pomidorowa', 'podawana z ryżem lub makaronem', 'img/posilki/pomidorowa.jpg', '15.99'),
(3, 'zupy', 'Leczo', 'rodzaj ragoût warzywnego z pomidorów i świeżej papryki duszonych na smalcu z dodatkiem wędzonej słoniny', 'img/posilki/leczo.jpg', '21.99'),
(4, 'zupy', 'Gulasz wołowy', 'węgierskie danie narodowe, które składa się z mięsa wołowego, cebuli i papryki', 'img/posilki/gulasz.jpg', '24.99'),
(5, 'zupy', 'Zupa grzybowa', 'zupa na wywarze mięsno-warzywnym lub warzywnym z dodatkiem grzybów, także suszonych, w ilości nadającej potrawie grzybowy smak', 'img/posilki/grzybowa.jpg', '15.99'),
(6, 'sałatki', 'Sałatka grecka', 'popularna sałatka w domach i lokalach (tawernach) greckich, podawana z osobna lub jako przystawka do dania głównego', 'img/posilki/grecka.jpg', '8.99'),
(7, 'sałatki', 'Coleslaw', 'popularna surówka obiadowa, w której podstawowym składnikiem jest surowa, szatkowana kapusta biała', 'img/posilki/coleslaw.jpg', '11.99'),
(8, 'sałatki', 'Mieszanka mięsna', 'sałatka z kapusty pekińskiej i 4 rodzajów mięs', 'img/posilki/miesna.jpg', '13.99'),
(9, 'sałatki', 'Cezar', 'rodzaj popularnej sałatki, której głównymi składnikami są sałata rzymska, grzanki i parmezan', 'img/posilki/cezar.jpg', '11.99'),
(10, 'ryby', 'Filet z dorsza', 'panierowana ryba z polskiego morza', 'img/posilki/dorsz.jpg', '26.99'),
(11, 'ryby', 'Sum marynowany', 'sum w marynacie z octu', 'img/posilki/sum.jpg', '29.99'),
(12, 'ryby', 'Stek z łososia', 'dobrze wysmażony łosoś z przyprawami z ziół', 'img/posilki/losos.jpg', '33.99'),
(13, 'ryby', 'Sushi onigiri', 'zrobione z ryżu uformowanego w trójkątny kształt, zawinięte w nori', 'img/posilki/sushi.jpg', '37.99'),
(14, 'ryby', 'Śledź panierowany', 'śledź z Morza Północnego w panierce z bułki tartej', 'img/posilki/sledz.jpg', '19.99'),
(15, 'steki', 'Stek amerykański', 'stek wołowy smażony na patelni w stylu amerykańskim', 'img/posilki/stek-amerykanski.jpg', '34.99'),
(16, 'steki', 'Stek argentyński', 'stek wołowy smażony na patelni w stylu argentyńskim', 'img/posilki/stek-argentynski.jpg', '38.99'),
(17, 'steki', 'Tomahawk XXL', 'stek z grilla z tylnej części wołu', 'img/posilki/tomahawk.jpg', '59.99'),
(18, 'steki', 'Polędwica wołowa', 'mocno wysmażony stek z czerwonego mięsa polędwicy wołowej', 'img/posilki/poledwica.jpg', '29.99'),
(19, 'steki', 'Pieczeń wieprzowa', 'pieczeń z mięsa wieprzowego', 'img/posilki/pieczen.jpg', '27.99'),
(20, 'burgery', 'Burger klasyczny', 'pszenna bułka posypana sezamem ze średniowysmażonym mięsem i warzywami', 'img/posilki/klasyczny.jpg', '35.99'),
(21, 'burgery', 'Burger Tennessee', 'burger typu amerykańskiego z przepisu pochodzącego z Tennessee', 'img/posilki/tennessee.jpg', '38.99'),
(22, 'grill', 'Żebro teriyaki', 'żeberka wieprzowe pieczone sposobem teriyaki', 'img/posilki/teriyaki.jpg', '33.99'),
(23, 'grill', 'Stripsy z kurczaka', 'kawałki kurczaka w panierce', 'img/posilki/stripsy.jpg', '13.99'),
(24, 'grill', 'Skrzydełka z kurczaka', 'grillowane skrzydełka drobiowe z sosem BBQ', 'img/posilki/skrzydelka.jpg', '19.99'),
(25, 'grill', 'BBQ z kurczaka', 'mocno wysmażone podudzia kurczaka z sosem śmietanowym lub BBQ', 'img/posilki/bbq-z-kurczaka.jpg', '28.99'),
(26, 'grill', 'Kurczak w szpinaku', 'mięso z kurczaka z dodatkiem szpinaku', 'img/posilki/szpinak.jpg', '23.99'),
(27, 'keto', 'Krewetki w tempurze', 'krewetki panierowane i głeboko smażone w tempurze', 'img/posilki/tempura.jpg', '21.99'),
(28, 'keto', 'Pieczony łosoś', 'łosoś przyprawiony ziołami oraz przyprawami pieczony w piekarniku przez 40 minut', 'img/posilki/pieczony-losos.jpg', '27.99'),
(29, 'keto', 'Bigos', 'potrawa z kiszonej kapusty z dodatkiem mięsa i ziół', 'img/posilki/bigos.jpg', '17.99'),
(30, 'keto', 'Burger keto', 'burger z podwyższoną zawartością tłuszczu i z ograniczeniem węglowodanów', 'img/posilki/burger-keto.jpg', '29.99'),
(31, 'wegetarian', 'Spaghetti z warzywami i grzybami', 'makaron po włosku z dodatkiem warzyw i pieczarek', 'img/posilki/spaghetti.jpg', '18.99'),
(32, 'wegetarian', 'Shakshuka', 'jajka z patelni z dodatkiem pomidorów, papryki i cebuli przyprawionych kuminem', 'img/posilki/shakshuka.jpg', '22.99'),
(33, 'wegetarian', 'Pad thai', 'smażony makaron z dodatkiem jajek, kurczaka, czosnku, fasoli i sosu sojowego', 'img/posilki/pad-thai.jpg', '24.99'),
(34, 'wegan', 'Gulasz z dyni', 'wegański gulasz zrobiony z dyni', 'img/posilki/dynia.jpg', '19.99'),
(35, 'wegan', 'Wegański burger', 'burger z kalafiorem, ziemniakami, czosnku i kotletem sojowym', 'img/posilki/weganski-burger.jpg', '27.99'),
(36, 'wegan', 'Pyzy z grzybami', 'pyzy nadziewane farszem z pieczarek oraz cebuli', 'img/posilki/pyzy.jpg', '22.99'),
(37, 'wegan', 'Pulpety z soczewicy', 'pulpety zrobione z masy z kaszy jaglanej i soczewicy', 'img/posilki/pulpety.jpg', '20.99'),
(38, 'desery', 'Gałka lodów', 'dostępne smaki: truskawkowy, waniliowy, czekoladowy', 'img/posilki/gałka.jpg', '5.99'),
(39, 'desery', 'Pavlova', 'australijski torcik bezowy udekorowany śmietaną i świeżymi owocami', 'img/posilki/pavlova.jpg', '11.99'),
(40, 'desery', 'Gofry z owocami', 'dostępne owoce: winogrona, jagody, truskawki, maliny, porzeczki, mieszane', 'img/posilki/gofry.jpg', '9.99'),
(41, 'desery', 'Panna cotta', 'podgrzewana śmietanka z galaretką po włosku', 'img/posilki/panna-cotta.jpg', '5.99'),
(42, 'desery', 'Szarlotka z lodami', 'ciasto jabłkowe z dwoma gałkami lodów śmietankowych', 'img/posilki/szarlotka.jpg', '11.99'),
(43, 'desery', 'Brownie czekoladowe', 'amerykańskie ciasto z czekoladą i orzechami', 'img/posilki/brownie.jpg', '8.99'),
(44, 'piwo', 'Żywiec Lager 0,5L', 'podawane z kuflem', 'img/posilki/piwo.jpg', '5.99'),
(45, 'piwo', 'Żywiec Białe 0,5L', 'podawane z kuflem', 'img/posilki/piwo.jpg', '5.99'),
(46, 'piwo', 'Heineken 0,5L', 'podawane z kuflem', 'img/posilki/piwo.jpg', '5.99'),
(47, 'piwo', 'Desperados 0,4L', 'podawane z kuflem', 'img/posilki/piwo.jpg', '4.99'),
(48, 'piwo', 'Warka Radler 3,5% 0,5L', 'podawane z kuflem', 'img/posilki/piwo.jpg', '5.99'),
(49, 'wino', 'Wino białe domowe', 'podawane z kieliszkami', 'img/posilki/wino-white.jpg', '25.99'),
(50, 'wino', 'Wino białe czerwone', 'podawane z kieliszkami', 'img/posilki/wino-red.jpg', '29.99'),
(51, 'drinki', 'Jim Beam Highball', 'Jim Beam z sokiem z cytryny', 'img/posilki/jeam-beam.png', '15.99'),
(52, 'drinki', 'Bourbon Lemonade', 'whisky tennessee z sokiem z cytryny i pomarańczy', 'img/posilki/bourbon.jpg', '19.99'),
(53, 'drinki', 'Sex on the beach', 'wódka, sznaps brzoskwiniowy, sok z pomarańczy, sok żurawinowy', 'img/posilki/beach.jpg', '18.99'),
(54, 'drinki', 'Bacardi Mojito', 'bacardi, sok z limonki, listki mięty, cukier, woda sodowa', 'img/posilki/bacardi.jpg', '23.99'),
(55, 'drinki', 'Martini Bianco & Tonic', 'białe martini, tonik, sok z limonki', 'img/posilki/martini.jpg', '26.99'),
(56, 'ciepłe', 'Herbata 300ml', 'czarna herbata z cytryną', 'img/posilki/herbata.jpg', '6.99'),
(57, 'ciepłe', 'Espresso 35ml', 'czarne espresso w filiżance', 'img/posilki/espresso.jpg', '8.99'),
(58, 'ciepłe', 'Cappuccino 200ml', 'podawana z ciastkiem', 'img/posilki/cappuccino.jpg', '9.99'),
(59, 'ciepłe', 'Latte Macchiato 250ml', 'podawana z ciastkiem', 'img/posilki/latte.jpg', '9.99'),
(60, 'zimne', 'Lemoniada 0,4L', 'sok z cytryny z lodem i cukrem', 'img/posilki/lemoniada.jpg', '5.99'),
(61, 'zimne', 'Lipton Ice Tea 0,5L', 'zimna herbata od liptona', 'img/posilki/lipton.jpg', '5.99'),
(62, 'zimne', 'Red Bull 250ml', 'napój energetyczny podawany w szklance', 'img/posilki/red-bull.jpg', '5.99'),
(63, 'zimne', 'Pepsi 0,3L', 'podawana z lodem', 'img/posilki/pepsi.jpg', '5.99'),
(64, 'zimne', 'Mirinda 0,3L', 'podawana z lodem', 'img/posilki/mirinda.jpg', '5.99'),
(65, 'zimne', '7UP 0,3L', 'podawana z lodem', 'img/posilki/7up.jpg', '5.99'),
(66, 'zimne', 'Tymbark 0,3L', 'schłodzony sok Tymbark w różnych smakach', 'img/posilki/tymbark.jpg', '4.99'),
(67, 'dodatki', 'Sos czosnkowy', NULL, 'img/posilki/czosnkowy.jpg', '2.50'),
(68, 'dodatki', 'Ketchup', NULL, 'img/posilki/ketchup.png', '2.50'),
(69, 'dodatki', 'Sos BBQ', NULL, 'img/posilki/sos-bbq.jpg', '3.50'),
(70, 'dodatki', 'Sos Vinegrette', NULL, 'img/posilki/vinegrette.jpg', '3.50'),
(71, 'dodatki', 'Ocet', NULL, 'img/posilki/ocet.jpg', '2.50'),
(72, 'dodatki', 'Frytki', NULL, 'img/posilki/frytki.jpg', '4.50'),
(73, 'dodatki', 'Pieczone ziemniaki', NULL, 'img/posilki/ziemniaki.jpg', '4.50'),
(74, 'dodatki', 'Pudełko na wynos', NULL, 'img/posilki/pudelko.jpg', '1.50'),
(75, 'wódka', 'Stock Prestige 0,5L', 'podawana z kieliszkami i lodem', 'img/posilki/stock.jpg', '42.99'),
(76, 'wódka', 'Saska Czysta 0,5L', 'podawana z kieliszkami i lodem', 'img/posilki/saska.jpg', '37.99'),
(77, 'wódka', 'Amundsen 0,7L', 'podawana z kieliszkami i lodem', 'img/posilki/amundsen.jpg', '47.99'),
(78, 'wódka', 'Finlandia 0,7L', 'podawana z kieliszkami i lodem', 'img/posilki/finlandia.jpg', '45.99');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zamowienie`
--

CREATE TABLE `zamowienie` (
  `id_zamowienie` int(11) NOT NULL,
  `produkty` text COLLATE utf8mb4_polish_ci NOT NULL,
  `cena` decimal(10,2) NOT NULL,
  `adres` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `nr_tel` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `data_zamowienia` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL DEFAULT 'oczekujace'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `zamowienie`
--

INSERT INTO `zamowienie` (`id_zamowienie`, `produkty`, `cena`, `adres`, `nr_tel`, `data_zamowienia`, `status`) VALUES
(11, 'Pepsi 0,3L - 1, Frytki - 1, Lipton Ice Tea 0,5L - 2, Burger Tennessee - 1, Filet z dorsza - 1, Gałka lodów - 6, ', '130.38', '32-650 Kety, ul.Szkotnia, 7c', '123123123', '2022-10-10 19:09:19', 'dostarczone');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `danie`
--
ALTER TABLE `danie`
  ADD PRIMARY KEY (`id_danie`);

--
-- Indeksy dla tabeli `zamowienie`
--
ALTER TABLE `zamowienie`
  ADD PRIMARY KEY (`id_zamowienie`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `danie`
--
ALTER TABLE `danie`
  MODIFY `id_danie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT dla tabeli `zamowienie`
--
ALTER TABLE `zamowienie`
  MODIFY `id_zamowienie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
