-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 09 Sty 2023, 06:14
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
-- Baza danych: `furni`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `komentarze`
--

CREATE TABLE `komentarze` (
  `id` int(11) NOT NULL,
  `id_produktu` int(11) NOT NULL,
  `id_autora` int(11) NOT NULL,
  `data_dodania` datetime NOT NULL DEFAULT current_timestamp(),
  `liczba_gwiazdek` int(11) NOT NULL,
  `tresc` text COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `komentarze`
--

INSERT INTO `komentarze` (`id`, `id_produktu`, `id_autora`, `data_dodania`, `liczba_gwiazdek`, `tresc`) VALUES
(7, 25, 2, '2022-12-23 15:56:43', 3, 'wasd'),
(8, 25, 2, '2022-12-23 15:59:33', 3, 'wasd');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `koszyki`
--

CREATE TABLE `koszyki` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `id_produktu` int(11) NOT NULL,
  `ilosc` int(11) NOT NULL DEFAULT 1,
  `data_dodania` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `produkty`
--

CREATE TABLE `produkty` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `kategoria` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `opis` text COLLATE utf8mb4_polish_ci NOT NULL DEFAULT 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!',
  `cena` float NOT NULL,
  `poprzednia_cena` float DEFAULT NULL,
  `data_wypuszczenia` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `produkty`
--

INSERT INTO `produkty` (`id`, `nazwa`, `kategoria`, `opis`, `cena`, `poprzednia_cena`, `data_wypuszczenia`) VALUES
(1, 'Krzesło ekoskóra szare', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 229.99, NULL, '2022-12-18 00:00:04'),
(2, 'Mini krzesło filcowe szare', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 189.99, NULL, '2022-12-18 00:01:09'),
(3, 'Mini krzesło filcowe zielone', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 189.99, NULL, '2022-12-18 00:01:52'),
(4, 'Krzesło DEPIN beż', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 169.99, NULL, '2022-12-18 00:03:09'),
(5, 'Krzesło retro drewniane', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 155.99, NULL, '2022-12-18 00:06:34'),
(6, 'Krzesło AMI F6213', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 205.99, NULL, '2022-12-18 00:07:09'),
(7, 'Krzesło pikowane czarne', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 279.99, NULL, '2022-12-18 00:08:31'),
(8, 'Krzesło retro z dziurką granatowe', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 539.99, NULL, '2022-12-18 00:08:57'),
(9, 'Krzesło tapicerowane grafitowe', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 279.99, NULL, '2022-12-18 00:09:24'),
(10, 'Krzesło tapicerowane jasnoszare', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 329.99, NULL, '2022-12-18 00:09:45'),
(11, 'Krzesło ENIFO CL-840', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 469.99, NULL, '2022-12-18 00:10:42'),
(12, 'Krzesło barowe ENIFO CL-845', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 358.99, NULL, '2022-12-18 00:11:18'),
(13, 'Krzesło PAPAGAYO', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 569.99, NULL, '2022-12-18 00:11:51'),
(14, 'Krzesło tapicerowane brązowe RAIA', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 339.99, NULL, '2022-12-18 00:12:22'),
(15, 'Krzesło LILIA', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 219.99, NULL, '2022-12-18 00:12:51'),
(16, 'Krzesło czarne CAMPE', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 299.99, NULL, '2022-12-18 00:13:31'),
(17, 'Krzesło tapicerowane zielone', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 399.99, NULL, '2022-12-18 00:14:07'),
(18, 'Krzesło OREGON z pikowanymi plecami', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 312.99, NULL, '2022-12-18 00:14:40'),
(19, 'Krzesło obrotowe PANKO niebieskie', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 549.99, NULL, '2022-12-18 00:15:11'),
(20, 'Krzesło ENIFO jasny brąz', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 469.99, NULL, '2022-12-18 00:15:51'),
(21, 'Krzesło LITA', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 259.99, NULL, '2022-12-18 00:16:11'),
(22, 'Krzesło do jadalni musztardowe', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 332.99, NULL, '2022-12-18 00:16:49'),
(23, 'Krzesło drewniane białe', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 229.99, NULL, '2022-12-18 00:17:13'),
(24, 'Krzesło ZOWI', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 224.99, NULL, '2022-12-18 00:17:45'),
(25, 'Krzesło SAMEA białe', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 299.99, NULL, '2022-12-18 00:18:42'),
(26, 'Krzesełko dziecięce błękitne', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 161.99, NULL, '2022-12-18 00:19:21'),
(27, 'Krzesło tapicerowane brązowe', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 299.99, NULL, '2022-12-18 00:20:03'),
(28, 'Krzesło tapicerowane wrzosowe', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 330.99, NULL, '2022-12-18 00:20:29'),
(29, 'Krzesło IRIS', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 239.99, NULL, '2022-12-18 00:20:51'),
(30, 'Krzesło pikowane niebieskie', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 301.99, NULL, '2022-12-18 00:21:27'),
(31, 'Krzesło drewniane do jadalni', 'krzesla', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 279.99, NULL, '2022-12-18 00:21:57'),
(32, 'Fotel wypoczynkowy OSKAR', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 873.99, NULL, '2022-12-18 00:24:56'),
(33, 'Fotel TURRIS TD-P4057', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1099.99, NULL, '2022-12-18 00:25:26'),
(34, 'Fotel z wysuwanym ponóżkiem', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 476.99, NULL, '2022-12-18 00:26:03'),
(35, 'Fotel wypoczynkowy RENO LIFT', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2249.99, NULL, '2022-12-18 00:26:24'),
(36, 'Fotel wypoczynkowy CLASIK XII', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1149.99, NULL, '2022-12-18 00:26:47'),
(37, 'Fotel wypoczynkowy COSMO', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2299.99, NULL, '2022-12-18 00:27:07'),
(38, 'Fotel obrotowy czarny SENSI', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2999.99, NULL, '2022-12-18 00:27:25'),
(39, 'Fotel wypoczynkowy JOYCE', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 799.99, NULL, '2022-12-18 00:27:45'),
(40, 'Fotel wypoczynkowy ARTE', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1079.99, NULL, '2022-12-18 00:28:08'),
(41, 'Fotel wypoczynkowy TEDDY', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 854.99, NULL, '2022-12-18 00:28:27'),
(42, 'Fotel klubowy czarny ekoskóra', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 359.99, NULL, '2022-12-18 00:29:01'),
(43, 'Fotel obrotowy MOX', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 999.99, NULL, '2022-12-18 00:29:25'),
(44, 'Fotel uszak beżowy LIKA', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 899.99, NULL, '2022-12-18 00:29:45'),
(45, 'Fotel wypoczynkowy BAKU', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 579.99, NULL, '2022-12-18 00:30:10'),
(46, 'Fotel wypoczynkowy BAMAKO', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 869.99, NULL, '2022-12-18 00:30:32'),
(47, 'Fotel wypoczynkowy TROMSO', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1299.99, NULL, '2022-12-18 00:31:01'),
(48, 'Fotel bujany ROKO', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 999.99, NULL, '2022-12-18 00:31:33'),
(49, 'Fotel MOSTRA MY-9323', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 999.99, NULL, '2022-12-18 00:32:16'),
(50, 'Fotel obrotowy MILAR', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 699.99, NULL, '2022-12-18 00:33:11'),
(51, 'Fotel wypoczynkowy PEAK', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 799.99, NULL, '2022-12-18 00:33:30'),
(52, 'Fotel wypoczynkowy DAKAR', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1199.99, NULL, '2022-12-18 00:33:56'),
(53, 'Fotel wypoczynkowy musztardowy', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 602.99, NULL, '2022-12-18 00:34:21'),
(54, 'Fotel BABY', 'fotele', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 599.99, NULL, '2022-12-18 00:34:56'),
(55, 'Wersalka LOME', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1231.99, NULL, '2022-12-18 00:35:40'),
(56, 'Sofa FUNNY 3-osobowa', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1529.99, NULL, '2022-12-18 00:36:10'),
(57, 'Wersalka PEAK', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1517.99, NULL, '2022-12-18 00:36:54'),
(58, 'Wersalka IMOLA', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1399.99, NULL, '2022-12-18 00:37:29'),
(59, 'Sofa CASEY 3-osobowa', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1699.99, NULL, '2022-12-18 00:38:51'),
(60, 'Sofa rozkładana butelkowa zieleń', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2999.99, NULL, '2022-12-18 00:39:25'),
(61, 'Sofa COSMO 2-osobowa', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 3459.99, NULL, '2022-12-18 00:39:49'),
(62, 'Sofa NEXT 2-osobowa', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2019.99, NULL, '2022-12-18 00:40:04'),
(63, 'Wersalka BAMAKO', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1619.99, NULL, '2022-12-18 00:40:25'),
(64, 'Sofa LAVAL 3-osobowa', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1539.99, NULL, '2022-12-18 00:40:59'),
(65, 'Wersalka BAKU', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1287.99, NULL, '2022-12-18 00:41:39'),
(66, 'Sofa DINARO 3-osobowa', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1799.99, NULL, '2022-12-18 00:42:06'),
(67, 'Wersalka beżowa welurowa', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1489.99, NULL, '2022-12-18 00:42:33'),
(68, 'Sofa POLICE 1-osobowa', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1389.99, NULL, '2022-12-18 00:43:00'),
(69, 'Sofa STAR 3-osobowa', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1579.99, NULL, '2022-12-18 00:43:52'),
(70, 'Sofa VAMOS 3-osobowa', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2549.99, NULL, '2022-12-18 00:44:13'),
(71, 'Sofa granatowa na wysokich nóżkach', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2207.99, NULL, '2022-12-18 00:44:35'),
(72, 'Wersalka TELDA', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1699.99, NULL, '2022-12-18 00:44:59'),
(73, 'Sofa AMBER 3-osobowa', 'sofy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2115.99, NULL, '2022-12-18 00:45:25'),
(75, 'Meblościanka z oświetleniem biały połysk', 'mebloscianki', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1899.99, NULL, '2022-12-18 12:40:19'),
(76, 'Meblościanka ARISTA 2 5D3DS1S', 'mebloscianki', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1574.99, NULL, '2022-12-18 12:41:27'),
(77, 'Meblościanka EVORA 1K', 'mebloscianki', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1069.99, NULL, '2022-12-18 12:42:07'),
(78, 'Meblościanka PAUL', 'mebloscianki', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1299.99, NULL, '2022-12-18 12:42:29'),
(79, 'Meblościanka VANCOUVER', 'mebloscianki', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1103.99, NULL, '2022-12-18 12:42:50'),
(80, 'Meblościanka FLORES 1W1K2S', 'mebloscianki', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1439.99, NULL, '2022-12-18 12:43:43'),
(81, 'Meblościanka z miejscem na kwiaty', 'mebloscianki', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 949.99, NULL, '2022-12-18 12:44:09'),
(82, 'Meblościanka z oświetleniem czarny mat', 'mebloscianki', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2099.99, NULL, '2022-12-18 12:44:37'),
(83, 'Meblościanka THOR z oświetleniem', 'mebloscianki', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1699.99, NULL, '2022-12-18 12:45:07'),
(84, 'Meblościanka LORCA 1D2K', 'mebloscianki', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1029.99, NULL, '2022-12-18 12:45:29'),
(85, 'Meblościanka czarny mat z oświetleniem', 'mebloscianki', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1999.99, NULL, '2022-12-18 12:45:49'),
(86, 'Komoda OSLO 2D', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 249.99, NULL, '2022-12-18 12:48:04'),
(87, 'Duża szafka RTV z oświetleniem', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 329.99, NULL, '2022-12-18 12:48:49'),
(88, 'Komoda MALI 2D4S dąb', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 559.99, NULL, '2022-12-18 12:49:15'),
(89, 'Komoda LANZETTE 2D3SZ E', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 919.99, NULL, '2022-12-18 12:49:45'),
(90, 'Komoda NORTON', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 661.99, NULL, '2022-12-18 12:50:34'),
(91, 'Komoda z szufladami i półkami', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 735.99, NULL, '2022-12-18 12:50:59'),
(92, 'Komoda SAVONA z listwą LED', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1215.99, NULL, '2022-12-18 12:51:23'),
(93, 'Komoda IRMA IM4 z oświetleniem', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1241.99, NULL, '2022-12-18 12:51:44'),
(94, 'Komoda IKOLI 3D4S', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 499.99, NULL, '2022-12-18 12:52:26'),
(95, 'Komoda STONE II 1D3S', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 597.99, NULL, '2022-12-18 12:53:11'),
(96, 'Komoda biała nowoczesna trzydrzwiowa', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 551.99, NULL, '2022-12-18 12:53:42'),
(97, 'Szafka RTV LANZETTE', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 615.99, NULL, '2022-12-18 12:54:28'),
(98, 'Szafka RTV LOFT 150 1D1S', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 468.99, NULL, '2022-12-18 12:55:02'),
(99, 'Komoda duża biała ELARA', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 989.99, NULL, '2022-12-18 12:55:34'),
(100, 'Komoda biała nowoczesna', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 707.99, NULL, '2022-12-18 12:55:58'),
(101, 'Komoda LOFT 2D2S', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 836.99, NULL, '2022-12-18 12:56:46'),
(102, 'Duża komoda granatowa z pólkami', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 991.99, NULL, '2022-12-18 12:57:13'),
(103, 'Komoda biała wysoki połysk', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1563.99, NULL, '2022-12-18 12:57:47'),
(104, 'Komoda IRMA IM4', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1241.99, NULL, '2022-12-18 12:58:14'),
(105, 'Komoda ERDEN', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 669.99, NULL, '2022-12-18 12:58:41'),
(106, 'Komoda do salonu NOVENA', 'komody', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 869.99, NULL, '2022-12-18 12:59:04'),
(107, 'Biurko gamingowe NEON SKY', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 629.99, NULL, '2022-12-18 13:00:32'),
(108, 'Biurko białe BILL', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 459.99, NULL, '2022-12-18 13:00:50'),
(109, 'Biurko ERDEN 1D1S', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 389.99, NULL, '2022-12-18 13:01:16'),
(110, 'Biurko SPOT 1D1S', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 587.99, NULL, '2022-12-18 13:01:37'),
(111, 'Biurko OPEN I 60', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 367.99, NULL, '2022-12-18 13:01:56'),
(112, 'Biurko czarne z szafką STONE II', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 367.99, NULL, '2022-12-18 13:02:17'),
(113, 'Biurko SNOW', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 703.99, NULL, '2022-12-18 13:02:40'),
(114, 'Biurko z szufladami MOOD', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 715.99, NULL, '2022-12-18 13:02:58'),
(115, 'Biurko gamingowe TEZAUR białe', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 719.99, NULL, '2022-12-18 13:03:21'),
(116, 'Biurko grafitowe z szafką', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 275.99, NULL, '2022-12-18 13:03:39'),
(117, 'Biurko MIA MI-03', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 489.99, NULL, '2022-12-18 13:03:55'),
(118, 'Biurko z nadstawką i regałem', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 569.99, NULL, '2022-12-18 13:04:31'),
(119, 'Biurko BILL 2D1S białe fronty', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 499.99, NULL, '2022-12-18 13:04:58'),
(120, 'Biurko LUPO', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 551.99, NULL, '2022-12-18 13:05:22'),
(121, 'Biurko STEP 1D1S', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 560.99, NULL, '2022-12-18 13:05:46'),
(122, 'Biurko DISEGNO OFFICE', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1169.99, NULL, '2022-12-18 13:06:08'),
(123, 'Biurko ELEIT', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 449.99, NULL, '2022-12-18 13:06:32'),
(124, 'Biurko YOOP', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 683.99, NULL, '2022-12-18 13:06:53'),
(125, 'Biurko gamingowe ESCORT', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 759.99, NULL, '2022-12-18 13:07:15'),
(126, 'Biurko loftowe EROMI', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 499.99, NULL, '2022-12-18 13:07:43'),
(127, 'Biurko z ceramicznym blatem', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1799.99, NULL, '2022-12-18 13:08:03'),
(128, 'Biurko GRAY', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 719.99, NULL, '2022-12-18 13:08:29'),
(129, 'Biurko z szufladami i półką CUBE', 'biurka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1399.99, NULL, '2022-12-18 13:09:02'),
(130, 'Narożnik rozkładany ciemnoszary', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1839.99, NULL, '2022-12-18 13:38:01'),
(131, 'Narożnik TOSCA rozkładany', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1839.99, NULL, '2022-12-18 13:38:43'),
(132, 'Narożnik z funkcją spania szary', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2249.99, NULL, '2022-12-18 13:39:13'),
(133, 'Narożnik BREVA rozkładany', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 3449.99, NULL, '2022-12-18 13:39:47'),
(134, 'Narożnik niebieski z 2 leżankami', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2999.99, NULL, '2022-12-18 13:40:39'),
(135, 'Narożnik MASIMO rozkładany', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2170.99, NULL, '2022-12-18 13:41:05'),
(136, 'Narożnik DAKAR rozkładany', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 3599.99, NULL, '2022-12-18 13:41:47'),
(137, 'Narożnik KAROL rozkładany', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2099.99, NULL, '2022-12-18 13:43:08'),
(138, 'Narożnik RIMINI rozkładany', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2114.99, NULL, '2022-12-18 13:43:34'),
(139, 'Narożnik VOLARE 5P', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2851.99, NULL, '2022-12-18 13:44:07'),
(140, 'Narożnik LARGO rozkładany', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2681.99, NULL, '2022-12-18 13:44:49'),
(141, 'Narożnik STAY rozkładany', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 4369.99, NULL, '2022-12-18 13:45:08'),
(142, 'Narożnik MADRYT rozkładany', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 3035.99, NULL, '2022-12-18 13:46:05'),
(143, 'Narożnik CHILE rozkładany', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2115.99, NULL, '2022-12-18 13:46:38'),
(144, 'Narożnik AVANTI rozkładany', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 3863.99, NULL, '2022-12-18 13:47:04'),
(145, 'Narożnik SKY rozkładany', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 3899.99, NULL, '2022-12-18 13:47:27'),
(146, 'Narożnik rozkładany popielaty', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2349.99, NULL, '2022-12-18 13:48:56'),
(147, 'Narożnik TRENTON rozkładany', 'kanapy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 3007.99, NULL, '2022-12-18 13:50:34'),
(148, 'Lampa podłogowa nowoczesna podwójna', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 179.99, NULL, '2022-12-18 13:54:40'),
(149, 'Lampa na drewnianym trójnogu', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 539.99, NULL, '2022-12-18 22:33:20'),
(150, 'Lampa podłogowa łukowa', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 199.99, NULL, '2022-12-18 22:33:48'),
(151, 'Lampa podłogowa ze światłem punktowym', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 399.99, NULL, '2022-12-18 22:34:08'),
(152, 'Lampa podłogowa abażur czarny', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 399.99, NULL, '2022-12-18 22:34:22'),
(153, 'Lampa podłogowa ze szklaną ozdobą', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 659.99, NULL, '2022-12-18 22:34:41'),
(154, 'Lampa podłogowa nowoczesna', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 499.99, NULL, '2022-12-18 22:35:33'),
(155, 'Lampa podłogowa loftowa', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 529.99, NULL, '2022-12-18 22:36:01'),
(156, 'Lampa podłogowa z regulowanym ramieniem', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 489.99, NULL, '2022-12-18 22:36:42'),
(157, 'Lampa podłogowa punktowa LED', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 249.99, NULL, '2022-12-18 22:37:14'),
(158, 'Lampa podłogowa metalowy trójnóg', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 359.99, NULL, '2022-12-18 22:37:36'),
(159, 'Lampa podłogowa czarna LOFT', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 391.99, NULL, '2022-12-18 22:38:01'),
(160, 'Lampa podłogowa loftowa industrialna', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1079.99, NULL, '2022-12-18 22:38:26'),
(161, 'Lampa podłogowa łukowa BELLA LED', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 349.99, NULL, '2022-12-18 22:38:55'),
(162, 'Lampa podłogowa do salonu nowoczesna', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 289.99, NULL, '2022-12-18 22:39:44');
INSERT INTO `produkty` (`id`, `nazwa`, `kategoria`, `opis`, `cena`, `poprzednia_cena`, `data_wypuszczenia`) VALUES
(163, 'Lampa podłogowa nowoczesna czarna', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1079.99, NULL, '2022-12-18 22:40:43'),
(164, 'Lampa podłogowa drewniana', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 679.99, NULL, '2022-12-18 22:41:04'),
(165, 'Lampa podłogowa RATTAN', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 455.99, NULL, '2022-12-18 22:41:28'),
(166, 'Lampa łukowa do salonu kamienna', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 699.99, NULL, '2022-12-18 22:42:01'),
(167, 'Lampa podłogowa ozdobna', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 899.99, NULL, '2022-12-18 22:42:31'),
(168, 'Lampa podłogowa kształt żarówki', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 429.99, NULL, '2022-12-18 22:42:55'),
(169, 'Lampa podłogowa na czarnym trójnogu', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 359.99, NULL, '2022-12-18 22:43:44'),
(170, 'Lampa podłogowa LED', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 409.99, NULL, '2022-12-18 22:44:48'),
(171, 'Lampa podłogowa kule złota', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 639.99, NULL, '2022-12-18 22:45:09'),
(172, 'Lampa podłogowa LED MAJA', 'lampy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 749.99, NULL, '2022-12-18 22:45:30'),
(173, 'Lustro okrągłe metalowe 29,3 cm', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 59.99, NULL, '2022-12-18 22:47:38'),
(174, 'Lustro stojące SLIM', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 199.99, NULL, '2022-12-18 22:48:09'),
(175, 'Lustro stojące w złotej ramie', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 199.99, NULL, '2022-12-18 22:48:25'),
(176, 'Lustro w czarnej ramie', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 143.99, NULL, '2022-12-18 22:48:54'),
(177, 'Lustro okrągłe czarne 51 cm', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 109.99, NULL, '2022-12-18 22:49:13'),
(178, 'Lustro w złotej ramie MILANO', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 479.99, NULL, '2022-12-18 22:49:35'),
(179, 'Lustro w białej ramie SLIM', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 215.99, NULL, '2022-12-18 22:50:05'),
(180, 'Lustro BERGEN', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 379.99, NULL, '2022-12-18 22:50:46'),
(181, 'Lustro AREZZO', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 299.99, NULL, '2022-12-18 22:51:27'),
(182, 'Lustro w czarnej ramie PIKO', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 279.99, NULL, '2022-12-18 22:52:09'),
(183, 'Lustro BARI', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 249.99, NULL, '2022-12-18 22:52:29'),
(184, 'Lustro TOSCANIA', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 369.99, NULL, '2022-12-18 22:53:07'),
(185, 'Lustro do przedpokoju wiszące', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 169.99, NULL, '2022-12-18 22:53:25'),
(186, 'Lustro w srebrnej ramie VERONA', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 549.99, NULL, '2022-12-18 22:53:49'),
(187, 'Lustro w szampańskiej ramie', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 249.99, NULL, '2022-12-18 22:54:12'),
(188, 'Lusterko do makijażu z oświetleniem', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 299.99, NULL, '2022-12-18 22:55:00'),
(189, 'Lustro wiszące z półką RYLOTH', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 206.99, NULL, '2022-12-18 22:55:38'),
(190, 'Lusterko okrągłe na sznurku', 'lustra', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 79.99, NULL, '2022-12-18 22:56:15'),
(191, 'Łóżko rustykalne ze stelażem', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 959.99, NULL, '2022-12-18 22:58:08'),
(192, 'Łóżko z dostawką RICO', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1259.99, NULL, '2022-12-18 22:58:29'),
(193, 'Łóżko piętrowe szare KRZYŚ 2S', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1679.99, NULL, '2022-12-18 22:58:58'),
(194, 'Łóżko tapicerowane czarną ekoskórą', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1129.99, NULL, '2022-12-18 23:00:07'),
(195, 'Łóżko ERDEN 2S', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 899.99, NULL, '2022-12-18 23:01:08'),
(196, 'Łóżko DIESEL', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 781.99, NULL, '2022-12-18 23:02:07'),
(197, 'Łóżko JAWA 1S JWL1162', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1250.99, NULL, '2022-12-18 23:02:28'),
(198, 'Łóżko białe z oświetleniem MARSYLIA', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1479.99, NULL, '2022-12-18 23:02:55'),
(199, 'Łóżko szare z pojemnikiem MEZO', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1499.99, NULL, '2022-12-18 23:03:11'),
(200, 'Łóżko NORTON 140', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 505.99, NULL, '2022-12-18 23:03:34'),
(201, 'Łóżko FARGO 120x200', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 899.99, NULL, '2022-12-18 23:03:59'),
(202, 'Łóżko welurowe ROCK', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1783.99, NULL, '2022-12-18 23:04:24'),
(203, 'Łóżko kontynentalne LIMAND FUNDAMENTO', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2779.99, NULL, '2022-12-18 23:04:51'),
(204, 'Łóżko CLIF CLFL1121-C546', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 543.99, NULL, '2022-12-18 23:05:11'),
(205, 'Łóżko SARDINIA 160x200', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1106.99, NULL, '2022-12-18 23:05:29'),
(206, 'Łóżko ze stelażem MOOD', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1213.99, NULL, '2022-12-18 23:05:49'),
(207, 'Łóżko drewniane LIMEA', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2589.99, NULL, '2022-12-18 23:06:06'),
(208, 'Łóżko z szafkami nocnymi i oświetleniem', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2149.99, NULL, '2022-12-18 23:06:29'),
(209, 'Łóżko SNOW SNWL09', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 559.99, NULL, '2022-12-18 23:06:50'),
(210, 'Łóżko COLLET 160x200', 'lozka', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 602.99, NULL, '2022-12-18 23:07:07'),
(211, 'Regał MAURO 107,2x107,2', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 350.99, NULL, '2022-12-18 23:08:21'),
(212, 'Regał GALANDO 3P', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 349.99, NULL, '2022-12-18 23:08:39'),
(213, 'Regał TEMPRA 2 z 6 wnękami loft', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 278.99, NULL, '2022-12-18 23:08:59'),
(214, 'Regał UNIWERSUM biały', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 215.99, NULL, '2022-12-18 23:09:17'),
(215, 'Regał nowoczesny biały AURA', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 265.99, NULL, '2022-12-18 23:09:34'),
(216, 'Regał nowoczesny dąb sonoma MOVE', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 269.99, NULL, '2022-12-18 23:10:04'),
(217, 'Regał NORTON', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 615.99, NULL, '2022-12-18 23:10:26'),
(218, 'Regał STEP 1D2S', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 541.99, NULL, '2022-12-18 23:10:46'),
(219, 'Regał STONE II 1S', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 459.99, NULL, '2022-12-18 23:11:08'),
(220, 'Regał PORTO', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 699.99, NULL, '2022-12-18 23:11:35'),
(221, 'Regał HAVANNA 2D', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 889.99, NULL, '2022-12-18 23:11:50'),
(222, 'Regał metalowy industrialny', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 399.99, NULL, '2022-12-18 23:12:12'),
(223, 'Regał otwarty ERDEN 1D1S', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 539.99, NULL, '2022-12-18 23:12:35'),
(224, 'Biblioteka DISEGNO OFFICE niska', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 489.99, NULL, '2022-12-18 23:12:53'),
(225, 'Regał nowoczesny biały MOVE', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 269.99, NULL, '2022-12-18 23:13:16'),
(226, 'Regał FARGO FG-04', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 789.99, NULL, '2022-12-18 23:13:52'),
(227, 'Regał biały ELARA', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 674.99, NULL, '2022-12-18 23:14:12'),
(228, 'Regał z szufladami GAYA', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 495.99, NULL, '2022-12-18 23:14:29'),
(229, 'Biblioteczka regał GLOBO', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1139.99, NULL, '2022-12-18 23:14:50'),
(230, 'Regał MIA MI-02', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 659.99, NULL, '2022-12-18 23:15:20'),
(231, 'Regał BOSTON 5D', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1279.99, NULL, '2022-12-18 23:15:39'),
(232, 'Regał dwudrzwiowy TORONTO', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 769.99, NULL, '2022-12-18 23:16:02'),
(233, 'Regał z szufladami BILBAO', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 569.99, NULL, '2022-12-18 23:16:23'),
(234, 'Regał COTTAGE 2S', 'regaly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1249.99, NULL, '2022-12-18 23:16:45'),
(235, 'Stół rozkładany patyczak DOBBY', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 749.99, NULL, '2022-12-18 23:17:57'),
(236, 'Stół rozkładany ANTON', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1839.99, NULL, '2022-12-18 23:18:21'),
(237, 'Stół rozkładany MAX V', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 699.99, NULL, '2022-12-18 23:18:39'),
(238, 'Stół rozkładany okrągły COMET', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 689.99, NULL, '2022-12-18 23:18:57'),
(239, 'Stół retro z czarnymi nogami', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 669.99, NULL, '2022-12-18 23:19:15'),
(240, 'Stół okrągły drewniany czarny', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 719.99, NULL, '2022-12-18 23:19:37'),
(241, 'Stół rozkładany HALU II', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1449.99, NULL, '2022-12-18 23:19:54'),
(242, 'Stół rozkładany NEXT', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1389.99, NULL, '2022-12-18 23:20:09'),
(243, 'Stół rozkładany KOLOS', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 4689.99, NULL, '2022-12-18 23:20:36'),
(244, 'Stół rozkładany MALMO', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 949.99, NULL, '2022-12-18 23:20:56'),
(245, 'Stół rozkładany SIRA', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 849.99, NULL, '2022-12-18 23:21:09'),
(246, 'Stół rozkładany NOHA', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 937.99, NULL, '2022-12-18 23:21:28'),
(247, 'Stół MARS dąb wotan', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1699.99, NULL, '2022-12-18 23:21:57'),
(248, 'Stół SATURN', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1029.99, NULL, '2022-12-18 23:22:16'),
(249, 'Stół rozkładany POLDARK', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 979.99, NULL, '2022-12-18 23:27:02'),
(250, 'Stół z litego drewna ARTISTICO', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2207.99, NULL, '2022-12-18 23:27:31'),
(251, 'Stół rozkładany EGON', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1199.99, NULL, '2022-12-18 23:27:53'),
(252, 'Stół rozkładany UBBE', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 4617.99, NULL, '2022-12-18 23:28:25'),
(253, 'Stół rozkładany LINOSA 2', 'stoly', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2319.99, NULL, '2022-12-18 23:29:03'),
(254, 'Szafa WINNER 2', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 899.99, NULL, '2022-12-18 23:30:50'),
(255, 'Szafa TEMPRA 2 2D', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 422.99, NULL, '2022-12-18 23:31:14'),
(256, 'Szafa NARAGO 4D', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1649.99, NULL, '2022-12-18 23:31:45'),
(257, 'Szafa BASTIA 150', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1213.99, NULL, '2022-12-18 23:32:08'),
(258, 'Szafa STONE II 2D', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 781.99, NULL, '2022-12-18 23:32:27'),
(259, 'Szafa BASTIA 250', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1673.99, NULL, '2022-12-18 23:32:49'),
(260, 'Szafa SARDINIA 2D', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 2366.99, NULL, '2022-12-18 23:33:02'),
(261, 'Szafa TEMPRA 2 loft', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 422.99, NULL, '2022-12-18 23:33:18'),
(262, 'Szafa z drążkiem ASSUMEA', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 314.99, NULL, '2022-12-18 23:33:38'),
(263, 'Szafa MALI 150', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1199.99, NULL, '2022-12-18 23:34:02'),
(264, 'Szafa NORTON 3D4S', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1305.99, NULL, '2022-12-18 23:34:35'),
(265, 'Szafa - Regał KOBE', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1277.99, NULL, '2022-12-18 23:35:15'),
(266, 'Szafa z drążkiem biała KHANEA', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 674.99, NULL, '2022-12-18 23:35:29'),
(267, 'Szafa z lustrem KARO', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 899.99, NULL, '2022-12-18 23:35:46'),
(268, 'Szafa przesuwna z lustrem KIER', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1169.99, NULL, '2022-12-18 23:36:09'),
(269, 'Szafa COLLET', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1430.99, NULL, '2022-12-18 23:36:28'),
(270, 'Szafa przesuwna biała TREFL', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 1199.99, NULL, '2022-12-18 23:36:54'),
(271, 'Szafa ERDEN 4D1S', 'szafy', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur vero animi incidunt blanditiis iure amet nihil. Ipsa nihil facilis architecto numquam accusantium. Error cum obcaecati fuga aliquid labore voluptatem sequi!', 769.99, NULL, '2022-12-18 23:37:19');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `reakcje`
--

CREATE TABLE `reakcje` (
  `id` int(11) NOT NULL,
  `id_reagujacego` int(11) NOT NULL,
  `id_komentarza` int(11) NOT NULL,
  `typ` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

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

--
-- Zrzut danych tabeli `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `phpsessid`, `token`, `data_wygasniecia`) VALUES
(10, 2, '$2y$10$K7yAeX2Dmj0SS2hnxS9Z0OdqVhUT0mKrjRSegi0HkjByT29GBJvlW', 'fdde890a1d63a3aa5fc66ae200d8c53b', '2023-01-28 15:51:12');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ulubione`
--

CREATE TABLE `ulubione` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `id_produktu` int(11) NOT NULL,
  `data_dodania` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `ulubione`
--

INSERT INTO `ulubione` (`id`, `user_id`, `id_produktu`, `data_dodania`) VALUES
(3, 2, 118, '2022-12-29 17:02:30'),
(4, 2, 245, '2022-12-29 17:02:30'),
(6, 2, 107, '2022-12-29 17:02:32'),
(7, 2, 17, '2022-12-29 17:02:33');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `imie` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `nazwisko` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `nr_telefonu` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `haslo` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `kraj` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `miasto` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `kod_pocztowy` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `adres` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `data_dolaczenia` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `imie`, `nazwisko`, `nr_telefonu`, `email`, `haslo`, `kraj`, `miasto`, `kod_pocztowy`, `adres`, `data_dolaczenia`) VALUES
(2, 'Wojciech', 'Brońka', '+48123123123', 'wojci.bro@gmail.com', '$2y$10$KESSLyjjx7FxucZPkR0GN.2hXMkIfRMRVebaeuAb7MjqyJKlkYD9a', 'Polska', 'Kety', '32-650', 'ul.Szkotnia, 7c', '2022-12-17 15:57:47');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wiadomosci`
--

CREATE TABLE `wiadomosci` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `imie` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `nazwisko` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `nr_telefonu` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `firma` varchar(255) COLLATE utf8mb4_polish_ci DEFAULT NULL,
  `temat` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL,
  `tresc` text COLLATE utf8mb4_polish_ci NOT NULL,
  `data_wyslania` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) COLLATE utf8mb4_polish_ci NOT NULL DEFAULT 'nierozpatrzona'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `komentarze`
--
ALTER TABLE `komentarze`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_produktu` (`id_produktu`),
  ADD KEY `id_autora` (`id_autora`);

--
-- Indeksy dla tabeli `koszyki`
--
ALTER TABLE `koszyki`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `id_produktu` (`id_produktu`);

--
-- Indeksy dla tabeli `produkty`
--
ALTER TABLE `produkty`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nazwa` (`nazwa`);

--
-- Indeksy dla tabeli `reakcje`
--
ALTER TABLE `reakcje`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_reagujacego` (`id_reagujacego`),
  ADD KEY `id_komentarza` (`id_komentarza`);

--
-- Indeksy dla tabeli `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `ulubione`
--
ALTER TABLE `ulubione`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `id_produktu` (`id_produktu`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeksy dla tabeli `wiadomosci`
--
ALTER TABLE `wiadomosci`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `komentarze`
--
ALTER TABLE `komentarze`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT dla tabeli `koszyki`
--
ALTER TABLE `koszyki`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT dla tabeli `produkty`
--
ALTER TABLE `produkty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=272;

--
-- AUTO_INCREMENT dla tabeli `reakcje`
--
ALTER TABLE `reakcje`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT dla tabeli `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT dla tabeli `ulubione`
--
ALTER TABLE `ulubione`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `wiadomosci`
--
ALTER TABLE `wiadomosci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `komentarze`
--
ALTER TABLE `komentarze`
  ADD CONSTRAINT `komentarze_ibfk_1` FOREIGN KEY (`id_autora`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `komentarze_ibfk_2` FOREIGN KEY (`id_produktu`) REFERENCES `produkty` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `koszyki`
--
ALTER TABLE `koszyki`
  ADD CONSTRAINT `koszyki_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `koszyki_ibfk_2` FOREIGN KEY (`id_produktu`) REFERENCES `produkty` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `reakcje`
--
ALTER TABLE `reakcje`
  ADD CONSTRAINT `reakcje_ibfk_1` FOREIGN KEY (`id_reagujacego`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reakcje_ibfk_2` FOREIGN KEY (`id_komentarza`) REFERENCES `komentarze` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `ulubione`
--
ALTER TABLE `ulubione`
  ADD CONSTRAINT `ulubione_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ulubione_ibfk_2` FOREIGN KEY (`id_produktu`) REFERENCES `produkty` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `wiadomosci`
--
ALTER TABLE `wiadomosci`
  ADD CONSTRAINT `wiadomosci_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
