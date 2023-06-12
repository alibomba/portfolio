-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 02 Gru 2022, 22:23
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
-- Baza danych: `travely`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `filtr`
--

CREATE TABLE `filtr` (
  `id` int(11) NOT NULL,
  `miasto` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `poczatek` datetime NOT NULL,
  `koniec` datetime NOT NULL,
  `osob` int(11) NOT NULL,
  `maks_cena` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kontakt`
--

CREATE TABLE `kontakt` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `temat` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `tresc` text COLLATE utf8mb4_polish_ci NOT NULL,
  `data_wyslania` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `kontakt`
--

INSERT INTO `kontakt` (`id`, `user_id`, `temat`, `tresc`, `data_wyslania`) VALUES
(4, 1, 'Problem z logowaniem', 'asdasdasdasd', '2022-11-27 12:41:56');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `newsletter`
--

CREATE TABLE `newsletter` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `data_zgloszenia` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `newsletter`
--

INSERT INTO `newsletter` (`id`, `email`, `data_zgloszenia`) VALUES
(2, 'ali.gamer@op.pl', '2022-11-27 12:42:20');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `opinie`
--

CREATE TABLE `opinie` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `liczba_gwiazdek` int(11) NOT NULL,
  `tresc` text COLLATE utf8mb4_polish_ci NOT NULL,
  `data_wstawienia` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `opinie`
--

INSERT INTO `opinie` (`id`, `user_id`, `liczba_gwiazdek`, `tresc`, `data_wstawienia`) VALUES
(31, 1, 4, 'asdasd', '2022-11-29 12:26:12'),
(32, 1, 4, 'as', '2022-11-29 12:34:25'),
(33, 1, 3, 'kasdhajsd', '2022-12-02 21:29:53');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pakiety`
--

CREATE TABLE `pakiety` (
  `id` int(11) NOT NULL,
  `miasto` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `kraj` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `cena` int(11) NOT NULL,
  `ikonka` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `opis` text COLLATE utf8mb4_polish_ci NOT NULL DEFAULT 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `pakiety`
--

INSERT INTO `pakiety` (`id`, `miasto`, `kraj`, `cena`, `ikonka`, `opis`) VALUES
(1, 'Berlin', 'Niemcy', 700, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(2, 'Londyn', 'Anglia', 630, 'sport', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(3, 'Dżakarta', 'Indonezja', 980, 'przygoda', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(4, 'Tokio', 'Japonia', 1180, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(5, 'Malé', 'Malediwy', 1400, 'odpoczynek', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(6, 'Maroantsetra', 'Madagaskar', 1250, 'odpoczynek', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(7, 'Rio de Janeiro', 'Brazylia', 950, 'sport', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(8, 'Dubaj', 'UAE', 1400, 'przygoda', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(9, 'Paryż', 'Francja', 750, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(10, 'Marsylia', 'Francja', 800, 'odpoczynek', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(11, 'Rzym', 'Włochy', 800, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(12, 'Sema', 'Papua-Nowa Gwinea', 1200, 'przygoda', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(13, 'Wairuarua', 'Fidżi', 1350, 'przygoda', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(14, 'Pyramiden', 'Norwegia', 690, 'przygoda', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(15, 'Grjotnes', 'Islandia', 630, 'przygoda', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(16, 'Barcelona', 'Hiszpania', 900, 'sport', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(17, 'Salt Lake City', 'Stany Zjednoczone', 2000, 'sport', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(18, 'Manchester', 'Anglia', 900, 'sport', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(19, 'Rosario', 'Argentyna', 1200, 'sport', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(20, 'Porto', 'Portugalia', 800, 'sport', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(21, 'Neapol', 'Włochy', 800, 'sport', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(22, 'Mediolan', 'Włochy', 800, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(23, 'Wiedeń', 'Austria', 700, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(24, 'Praga', 'Czechy', 550, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(25, 'Madryt', 'Hiszpania', 750, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(26, 'Glasgow', 'Szkocja', 700, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(27, 'Amsterdam', 'Holandia', 750, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(28, 'Monako', 'Monako', 950, 'odpoczynek', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(29, 'Nicea', 'Francja', 950, 'odpoczynek', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(30, 'Turyn', 'Włochy', 850, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(31, 'Wenecja', 'Włochy', 850, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(32, 'Budapeszt', 'Węgry', 850, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(33, 'Bratysława', 'Słowacja', 450, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(34, 'Wilno', 'Litwa', 450, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(35, 'Seul', 'Korea południowa', 1050, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(36, 'Los Angeles', 'Stany Zjednoczone', 2050, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(37, 'Las Vegas', 'Stany Zjednoczone', 2050, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(38, 'Nowy Jork', 'Stany Zjednoczone', 2250, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(39, 'Honolulu', 'Stany Zjednoczone', 2250, 'odpoczynek', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(40, 'Aleksandria', 'Egipt', 1550, 'odpoczynek', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(41, 'Tel Awiw', 'Izrael', 1350, 'odpoczynek', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(42, 'Antalya', 'Turcja', 1450, 'odpoczynek', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(43, 'Ateny', 'Grecja', 1150, 'zwiedzanie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(44, 'Iraklion', 'Grecja', 1000, 'odpoczynek', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(45, 'Safakis', 'Tunezja', 1300, 'odpoczynek', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(46, 'Pattaya', 'Tajlandia', 1500, 'odpoczynek', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(47, 'Singapur', 'Singapur', 2100, 'odpoczynek', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(48, 'Cebu', 'Filipiny', 1900, 'odpoczynek', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(49, 'Osaka', 'Japonia', 2000, 'odpoczynek', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!'),
(50, 'Khumjung', 'Nepal', 1800, 'przygoda', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis alias molestiae voluptas accusantium dolores cupiditate, mollitia, velit et cumque illo ea? Quisquam, consequatur!');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `phpsessid` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `data_wygasniecia` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `imie` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `nazwisko` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `haslo` text COLLATE utf8mb4_polish_ci NOT NULL,
  `data_zalozenia` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `imie`, `nazwisko`, `email`, `haslo`, `data_zalozenia`) VALUES
(1, 'Wojciech', 'BroÅ„k', 'wojci.bro@gmail.com', '$2y$10$NdxFah78IToF4VXrO6JJCOZZBwB7YkEU9LwfgetXbrM/53yXFOTVS', '2022-11-25 15:07:15');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zamowienia`
--

CREATE TABLE `zamowienia` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `id_produktu` int(11) NOT NULL,
  `data_zamowienia` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `zamowienia`
--

INSERT INTO `zamowienia` (`id`, `user_id`, `id_produktu`, `data_zamowienia`) VALUES
(4, 1, 18, '2022-12-02 21:30:38'),
(5, 1, 18, '2022-12-02 21:30:38'),
(6, 1, 18, '2022-12-02 21:30:39');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `filtr`
--
ALTER TABLE `filtr`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `kontakt`
--
ALTER TABLE `kontakt`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `newsletter`
--
ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `opinie`
--
ALTER TABLE `opinie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`user_id`) USING BTREE;

--
-- Indeksy dla tabeli `pakiety`
--
ALTER TABLE `pakiety`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeksy dla tabeli `zamowienia`
--
ALTER TABLE `zamowienia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `zamowienia` (`user_id`,`id_produktu`),
  ADD KEY `id_produktu` (`id_produktu`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `filtr`
--
ALTER TABLE `filtr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `kontakt`
--
ALTER TABLE `kontakt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT dla tabeli `newsletter`
--
ALTER TABLE `newsletter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `opinie`
--
ALTER TABLE `opinie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT dla tabeli `pakiety`
--
ALTER TABLE `pakiety`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT dla tabeli `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `zamowienia`
--
ALTER TABLE `zamowienia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `kontakt`
--
ALTER TABLE `kontakt`
  ADD CONSTRAINT `kontakt_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `opinie`
--
ALTER TABLE `opinie`
  ADD CONSTRAINT `opinie_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `zamowienia`
--
ALTER TABLE `zamowienia`
  ADD CONSTRAINT `zamowienia_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `zamowienia_ibfk_2` FOREIGN KEY (`id_produktu`) REFERENCES `pakiety` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
