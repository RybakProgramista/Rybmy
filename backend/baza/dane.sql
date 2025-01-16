-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sty 16, 2025 at 01:49 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.0.30

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
(5, 'kacper', '$2b$10$s0xNRNq9BS5C7TELhTvXreOe/RJuHi1jVoJIWq5GYSHPnX/F7FG.G', 0, NULL),
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
        VALUES(new.id, new.login) ;
        
        INSERT INTO znajomi(znajomi.idGracz)
        VALUES (new.id);
END
$$
DELIMITER ;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `dane`
--
ALTER TABLE `dane`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dane`
--
ALTER TABLE `dane`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
