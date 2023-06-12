-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 18 Lis 2022, 18:45
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
-- Baza danych: `cool_fitness`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `temat` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `tresc` text COLLATE utf8mb4_polish_ci NOT NULL,
  `data_wyslania` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL DEFAULT 'oczekujace'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `newsletter`
--

CREATE TABLE `newsletter` (
  `id_odbiorcy` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `data_zgloszenia` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `newsletter`
--

INSERT INTO `newsletter` (`id_odbiorcy`, `email`, `data_zgloszenia`) VALUES
(1, 'ali.gamer@op.pl', '2022-11-07 14:38:23'),
(2, 'wasd@wads.wasd', '2022-11-07 14:39:05'),
(3, 'ali.gamer@op.pl', '2022-11-07 19:35:31');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `plany`
--

CREATE TABLE `plany` (
  `id_zgloszenia` int(11) NOT NULL,
  `wiek` int(11) NOT NULL,
  `liczba_treningow` int(11) NOT NULL,
  `waga` decimal(10,2) NOT NULL,
  `wzrost` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `poziom_zaawansowania` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `cel` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `plany`
--

INSERT INTO `plany` (`id_zgloszenia`, `wiek`, `liczba_treningow`, `waga`, `wzrost`, `email`, `poziom_zaawansowania`, `cel`) VALUES
(3, 17, 3, '65.00', 170, 'ali.gamer@op.pl', 'poczÄ…tkujÄ…cy', 'masa'),
(4, 22, 4, '120.00', 190, 'ali.gamer@op.pl', 'Å›redniozaawansowany', 'masa'),
(5, 22, 1, '11.10', 200, 'ali.gamer@op.pl', 'poczÄ…tkujÄ…cy', 'masa');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `newsletter`
--
ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`id_odbiorcy`);

--
-- Indeksy dla tabeli `plany`
--
ALTER TABLE `plany`
  ADD PRIMARY KEY (`id_zgloszenia`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `newsletter`
--
ALTER TABLE `newsletter`
  MODIFY `id_odbiorcy` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `plany`
--
ALTER TABLE `plany`
  MODIFY `id_zgloszenia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
