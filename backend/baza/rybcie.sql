-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2025 at 03:00 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rybcie`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dane`
--

CREATE TABLE `dane` (
  `id` int(11) NOT NULL,
  `login` varchar(50) NOT NULL,
  `haslo` varchar(60) NOT NULL,
  `licznik` int(11) NOT NULL,
  `dataBlokady` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `dane`
--

INSERT INTO `dane` (`id`, `login`, `haslo`, `licznik`, `dataBlokady`) VALUES
(1, '[value-2]', '[value-3]', 0, NULL),
(4, 'ja', 'ja', 0, NULL),
(5, 'kacper', '$2b$10$EinMgT8.Ig526mLVGcRj.Oe7uKSXA9ovTkEYjt/6ERMB0.tKutSzS', 0, '2024-12-19 14:32:51'),
(6, 'jacek', '123', 0, NULL),
(7, '123', 'asd', 0, NULL),
(8, '4566', 'qwe', 0, NULL),
(9, 'zzz5e2', 'g34wg', 0, NULL);

--
-- Wyzwalacze `dane`
--
DELIMITER $$
CREATE TRIGGER `dodawanie` AFTER INSERT ON `dane` FOR EACH ROW BEGIN
        INSERT INTO gracz(gracz.idGracz, gracz.nazwa)
        VALUES(new.id, new.login);
        
        INSERT INTO znajomi(znajomi.idGracz)
        VALUES (new.id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `gracz`
--

CREATE TABLE `gracz` (
  `idGracz` int(11) NOT NULL,
  `nazwa` varchar(30) NOT NULL,
  `doswiadczenie` int(11) NOT NULL,
  `pieniadze` int(11) NOT NULL DEFAULT 0,
  `wedka` text DEFAULT NULL,
  `kolowrotek` text DEFAULT NULL,
  `zylka` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `gracz`
--

INSERT INTO `gracz` (`idGracz`, `nazwa`, `doswiadczenie`, `pieniadze`, `wedka`, `kolowrotek`, `zylka`) VALUES
(1, '', 0, 15, '1;3;', '', '1;1;1;\'2\';11;3;'),
(4, '', 0, 70, NULL, NULL, NULL),
(5, 'kacper', 0, 0, '2;', NULL, NULL),
(6, 'jacek', 0, 0, NULL, NULL, NULL),
(7, '123', 0, 0, NULL, NULL, NULL),
(8, '4566', 0, 0, NULL, NULL, NULL),
(9, 'zzz5e2', 0, 0, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kolowrotek`
--

CREATE TABLE `kolowrotek` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(50) NOT NULL,
  `wytrzymalosc` int(11) NOT NULL,
  `cena` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `kolowrotek`
--

INSERT INTO `kolowrotek` (`id`, `nazwa`, `wytrzymalosc`, `cena`) VALUES
(1, 'Ręka', 30, 50),
(2, 'Midako', 60, 0),
(3, 'Robin', 90, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `poziom`
--

CREATE TABLE `poziom` (
  `id` int(11) NOT NULL,
  `iloscXP` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `poziom`
--

INSERT INTO `poziom` (`id`, `iloscXP`) VALUES
(1, 0),
(2, 200),
(3, 350),
(4, 650),
(5, 800),
(6, 1200),
(7, 1650),
(8, 2200);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ryby`
--

CREATE TABLE `ryby` (
  `idRyby` int(11) NOT NULL,
  `nazwa` varchar(50) NOT NULL,
  `obrazek` varchar(50) NOT NULL,
  `minKg` int(11) NOT NULL,
  `maxKg` int(11) NOT NULL,
  `minWymiar` int(11) NOT NULL,
  `maxWymiar` int(11) NOT NULL,
  `cena` int(11) NOT NULL,
  `doswiadczenie` double NOT NULL,
  `wystepowanie` varchar(100) NOT NULL,
  `opis` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `ryby`
--

INSERT INTO `ryby` (`idRyby`, `nazwa`, `obrazek`, `minKg`, `maxKg`, `minWymiar`, `maxWymiar`, `cena`, `doswiadczenie`, `wystepowanie`, `opis`) VALUES
(1, 'Karp', 'karp1.png', 700, 22000, 15, 120, 20, 0.0055, 'Odra,', 'Karp to duża, słodkowodna ryba z rodziny karpiowatych. Jako gatunek, powstał na drodze naturalnej poliploidyzacji na przełomie trzeciorzędu i czwartorzędu w okolicach Morza Kaspijskiego i wschodniej Anatolii. Forma dzika (sazan) występowała pierwotnie w Europie południowo-wschodniej i Azji zachodniej w zlewiskach mórz Egejskiego, Czarnego, Kaspijskiego i Aralskiego. Obecnie na wolności występuje praktycznie w całej Europie, Bliskim Wschodzie i Północnej Afryce. '),
(2, 'Płoć', '', 300, 2300, 6, 50, 10, 0.0055, 'Odra,', 'Płoć to gatunek niedużej ryby słodkowodnej z rodziny karpiowatych występującej w całej Europie z wyjątkiem Półwyspu Iberyjskiego, zlewiska Adriatyku, Grecji oraz północnej Skandynawii, indukowana w wielu miejscach - na wschodzie - np. jej habitat sięga daleko w głąb Azji. '),
(3, 'Leszcz', '', 600, 6200, 13, 85, 17, 0.0055, 'Odra,', 'Leszcz to gatunek średniej wielkości ryby słodkowodnej z rodziny karpiowatych. Występuje w niemal całej Europie z wyjątkiem fragmentów Półwyspu Iberyjskiego, Apenińskiego, zachodniej Francji, południowej części Półwyspu Bałkańskiego, północnej Szkocji oraz północnej Skandynawii. Występuje także w zachodniej Azji, został również zaaklimatyzowany na wielu obszarach Syberii. '),
(4, 'Sandacz', '', 900, 16000, 18, 140, 28, 0.0055, 'Odra,', 'Sandacz to gatunek słodkowodnej, drapieżnej ryby z rodziny okoniowatych zamieszkujący Europę od dorzecza Renu i Rodanu po Morze Kaspijskie oraz południowa Anglia. Brak go w północnej Skandynawii, północnej Rosji oraz na półwyspach Apenińskim i Bałkańskim. '),
(5, 'Okoń', '', 400, 4500, 11, 65, 16, 0.0055, 'Odra, ', 'Okoń to gatunek średniej wielkości, drapieżnej ryby słodkowodnej zamieszkującej Europę z wyjątkiem Półwyspu Iberyjskiego, Szkocji, zachodniej Skandynawii, południowych i środkowych Włoch i zachodniej części Bałkanów oraz Azję aż do rzeki Kołymy. Aklimatyzowany w Australii. '),
(6, 'Sum', '', 1000, 30000, 23, 470, 23, 0.0055, 'Odra, ', 'Sum europejski to gatunek dużej, drapieżnej ryby z rodziny sumowatych zamieszkujący głównie duże rzeki o miękkim podłożu, starorzecza oraz ciepłe jeziora w Europie Środkowej i Wschodniej. Liczny w zlewisku Bałtyku i Morza Czarnego, gdzie spotykany bywa również w wodach słonawych. Został sztucznie introdukowany we Włoszech, na terenie Francji oraz na Półwyspie Iberyjskim. '),
(7, 'Brzana', '', 800, 12000, 16, 120, 14, 0.0055, 'Odra, ', 'Brzana to średniej wielkości, typowa rzeczna ryba z rodziny karpiowatych. Występuje w dorzeczach Loary, Rodanu, Renu, Dunaju, Łaby, Odry, Wisły, Tamizy, Niemna, Dniestru i Dniepru oraz na Półwyspie Iberyjskim. Introdukowana we Włoszech i Maroku. '),
(8, 'Jesiotr', '', 1200, 23000, 21, 275, 80, 0.0095, 'Odra, ', 'Jesiotry pojawiły się na Ziemi jeszcze przed dinozaurami, około 300 milionów lat temu. Bezpośredni przodek jesiotrów, które znamy dziś, pojawił się we wczesnej Jurze, około 200 milionów lat temu i od tego czasu ryby te praktycznie się nie zmieniły. Warto podkreślić, że jesiotry przetrwały wymieranie dinozaurów.W wyniku działalności człowieka populacja jesiotrów zaczęła gwałtownie spadać.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wedka`
--

CREATE TABLE `wedka` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(50) NOT NULL,
  `wytrzymalosc` int(11) NOT NULL,
  `cena` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `wedka`
--

INSERT INTO `wedka` (`id`, `nazwa`, `wytrzymalosc`, `cena`) VALUES
(1, 'Patyk', 50, 0),
(2, 'Midako', 100, 0),
(3, 'Haxon', 150, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `znajomi`
--

CREATE TABLE `znajomi` (
  `idGracz` int(11) NOT NULL,
  `idZnajomy` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `znajomi`
--

INSERT INTO `znajomi` (`idGracz`, `idZnajomy`) VALUES
(5, '6;5'),
(7, ''),
(8, '7;'),
(9, '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zylka`
--

CREATE TABLE `zylka` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(50) NOT NULL,
  `wytrzymalosc` int(11) NOT NULL,
  `cena` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `zylka`
--

INSERT INTO `zylka` (`id`, `nazwa`, `wytrzymalosc`, `cena`) VALUES
(1, 'Sznurek', 20, 0),
(2, 'Midako', 40, 30),
(3, 'Robin', 60, 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `dane`
--
ALTER TABLE `dane`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `gracz`
--
ALTER TABLE `gracz`
  ADD KEY `idGracz` (`idGracz`);

--
-- Indeksy dla tabeli `kolowrotek`
--
ALTER TABLE `kolowrotek`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `poziom`
--
ALTER TABLE `poziom`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `ryby`
--
ALTER TABLE `ryby`
  ADD PRIMARY KEY (`idRyby`);

--
-- Indeksy dla tabeli `wedka`
--
ALTER TABLE `wedka`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `znajomi`
--
ALTER TABLE `znajomi`
  ADD UNIQUE KEY `idGracz` (`idGracz`);

--
-- Indeksy dla tabeli `zylka`
--
ALTER TABLE `zylka`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dane`
--
ALTER TABLE `dane`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `kolowrotek`
--
ALTER TABLE `kolowrotek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `poziom`
--
ALTER TABLE `poziom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `ryby`
--
ALTER TABLE `ryby`
  MODIFY `idRyby` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `wedka`
--
ALTER TABLE `wedka`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `zylka`
--
ALTER TABLE `zylka`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gracz`
--
ALTER TABLE `gracz`
  ADD CONSTRAINT `gracz_ibfk_1` FOREIGN KEY (`idGracz`) REFERENCES `dane` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
