-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 19 Wrz 2021, 19:32
-- Wersja serwera: 10.4.17-MariaDB
-- Wersja PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `ideabook`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `account`
--

CREATE TABLE `account` (
  `id_account` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `account_login` varchar(150) DEFAULT NULL,
  `id_pass` int(11) NOT NULL,
  `rang` int(1) NOT NULL DEFAULT 0,
  `account_password` varchar(255) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `date_added` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `account`
--

INSERT INTO `account` (`id_account`, `id_area`, `full_name`, `account_login`, `id_pass`, `rang`, `account_password`, `active`, `date_added`) VALUES
(4, 1, 'Maja Kępska', 'marski', 721146, 2, '$2y$10$TeLxid1Mgs0tnjIpO5rau.KSmm9tY3iDXzm9x5YW4GnXjFhn6Npy.', 1, '2021-01-01'),
(5, 2, 'Kuba Wojnicki', NULL, 12345, 0, NULL, 1, '2021-05-30'),
(8, 6, 'Marcin Kowalski', NULL, 1444, 0, NULL, 1, '2021-06-09'),
(9, 5, 'Kasia Grzebinoga', NULL, 1233, 0, NULL, 1, '2021-06-09'),
(10, 6, 'Mariusz Kępski', NULL, 11111, 0, NULL, 1, '2021-08-09'),
(11, 5, 'Kazimierz Kopalski', NULL, 1011, 0, NULL, 1, '2021-08-18'),
(12, 2, 'Jakub Mymla', NULL, 22222, 0, NULL, 1, '2021-09-18'),
(13, 4, 'Marcin Kolorowy', NULL, 14257, 0, NULL, 1, '2020-09-02'),
(14, 3, 'Karolina Waliska', NULL, 7778787, 0, NULL, 1, '2018-07-16'),
(15, 6, 'Ania Jakubczyk', NULL, 77777, 0, NULL, 1, '2021-09-24'),
(16, 5, 'Kuba Wrona', NULL, 45464, 0, NULL, 1, '2014-09-11');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `area`
--

CREATE TABLE `area` (
  `id_area` int(11) NOT NULL,
  `area_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `area`
--

INSERT INTO `area` (`id_area`, `area_name`) VALUES
(1, 'Admin'),
(2, 'Roto'),
(3, 'Polska'),
(4, 'Laminacja'),
(5, 'Rolnicy'),
(6, 'Programiści');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `idea`
--

CREATE TABLE `idea` (
  `id_idea` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  `topic` varchar(150) NOT NULL,
  `after_value` text NOT NULL,
  `before_value` text NOT NULL,
  `mod_comment` text DEFAULT NULL,
  `array_users` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `rating_user` text NOT NULL,
  `saving` float DEFAULT NULL,
  `date_added` date NOT NULL DEFAULT current_timestamp(),
  `date_implementation` date DEFAULT NULL,
  `idea_status` tinyint(1) NOT NULL DEFAULT 0,
  `token_idea` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `idea`
--

INSERT INTO `idea` (`id_idea`, `id_area`, `topic`, `after_value`, `before_value`, `mod_comment`, `array_users`, `rating_user`, `saving`, `date_added`, `date_implementation`, `idea_status`, `token_idea`) VALUES
(1, 1, 'Temat Jest taki', 'Ujednolicić komunikację, poprawność generowania danych zaznaczyć &lt;true&gt; lub &lt;false&gt; w zależności od komunikacji', 'Problem z utrzymaniem w czystości komunikacji między Api, a przeglądarką', NULL, '[4]', '{\"point\":\"30\",\"saving\":\"0\"}', NULL, '2021-06-02', NULL, 1, '2162/1'),
(2, 3, 'Stworzymy nowy świat.', 'Stworzyć jeden mechanizm obsługi. Lub wyodrębnić tylko najważniejsze mechanizmy', 'Bałagan z obsługą formularzy w js', NULL, '[4]', '{\"point\":\"20\",\"saving\":\"0\"}', NULL, '2021-06-03', '2021-06-04', 2, '2163/2'),
(3, 3, 'Obsługa formularza polska', 'Jedna klasa z obsługa forularza dla jednego formularza. Są zbyt różne aby je próbować pisać w jednym obiekcie. Kod staję się mało czytelny', 'Bałagan w kodzie JacaScript w obszarze obsługi formularzy', NULL, '[4]', '{\"point\":\"70\",\"saving\":\"0\"}', NULL, '2021-06-03', NULL, 3, '2163/3'),
(4, 1, 'Czyszczenie kodu Polska', 'Czyszczenie kodu', 'Bałagan w kodzie JavaScriprt uniemożliwia reafaktiryzacje kodu modułów i klas.', NULL, '[4]', '{\"point\":\"40\",\"saving\":\"0\"}', NULL, '2021-06-04', NULL, 0, '2164/4'),
(5, 3, 'Maszyna admina jest powolna', 'Wyszukanie nieczytelnych klas i ich zmodyfikowanie według aktualnego standardu zapisu. &lt;h4&gt; FUCK &lt;/h4&gt;', 'W aplikacji znajdują się klasy i moduły odbiegające od standardu.', NULL, '[4,5]', '{\"point\":\"30\",\"saving\":\"0\"}', NULL, '2021-06-04', '2021-06-09', 2, '2164/5'),
(6, 3, 'Szukamy polska i admin', 'Brak spójności w nazwach. Nazwy stosowane w kodzie są różne od nazw głównych plików. Może to prowadzić do dezorientacji. ', 'Stosować spójne nazwy.', NULL, '[4]', '{\"point\":\"10\",\"saving\":\"0\"}', NULL, '2021-06-05', NULL, 0, '2165/6'),
(21, 3, 'Laminiarze i admin', 'Test Formularza &lt;h4&gt; TEST &lt;/h4&gt;', 'Test Formularza', NULL, '[4,5]', '{\"point\":\"40\",\"saving\":\"1\"}', 45200, '2021-06-06', '2021-07-27', 2, '2166/21'),
(22, 3, 'Polska temat jest wesoły', 'Test Wczytywania listy Ofert', 'Test Wczytywania listy Ofert', NULL, '[4]', '{\"point\":\"30\",\"saving\":\"0\"}\r\n', NULL, '2021-06-06', NULL, 0, '2166/22'),
(23, 6, 'Admin czyta dzieciom', 'Napisać algorytm, który sprawdzi w tabeli z punktami czy powtarzają się w wartości, Jeżeli tak sprawdzenie będzie następowało w tabeli z ilością propozycji, który jest najwyższa. Podczas analizowania danych z dwóch tabel będą one usuwane aby nie doszło do pomyłek i niepotrzebnych obliczeń procesora', 'Brak logiki wyznaczania pozycji użytkownika na skali punktacji. Mianowicie - w pierwszej kolejności brane są do rankingu jest liczba zdobytych punktów. Jeżeli jednak liczba tych punktów jest jednakowa wyznacznikiem jest liczba propozycji. Brak również wyznaczania miejsc egzekwo.', NULL, '[8,4]', '{\"point\":\"10\",\"saving\":\"0\"}', NULL, '2021-06-15', '2021-06-15', 2, '21615/23'),
(24, 6, 'Ludzie polska test tematu', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL, '[5]', '{\"point\":\"40\",\"saving\":\"0\"}', NULL, '2021-06-16', '2021-06-16', 2, '21616/24'),
(25, 6, 'Lorem ipsum', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed orci nisl. Fusce sollicitudin ante sed rhoncus egestas. Nunc cursus elit eu ligula rutrum, eget iaculis nulla imperdiet. Integer sagittis viverra finibus. Nunc auctor at felis quis hendrerit. Donec enim justo, eleifend eu odio eget, scelerisque aliquet dolor. Sed in neque nisl. Nulla facilisi. Aenean tincidunt ultricies hendrerit. Suspendisse quis augue urna. Sed a vestibulum leo. Aenean congue porta sem in mattis. In hac habitasse platea dictumst. Fusce eu aliquet lacus. Nam dictum tortor non orci ultrices, a commodo orci dapibus. Donec vitae massa mauris.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed orci nisl. Fusce sollicitudin ante sed rhoncus egestas. Nunc cursus elit eu ligula rutrum, eget iaculis nulla imperdiet. Integer sagittis viverra finibus. Nunc auctor at felis quis hendrerit. Donec enim justo, eleifend eu odio eget, scelerisque aliquet dolor. Sed in neque nisl. Nulla facilisi. Aenean tincidunt ultricies hendrerit. Suspendisse quis augue urna. Sed a vestibulum leo. Aenean congue porta sem in mattis. In hac habitasse platea dictumst. Fusce eu aliquet lacus. Nam dictum tortor non orci ultrices, a commodo orci dapibus. Donec vitae massa mauris.', NULL, '[8]', '{\"point\":\"10\",\"saving\":\"1\"}\r\n', NULL, '2021-06-16', '2021-06-15', 2, '21616/25'),
(26, 6, 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestia', 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', 'Donec sed orci nisl. Fusce sollicitudin ante sed rhoncus egestas. Nunc cursus elit eu ligula rutrum, eget iaculis nulla imperdiet. Integer sagittis viverra finibus. Nunc auctor at felis quis hendrerit. Donec enim justo, eleifend eu odio eget, scelerisque aliquet dolor. Sed in neque nisl. Nulla facilisi. Aenean tincidunt ultricies hendrerit. Suspendisse quis augue urna. Sed a vestibulum leo. Aenean congue porta sem in mattis. ', '[8]', '{\"point\":\"10\",\"saving\":\"0\"}\r\n', NULL, '2021-06-16', '2021-06-15', 2, '21616/26'),
(27, 3, 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestia', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL, '[9]', '{\"point\":\"10\",\"saving\":\"0\"}\r\n', NULL, '2021-06-16', '2021-06-15', 2, '21616/27'),
(28, 3, 'At vero eos et accusamus et iusto odio occaecati cupiditate non provident, similique sunt in culpa qui ', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis lacinia lacus, non aliquet nibh consequat in. Praesent semper non magna ut rutrum. Morbi faucibus condimentum imperdiet. Pellentesque est diam, faucibus eget ullamcorper fringilla, egestas non elit. Donec consectetur, lectus sit amet commodo dictum, tellus mauris luctus neque, consectetur tristique ante risus eget turpis. Sed eget ornare justo. Ut mollis turpis sit amet mattis porttitor. Nullam semper venenatis velit, et dictum ipsum volutpat quis. Quisque suscipit, ante eget finibus vulputate, quam neque hendrerit dolor, tempor pretium arcu arcu tincidunt urna. In eu quam mattis, ullamcorper purus sed, ultrices leo. Suspendisse porta volutpat ultricies. Nam justo mauris, pharetra et consectetur finibus, rutrum ut elit.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis lacinia lacus, non aliquet nibh consequat in. Praesent semper non magna ut rutrum. Morbi faucibus condimentum imperdiet. Pellentesque est diam, faucibus eget ullamcorper fringilla, egestas non elit. Donec consectetur, lectus sit amet commodo dictum, tellus mauris luctus neque, consectetur tristique ante risus eget turpis. Sed eget ornare justo. Ut mollis turpis sit amet mattis porttitor. Nullam semper venenatis velit, et dictum ipsum volutpat quis. Quisque suscipit, ante eget finibus vulputate, quam neque hendrerit dolor, tempor pretium arcu arcu tincidunt urna. In eu quam mattis, ullamcorper purus sed, ultrices leo. Suspendisse porta volutpat ultricies. Nam justo mauris, pharetra et consectetur finibus, rutrum ut elit.', 'Cras quis enim neque. Phasellus porta ullamcorper sapien id condimentum. Ut enim nunc, imperdiet egestas fermentum id, suscipit eu dolor. Aenean quis efficitur libero, quis vestibulum massa. Donec vel interdum tortor. Fusce finibus arcu vel tellus tristique, nec pharetra elit posuere. Nulla molestie nulla sed mauris commodo consequat. Nam gravida semper porta.', '[8]', '{\"point\":\"20\",\"saving\":\"1\"}', 1100, '2021-07-12', NULL, 1, '21712/28'),
(29, 3, 'At vero eos et accusamus et iusto odio occaecati cupiditate non provident, similique sunt in culpa qui ', 'Morbi cursus accumsan sapien, sed accumsan turpis. Pellentesque viverra ante in purus molestie, ac euismod nibh pellentesque. Donec vulputate a velit sed lobortis. Sed tempor sit amet tortor et tristique. Sed vitae molestie ex, et mattis dolor. Pellentesque maximus porta metus ac gravida. Curabitur et massa elementum, congue libero ac, consectetur metus. Phasellus ultrices congue augue vitae mollis. Praesent suscipit nisl non ipsum luctus, vitae bibendum enim malesuada.', 'Morbi cursus accumsan sapien, sed accumsan turpis. Pellentesque viverra ante in purus molestie, ac euismod nibh pellentesque. Donec vulputate a velit sed lobortis. Sed tempor sit amet tortor et tristique. Sed vitae molestie ex, et mattis dolor. Pellentesque maximus porta metus ac gravida. Curabitur et massa elementum, congue libero ac, consectetur metus. Phasellus ultrices congue augue vitae mollis. Praesent suscipit nisl non ipsum luctus, vitae bibendum enim malesuada.', NULL, '[8]', '{\"point\":\"10\",\"saving\":\"0\"}', NULL, '2021-07-13', '2021-07-13', 2, '21713/29'),
(30, 6, 'At vero eos et accusamus et iusto odio occaecati cupiditate non provident, similique sunt in culpa qui ', 'orem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis lacinia lacus, non aliquet nibh consequat in. Praesent semper non magna ut rutrum. Morbi faucibus condimentum imperdiet. Pellentesque est diam, faucibus eget ullamcorper fringilla, egestas non elit. Donec consectetur, lectus sit amet commodo dictum, tellus mauris luctus neque, consectetur tristique ante risus eget turpis. Sed eget ornare justo. Ut mollis turpis sit amet mattis porttitor.', 'orem ipsum dolor sit amet, consectetur adipiscing elit. Nam mollis lacinia lacus, non aliquet nibh consequat in. Praesent semper non magna ut rutrum. Morbi faucibus condimentum imperdiet. Pellentesque est diam, faucibus eget ullamcorper fringilla, egestas non elit. Donec consectetur, lectus sit amet commodo dictum, tellus mauris luctus neque, consectetur tristique ante risus eget turpis. Sed eget ornare justo. Ut mollis turpis sit amet mattis porttitor.', NULL, '[4]', '{\"point\":\"10\",\"saving\":\"0\"}', NULL, '2021-07-13', '2021-07-12', 2, '21713/30'),
(31, 3, 'Tera wpiszemy coś innego', 'Cras quis enim neque. Phasellus porta ullamcorper sapien id condimentum. Ut enim nunc, imperdiet egestas fermentum id, suscipit eu dolor. Aenean quis efficitur libero, quis vestibulum massa. Donec vel interdum tortor. Fusce finibus arcu vel tellus tristique, nec pharetra elit posuere. Nulla molestie nulla sed mauris commodo consequat. Nam gravida semper porta.', 'Cras quis enim neque. Phasellus porta ullamcorper sapien id condimentum. Ut enim nunc, imperdiet egestas fermentum id, suscipit eu dolor. Aenean quis efficitur libero, quis vestibulum massa. Donec vel interdum tortor. Fusce finibus arcu vel tellus tristique, nec pharetra elit posuere. Nulla molestie nulla sed mauris commodo consequat. Nam gravida semper porta.', 'Fusce finibus arcu vel tellus tristique, nec pharetra elit posuere. Nulla molestie nulla sed mauris commodo consequat. Nam gravida semper porta.', '[8]', '{\"point\":\"10\",\"saving\":\"1\"}', 8000, '2021-07-13', '2021-07-12', 2, '21713/31'),
(32, 3, 'At vero eos et accusamus et iusto odio occaecati cupiditate non provident, similique sunt in culpa qui ', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', NULL, '[8]', '{\"point\":\"10\",\"saving\":\"0\"}', NULL, '2021-07-13', NULL, 1, '21713/32'),
(34, 3, 'At vero eos et accusamus et iusto odio occaecati cupiditate non provident, similique sunt in culpa qui ', 'Sed consequat libero sem, et congue est vulputate eget. Proin quis enim eget tellus sollicitudin tincidunt vel sed ligula. Nullam enim lorem, egestas quis tincidunt id, volutpat eget diam. Nam feugiat a mauris ac dictum. Vivamus porttitor risus vitae nunc interdum scelerisque. Integer id consequat magna. Quisque finibus ex justo, ut finibus orci posuere non. Ut posuere lorem vitae hendrerit iaculis. Sed nulla justo, maximus ut nisi eu, scelerisque bibendum ipsum. Mauris placerat justo eget risus vehicula, eu suscipit velit tristique.', 'Sed consequat libero sem, et congue est vulputate eget. Proin quis enim eget tellus sollicitudin tincidunt vel sed ligula. Nullam enim lorem, egestas quis tincidunt id, volutpat eget diam. Nam feugiat a mauris ac dictum. Vivamus porttitor risus vitae nunc interdum scelerisque. Integer id consequat magna. Quisque finibus ex justo, ut finibus orci posuere non. Ut posuere lorem vitae hendrerit iaculis.', ' Sed nulla justo, maximus ut nisi eu, scelerisque bibendum ipsum. Mauris placerat justo eget risus vehicula, eu suscipit velit tristique.', '[8]', '{\"point\":\"10\",\"saving\":\"0\"}', NULL, '2021-07-13', NULL, 3, '21713/34'),
(35, 4, 'At vero eos et accusamus et iusto odio occaecati cupiditate non provident, similique sunt in culpa qui ', 'JavaScript Array findIndex() Method - W3SchoolsPrzetłumacz tę stronę\r\nhttps://www.w3schools.com/jsref/jsref_findindex.asp\r\nJavaScript Array.findIndex () Definition and Usage. The Array.findIndex () method returns the index of the first array element that passes a test... Browser Support. The Array.find () method is not supported in Internet Explorer. Syntax. Parameter Values. A function to be run for each element in ...', 'JavaScript Array findIndex() Method - W3SchoolsPrzetłumacz tę stronę\r\nhttps://www.w3schools.com/jsref/jsref_findindex.asp\r\nJavaScript Array.findIndex () Definition and Usage. The Array.findIndex () method returns the index of the first array element that passes a test... Browser Support. The Array.find () method is not supported in Internet Explorer. Syntax. Parameter Values. A function to be run for each element in ...', NULL, '[8]', '{\"saving\":\"NIE\",\"any_suggestion\":\"10pkt\",\"bhp\":\"0pkt\",\"other_savings\":\"0pkt\",\"independence\":\"0pkt\"}', NULL, '2021-07-29', NULL, 0, ''),
(36, 4, 'At vero eos et accusamus et iusto odio occaecati cupiditate non provident, similique sunt in culpa qui ', 'JavaScript Array findIndex() Method - W3SchoolsPrzetłumacz tę stronę\r\nhttps://www.w3schools.com/jsref/jsref_findindex.asp\r\nJavaScript Array.findIndex () Definition and Usage. The Array.findIndex () method returns the index of the first array element that passes a test... Browser Support. The Array.find () method is not supported in Internet Explorer. Syntax. Parameter Values. A function to be run for each element in ...', 'JavaScript Array findIndex() Method - W3SchoolsPrzetłumacz tę stronę\r\nhttps://www.w3schools.com/jsref/jsref_findindex.asp\r\nJavaScript Array.findIndex () Definition and Usage. The Array.findIndex () method returns the index of the first array element that passes a test... Browser Support. The Array.find () method is not supported in Internet Explorer. Syntax. Parameter Values. A function to be run for each element in ...', NULL, '[4]', '{\"saving\":\"NIE\",\"any_suggestion\":\"10pkt\",\"bhp\":\"0pkt\",\"other_savings\":\"0pkt\",\"independence\":\"0pkt\"}', NULL, '2021-07-29', NULL, 0, '21729/36'),
(37, 3, '', 'assdadasdasdasd', 'dassdasdad', NULL, '[4]', '{\"saving\":\"NIE\",\"any_suggestion\":\"10pkt\",\"bhp\":\"0pkt\",\"other_savings\":\"0pkt\",\"independence\":\"0pkt\"}', NULL, '2021-07-31', NULL, 3, '21731/37'),
(38, 3, 'Test do edycji', 't jesy estowy tekc bez znaczenia i korekcji', 't jesy estowy tekc bez znaczenia i korekcji', NULL, '[4]', '{\"saving\":\"NIE\",\"any_suggestion\":\"10pkt\",\"bhp\":\"0pkt\",\"other_savings\":\"0pkt\",\"independence\":\"0pkt\"}', NULL, '2021-07-31', NULL, 0, '21731/38'),
(39, 3, 'Lorem ipsum zmiany na backend', 'Wyeliminowanie powtórzeń w kodzie i uproszczenie obsługi po przez dodanie globalnej zmiennej do klasy abstrakcyjne. Wymusza to oszczędność w ciągłym tworzeniu zmiennej', 'Skomplikowana obsługa odpowiedzi po stronie Api', NULL, '[4]', '{\"saving\":\"NIE\",\"any_suggestion\":\"10pkt\",\"bhp\":\"0pkt\",\"other_savings\":\"10pkt\",\"independence\":\"0pkt\",\"sum_point\":20}', NULL, '2021-08-18', '2021-08-18', 2, '21818/39'),
(40, 3, 'Test metody post', 'Persze wypełnić to połę', 'Persze wypełnić to połę', NULL, '[4,8]', '{\"saving\":\"NIE\",\"any_suggestion\":\"10pkt\",\"bhp\":\"20pkt\",\"other_savings\":\"10pkt\",\"independence\":\"0pkt\",\"sum_point\":40}', NULL, '2021-09-10', NULL, 0, '21910/40');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `offer_option`
--

CREATE TABLE `offer_option` (
  `id_title` int(11) NOT NULL,
  `title` text COLLATE utf8_polish_ci NOT NULL,
  `name_option` text COLLATE utf8_polish_ci NOT NULL,
  `value_option` text COLLATE utf8_polish_ci NOT NULL,
  `header` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `offer_option`
--

INSERT INTO `offer_option` (`id_title`, `title`, `name_option`, `value_option`, `header`) VALUES
(1, 'Propozycja oszczędnościowa 5000 PLN w skali roku:', 'saving', 'NIE,TAK', 0),
(2, 'Każda propozycja usprawnieniowa zgłoszona i zaakceptowana: ', 'any_suggestion', '10pkt,20pkt', 0),
(3, 'Dodatkowo propozycje związane z:', '', '', 1),
(4, 'Polepszenie BHP:', 'bhp', '0pkt,10pkt,20pkt,30pkt', 0),
(5, 'Oszczędność czasu energii, materiałów itp:', 'other_savings', '0pkt,10pkt,20pkt', 0),
(6, 'Samodzielne wdrożenie:', 'independence', '0pkt,10pkt,20pkt,30pkt', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_idea`
--

CREATE TABLE `user_idea` (
  `id_user_idea` int(11) NOT NULL,
  `id_idea` int(11) NOT NULL,
  `id_account` int(11) NOT NULL,
  `id_area` int(11) DEFAULT NULL,
  `awarded_points` float DEFAULT NULL,
  `date_added` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `user_idea`
--

INSERT INTO `user_idea` (`id_user_idea`, `id_idea`, `id_account`, `id_area`, `awarded_points`, `date_added`) VALUES
(1, 1, 4, 1, NULL, '2021-06-02'),
(2, 2, 4, 3, 40, '2021-06-03'),
(3, 3, 4, 3, NULL, '2021-06-03'),
(4, 4, 4, 1, NULL, '2021-06-04'),
(5, 5, 4, 3, 15, '2021-06-04'),
(6, 5, 5, 3, 15, '2021-06-05'),
(10, 21, 4, 3, 0.75, '2021-06-06'),
(11, 21, 5, 3, 0.75, '2021-06-06'),
(12, 22, 4, 3, NULL, '2021-06-06'),
(13, 23, 8, 6, 22.25, '2021-06-15'),
(14, 23, 4, 6, 22.25, '2021-06-15'),
(15, 24, 5, 6, 30, '2021-06-16'),
(16, 25, 8, 6, 20.75, '2021-06-16'),
(17, 26, 8, 6, 2.75, '2021-06-16'),
(18, 27, 9, 6, 20.5, '2021-06-16'),
(20, 28, 8, 3, NULL, '2021-07-12'),
(21, 29, 8, 3, 20.74, '2021-07-13'),
(22, 30, 4, 6, 22, '2021-07-13'),
(23, 31, 8, 3, 24.7, '2021-07-13'),
(24, 32, 8, 3, NULL, '2021-07-13'),
(25, 34, 8, 3, NULL, '2021-07-13'),
(26, 36, 4, 4, NULL, '2021-07-29'),
(27, 37, 4, 3, NULL, '2021-07-31'),
(28, 38, 4, 3, NULL, '2021-07-31'),
(29, 39, 4, 3, 30, '2021-08-18'),
(30, 40, 4, 3, NULL, '2021-09-10'),
(31, 40, 8, 3, NULL, '2021-09-10'),
(36, 35, 8, 4, NULL, '2021-07-29'),
(37, 6, 4, 3, NULL, '2021-06-05');

-- --------------------------------------------------------

--
-- Zastąpiona struktura widoku `view_idea`
-- (Zobacz poniżej rzeczywisty widok)
--
CREATE TABLE `view_idea` (
`id_idea` int(11)
,`area_name` varchar(100)
,`topic` varchar(150)
,`after_value` text
,`before_value` text
,`awarded_points` double(19,2)
,`rating_user` text
,`saving` float
,`mod_comment` text
,`array_users` text
,`date_added` date
,`date_implementation` date
,`idea_status` tinyint(1)
,`token_idea` text
);

-- --------------------------------------------------------

--
-- Zastąpiona struktura widoku `view_points_test`
-- (Zobacz poniżej rzeczywisty widok)
--
CREATE TABLE `view_points_test` (
`awarded_points` double
,`full_name` varchar(150)
,`offers_implemented` bigint(21)
);

-- --------------------------------------------------------

--
-- Zastąpiona struktura widoku `view_points_user`
-- (Zobacz poniżej rzeczywisty widok)
--
CREATE TABLE `view_points_user` (
`full_name` varchar(150)
,`awarded_points` float
,`area_name` varchar(100)
,`id_account` int(11)
,`id_idea` int(11)
,`date_added` date
);

-- --------------------------------------------------------

--
-- Struktura widoku `view_idea`
--
DROP TABLE IF EXISTS `view_idea`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_idea`  AS SELECT `idea`.`id_idea` AS `id_idea`, `area`.`area_name` AS `area_name`, `idea`.`topic` AS `topic`, `idea`.`after_value` AS `after_value`, `idea`.`before_value` AS `before_value`, round(sum(`user_idea`.`awarded_points`),2) AS `awarded_points`, `idea`.`rating_user` AS `rating_user`, `idea`.`saving` AS `saving`, `idea`.`mod_comment` AS `mod_comment`, `idea`.`array_users` AS `array_users`, `idea`.`date_added` AS `date_added`, `idea`.`date_implementation` AS `date_implementation`, `idea`.`idea_status` AS `idea_status`, `idea`.`token_idea` AS `token_idea` FROM ((`idea` join `area` on(`area`.`id_area` = `idea`.`id_area`)) left join `user_idea` on(`idea`.`id_idea` = `user_idea`.`id_idea`)) GROUP BY `idea`.`id_idea` ;

-- --------------------------------------------------------

--
-- Struktura widoku `view_points_test`
--
DROP TABLE IF EXISTS `view_points_test`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_points_test`  AS SELECT sum(`view_points_user`.`awarded_points`) AS `awarded_points`, `view_points_user`.`full_name` AS `full_name`, count(0) AS `offers_implemented` FROM `view_points_user` GROUP BY `view_points_user`.`full_name` ;

-- --------------------------------------------------------

--
-- Struktura widoku `view_points_user`
--
DROP TABLE IF EXISTS `view_points_user`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_points_user`  AS SELECT `account`.`full_name` AS `full_name`, `user_idea`.`awarded_points` AS `awarded_points`, `view_idea`.`area_name` AS `area_name`, `account`.`id_account` AS `id_account`, `view_idea`.`id_idea` AS `id_idea`, `view_idea`.`date_added` AS `date_added` FROM ((`account` join `user_idea` on(`account`.`id_account` = `user_idea`.`id_account`)) join `view_idea` on(`view_idea`.`id_idea` = `user_idea`.`id_idea`)) WHERE `view_idea`.`idea_status` = 2 ;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id_account`),
  ADD KEY `id_area` (`id_area`);

--
-- Indeksy dla tabeli `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id_area`);

--
-- Indeksy dla tabeli `idea`
--
ALTER TABLE `idea`
  ADD PRIMARY KEY (`id_idea`),
  ADD KEY `id_area` (`id_area`);

--
-- Indeksy dla tabeli `offer_option`
--
ALTER TABLE `offer_option`
  ADD PRIMARY KEY (`id_title`);

--
-- Indeksy dla tabeli `user_idea`
--
ALTER TABLE `user_idea`
  ADD PRIMARY KEY (`id_user_idea`),
  ADD KEY `id_idea` (`id_idea`),
  ADD KEY `id_account` (`id_account`),
  ADD KEY `id_area` (`id_area`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `account`
--
ALTER TABLE `account`
  MODIFY `id_account` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT dla tabeli `area`
--
ALTER TABLE `area`
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT dla tabeli `idea`
--
ALTER TABLE `idea`
  MODIFY `id_idea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT dla tabeli `offer_option`
--
ALTER TABLE `offer_option`
  MODIFY `id_title` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT dla tabeli `user_idea`
--
ALTER TABLE `user_idea`
  MODIFY `id_user_idea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `FK_account_area` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`);

--
-- Ograniczenia dla tabeli `idea`
--
ALTER TABLE `idea`
  ADD CONSTRAINT `FK_idea_area` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`);

--
-- Ograniczenia dla tabeli `user_idea`
--
ALTER TABLE `user_idea`
  ADD CONSTRAINT `FK_user_idea_account` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`),
  ADD CONSTRAINT `FK_user_idea_area` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
