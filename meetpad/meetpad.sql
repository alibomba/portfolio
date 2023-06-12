-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 19 Wrz 2022, 21:19
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
-- Baza danych: `meetpad`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `bookmarks`
--

CREATE TABLE `bookmarks` (
  `bookmarkid` int(11) NOT NULL,
  `idposta` int(11) NOT NULL,
  `idautora` int(11) NOT NULL,
  `idzapisujacego` int(11) NOT NULL,
  `data_zapisania` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `komentarze`
--

CREATE TABLE `komentarze` (
  `komid` int(11) NOT NULL,
  `parentid` int(11) NOT NULL,
  `idautora` int(11) NOT NULL,
  `autor_komentarza` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `prof_autora` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `tresc_komentarza` text COLLATE utf8_polish_ci NOT NULL,
  `data_wstawienia` datetime NOT NULL DEFAULT current_timestamp(),
  `lajki` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `komentarze`
--

INSERT INTO `komentarze` (`komid`, `parentid`, `idautora`, `autor_komentarza`, `prof_autora`, `tresc_komentarza`, `data_wstawienia`, `lajki`) VALUES
(42, 88, 4, 'Wojtek Bronka', 'img/posts-img/rc.jpg', 'dziala?', '2022-08-16 00:02:27', 0),
(44, 89, 4, 'Wojtek Bronka', 'img/pfp/6813-1907-5326-post1_author.jpg', 'fgxjk', '2022-08-20 14:11:36', 0),
(49, 93, 4, 'Wojtek Bronka', 'img/pfp/6813-1907-5326-post1_author.jpg', '@Arek Smith', '2022-08-30 11:32:01', 0),
(50, 93, 4, 'Wojtek Bronka', 'img/pfp/6813-1907-5326-post1_author.jpg', 'ale kox @Adam Kowalczyk', '2022-08-30 22:47:43', 1),
(51, 93, 4, 'Wojtek Bronka', 'img/pfp/6813-1907-5326-post1_author.jpg', 'test', '2022-09-11 15:19:44', 0),
(52, 98, 4, 'Wojtek Bronka', 'img/pfp/6813-1907-5326-post1_author.jpg', 'test', '2022-09-11 15:20:19', 0),
(53, 98, 4, 'Wojtek Bronka', 'img/pfp/6813-1907-5326-post1_author.jpg', 'test', '2022-09-11 15:20:41', 0),
(54, 98, 4, 'Wojtek Bronka', 'img/pfp/6813-1907-5326-post1_author.jpg', 's', '2022-09-11 15:20:49', -2),
(55, 99, 4, 'Wojtek Bronka', 'img/pfp/6813-1907-5326-post1_author.jpg', 'komentarz', '2022-09-11 15:32:46', 0),
(56, 101, 4, 'Wojtek Bronka', 'img/pfp/6813-1907-5326-post1_author.jpg', 'Wojtek Bronka', '2022-09-11 17:22:27', 0),
(57, 101, 4, 'Wojtek Bronka', 'img/pfp/6813-1907-5326-post1_author.jpg', '@Wojtek Bronka', '2022-09-11 17:22:52', 0),
(58, 103, 4, 'Wojtek Bronka', 'img/pfp/6813-1907-5326-post1_author.jpg', 'komentarz', '2022-09-12 14:02:55', 1),
(59, 105, 4, 'Wojtek Bronka', 'img/pfp/6813-1907-5326-post1_author.jpg', '@Wojtek Bronka', '2022-09-12 14:08:00', 0),
(60, 105, 4, 'Wojtek Bronka', 'img/pfp/6813-1907-5326-post1_author.jpg', '@Wojtek Bronka', '2022-09-12 14:08:34', 0),
(61, 102, 4, 'Wojtek Bronka', 'img/pfp/9359-barca.jpg', 'wasd', '2022-09-14 00:30:30', 0),
(62, 102, 4, 'Wojtek Bronka', 'img/pfp/9359-barca.jpg', 'w', '2022-09-14 00:30:56', 0),
(63, 102, 4, 'Wojtek Bronka', 'img/pfp/9359-barca.jpg', 'w', '2022-09-14 00:33:06', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `opinie`
--

CREATE TABLE `opinie` (
  `idopinii` int(11) NOT NULL,
  `idautora` int(11) NOT NULL,
  `tresc` text COLLATE utf8_polish_ci NOT NULL,
  `data_wyslania` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `posts`
--

CREATE TABLE `posts` (
  `postid` int(11) NOT NULL,
  `idautora` int(11) NOT NULL,
  `autor_posta` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `prof_autora` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `data_wstawienia` datetime NOT NULL DEFAULT current_timestamp(),
  `widocznosc` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `lokalizacja` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `tresc_posta` text COLLATE utf8_polish_ci NOT NULL,
  `lajki` int(11) NOT NULL DEFAULT 0,
  `serca` int(11) NOT NULL DEFAULT 0,
  `komentarze` int(11) NOT NULL DEFAULT 0,
  `obrazek` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `ukryty_dla` text COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `posts`
--

INSERT INTO `posts` (`postid`, `idautora`, `autor_posta`, `prof_autora`, `data_wstawienia`, `widocznosc`, `lokalizacja`, `tresc_posta`, `lajki`, `serca`, `komentarze`, `obrazek`, `ukryty_dla`) VALUES
(93, 6, 'Elżbieta Bronka', 'img/pfp/default.png', '2022-08-23 13:58:43', 'public', '', 'hahahaha', -2, 0, 6, '', ''),
(102, 6, 'Elżbieta Bronka', 'img/pfp/default.png', '2022-09-11 19:37:58', 'public', '', '@Wojtek Bronka', 0, 0, 3, '', '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `powiadomienia`
--

CREATE TABLE `powiadomienia` (
  `idpowiadomienia` int(11) NOT NULL,
  `odbiorca` int(11) NOT NULL,
  `profilowe` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `full_name` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `tresc` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `data_powiadomienia` datetime NOT NULL DEFAULT current_timestamp(),
  `kto_zaprosil` int(11) DEFAULT NULL,
  `jaki_post_skomentowano` int(11) DEFAULT NULL,
  `pod_jakim_postem_polubiono_komentarz` int(11) DEFAULT NULL,
  `jaki_post_polubiono` int(11) DEFAULT NULL,
  `jaki_post_poserduszkowano` int(11) DEFAULT NULL,
  `kto_oznaczyl` int(11) DEFAULT NULL,
  `pod_jakim_postem_kom_oznaczono` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `powiadomienia`
--

INSERT INTO `powiadomienia` (`idpowiadomienia`, `odbiorca`, `profilowe`, `full_name`, `tresc`, `data_powiadomienia`, `kto_zaprosil`, `jaki_post_skomentowano`, `pod_jakim_postem_polubiono_komentarz`, `jaki_post_polubiono`, `jaki_post_poserduszkowano`, `kto_oznaczyl`, `pod_jakim_postem_kom_oznaczono`) VALUES
(171, 6, 'img/pfp/9359-barca.jpg', 'Wojtek Bronka', 'wysłał/a Ci zaproszenie do grona znajomych', '2022-09-14 00:18:51', 4, NULL, NULL, NULL, NULL, NULL, NULL),
(172, 6, 'img/pfp/9359-barca.jpg', 'Wojtek Bronka', 'dodał/a komentarz do Twojego posta', '2022-09-14 00:30:30', NULL, 102, NULL, NULL, NULL, NULL, NULL),
(173, 6, 'img/pfp/9359-barca.jpg', 'Wojtek Bronka', 'dodał/a komentarz do Twojego posta', '2022-09-14 00:30:56', NULL, 102, NULL, NULL, NULL, NULL, NULL),
(174, 6, 'img/pfp/9359-barca.jpg', 'Wojtek Bronka', 'dodał/a komentarz do Twojego posta', '2022-09-14 00:33:06', NULL, 102, NULL, NULL, NULL, NULL, NULL),
(175, 6, 'img/pfp/9359-barca.jpg', 'Wojtek Bronka', 'polubił/a Twój post', '2022-09-14 00:33:20', NULL, NULL, NULL, 102, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `reakcje`
--

CREATE TABLE `reakcje` (
  `reaction_id` int(11) NOT NULL,
  `typ` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `liked_id` int(11) NOT NULL,
  `liker_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `reakcje`
--

INSERT INTO `reakcje` (`reaction_id`, `typ`, `liked_id`, `liker_id`) VALUES
(278, 'comment-like', 50, 4),
(279, 'comment-like', 51, 4),
(294, 'comment-like', 58, 4);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `reports`
--

CREATE TABLE `reports` (
  `reportid` int(11) NOT NULL,
  `idzglaszajacego` int(11) NOT NULL,
  `idzglaszanego` int(11) NOT NULL,
  `idposta` int(11) NOT NULL,
  `tresc_zgloszenia` text COLLATE utf8_polish_ci NOT NULL,
  `data_zgloszenia` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT 'oczekujace'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `support`
--

CREATE TABLE `support` (
  `ticketid` int(11) NOT NULL,
  `idautora` int(11) NOT NULL,
  `replyto` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `temat` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `tresc` text COLLATE utf8_polish_ci NOT NULL,
  `data_wyslania` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT 'oczekujacy'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `imie` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `nazwisko` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `haslo` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `dob` datetime NOT NULL,
  `data_dolaczenia` datetime NOT NULL DEFAULT current_timestamp(),
  `profilowe` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT 'img/pfp/default.png',
  `znajomi` int(11) NOT NULL DEFAULT 0,
  `opis` text COLLATE utf8_polish_ci NOT NULL,
  `nr_tel` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `kontakt_email` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `miasto_zamieszkania` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `kraj_zamieszkania` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `szkola` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `praca` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `miasto_urodzenia` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `kraj_urodzenia` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `dwuetapowa` tinyint(1) NOT NULL DEFAULT 0,
  `kod_z_maila` varchar(11) COLLATE utf8_polish_ci NOT NULL,
  `unread_notis` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`userid`, `imie`, `nazwisko`, `email`, `haslo`, `dob`, `data_dolaczenia`, `profilowe`, `znajomi`, `opis`, `nr_tel`, `kontakt_email`, `miasto_zamieszkania`, `kraj_zamieszkania`, `szkola`, `praca`, `miasto_urodzenia`, `kraj_urodzenia`, `dwuetapowa`, `kod_z_maila`, `unread_notis`) VALUES
(4, 'Wojtek', 'Bronka', 'ali.gamer@op.pl', '$2y$10$eUUjhNge52myGRD5Nf6AKegDU9jJmMIujo5ll0eevVJUlQ62l4Foy', '2005-04-04 00:00:00', '2022-08-03 23:17:30', 'img/pfp/9359-barca.jpg', 3, 'fajny opis', '', 'wojci.bro@gmail.com', '', '', 'ZSEEIM w Bielsku-Białej', 'Kopanie rowow', 'Oswiecim', 'Polska', 0, '489439', 0),
(6, 'Elżbieta', 'Bronka', 'ela.bro@op.pl', '$2y$10$cVMtJ8H5Uibbxz8ihSBMFeubjq18vIa0ROy48JQF2a3zKwLHfQxCe', '1972-05-03 00:00:00', '2022-08-09 03:11:19', 'img/pfp/default.png', 3, '', '', '', '', '', '', '', '', '', 0, '', 1),
(7, 'Katarzyna', 'Bronka', 'kasia@gmail.com', '$2y$10$ltzV0/kEI1m01vyOaZrf5OmvzHIzGRkf10NqXaKNKmJ4Ml0mj26Ba', '1997-12-18 00:00:00', '2022-08-09 14:13:08', 'img/pfp/default.png', 0, '', '', '', '', '', '', '', '', '', 0, '', 0),
(12, 'Adam', 'Kowalczyk', 'adam@gmail.com', '$2y$10$NPiIE8XVJZGB3HpwvQfedOB19znLNowWAfxVHh/o62GKbuuC9yG76', '2003-01-01 00:00:00', '2022-08-26 15:09:01', 'img/pfp/default.png', 0, '', '', '', '', '', '', '', '', '', 0, '', 0),
(13, 'Sebastian', 'Nowak', 'seba@gmail.com', '$2y$10$.4Fg4KMYc7thp0c7IFTAd.1f//iVGr2OfCMBuRGODWQRwgxBbA84u', '2002-01-01 00:00:00', '2022-08-26 15:09:28', 'img/pfp/default.png', 0, '', '', '', '', '', '', '', '', '', 0, '', 0),
(14, 'Arek', 'Smith', 'arek@gmail.com', '$2y$10$EjpjtMpNMXmc3Eo7YTEx/OzPho066CZib7cm6sb5lnckAWA/gyA8u', '1998-01-01 00:00:00', '2022-08-26 15:10:16', 'img/pfp/default.png', 0, '', '', '', '', '', '', '', '', '', 0, '', 0),
(15, 'Piotr', 'Działowy', 'piotr@gmail.com', '$2y$10$ue9LFTmiRsK9PI2FCmDLte/yEMLh77R7loySFmzliNGCyoQuMcljC', '1973-08-02 00:00:00', '2022-08-26 15:10:55', 'img/pfp/default.png', 0, '', '', '', '', '', '', '', '', '', 0, '', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zaproszenia_do_znaj`
--

CREATE TABLE `zaproszenia_do_znaj` (
  `idzaproszenia` int(11) NOT NULL,
  `zapraszajacy` int(11) NOT NULL,
  `zaproszony` int(11) NOT NULL,
  `stan` varchar(255) COLLATE utf8_polish_ci NOT NULL DEFAULT 'oczekujace',
  `data_zaproszenia` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `zaproszenia_do_znaj`
--

INSERT INTO `zaproszenia_do_znaj` (`idzaproszenia`, `zapraszajacy`, `zaproszony`, `stan`, `data_zaproszenia`) VALUES
(6, 6, 7, 'zaakceptowane', '2022-08-09 14:37:03'),
(22, 4, 12, 'zaakceptowane', '2022-08-26 16:21:42'),
(24, 4, 14, 'zaakceptowane', '2022-08-26 16:21:49'),
(25, 4, 15, 'zaakceptowane', '2022-08-26 16:21:52'),
(112, 4, 6, 'oczekujace', '2022-09-14 00:18:51');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`bookmarkid`);

--
-- Indeksy dla tabeli `komentarze`
--
ALTER TABLE `komentarze`
  ADD PRIMARY KEY (`komid`);

--
-- Indeksy dla tabeli `opinie`
--
ALTER TABLE `opinie`
  ADD PRIMARY KEY (`idopinii`);

--
-- Indeksy dla tabeli `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`postid`);

--
-- Indeksy dla tabeli `powiadomienia`
--
ALTER TABLE `powiadomienia`
  ADD PRIMARY KEY (`idpowiadomienia`);

--
-- Indeksy dla tabeli `reakcje`
--
ALTER TABLE `reakcje`
  ADD PRIMARY KEY (`reaction_id`);

--
-- Indeksy dla tabeli `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`reportid`);

--
-- Indeksy dla tabeli `support`
--
ALTER TABLE `support`
  ADD PRIMARY KEY (`ticketid`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- Indeksy dla tabeli `zaproszenia_do_znaj`
--
ALTER TABLE `zaproszenia_do_znaj`
  ADD PRIMARY KEY (`idzaproszenia`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `bookmarkid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT dla tabeli `komentarze`
--
ALTER TABLE `komentarze`
  MODIFY `komid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT dla tabeli `opinie`
--
ALTER TABLE `opinie`
  MODIFY `idopinii` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `posts`
--
ALTER TABLE `posts`
  MODIFY `postid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT dla tabeli `powiadomienia`
--
ALTER TABLE `powiadomienia`
  MODIFY `idpowiadomienia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=176;

--
-- AUTO_INCREMENT dla tabeli `reakcje`
--
ALTER TABLE `reakcje`
  MODIFY `reaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=385;

--
-- AUTO_INCREMENT dla tabeli `reports`
--
ALTER TABLE `reports`
  MODIFY `reportid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `support`
--
ALTER TABLE `support`
  MODIFY `ticketid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT dla tabeli `zaproszenia_do_znaj`
--
ALTER TABLE `zaproszenia_do_znaj`
  MODIFY `idzaproszenia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
