-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Czas generowania: 24 Mar 2021, 16:55
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
-- Baza danych: `idea`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `account`
--

CREATE TABLE `account` (
  `id_user` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  `user_name` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `user_number` int(10) DEFAULT NULL,
  `account_rang` int(1) NOT NULL DEFAULT 0,
  `account_passwd` varchar(255) CHARACTER SET utf8 NOT NULL,
  `account_enabled` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `account`
--

INSERT INTO `account` (`id_user`, `id_area`, `user_name`, `user_number`, `account_rang`, `account_passwd`, `account_enabled`) VALUES
(1, 1, 'Mariusz Kępski', 1234, 0, '', 1),
(2, 2, 'Jan Kowalski', 1235, 0, '', 1),
(3, 2, 'Mariusz Rower', 1111, 0, '', 1),
(4, 1, 'Jan Kępski', 22222, 0, '', 1),
(5, 4, 'Marek Winarek', 4444, 0, '', 1),
(6, 3, 'Jan Niezbędny', 1233, 0, '', 1),
(7, 3, 'Plastuś', 1236, 0, '', 1),
(8, 7, 'Michael Music', 1258, 0, '', 1),
(9, 6, 'Wartosćć Mariusz', 7861, 0, '', 1),
(10, 10, 'Kiepski Kawał', 1412, 0, '', 1),
(11, 9, 'Korniszony Słoiczkowe', 34433, 0, '', 1),
(12, 11, 'Kogut Zielony', 655, 0, '', 1),
(13, 11, 'Bociań Księżycowy', 65744, 0, '', 1),
(14, 1, 'Kurczę Pieczone', 9768, 0, '', 1),
(15, 5, 'Bronek Lonek', 6786, 0, '', 1),
(41, 1, 'Marski', NULL, 2, '$2y$10$VLzuo.OPa7jBCuJtKjna4eUT.R2vhP9DUxHydpmo/GusPtb84uDzu', 1),
(48, 1, 'Marski', NULL, 2, '$2y$10$XKW8ju3sh/O0lQhE8OPohOeCkzJQeerw25U/iKncXFRCuVplhfk7.', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `area`
--

CREATE TABLE `area` (
  `id_area` int(11) NOT NULL,
  `area_name` text COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `area`
--

INSERT INTO `area` (`id_area`, `area_name`) VALUES
(1, 'Roto'),
(2, 'Laminacja'),
(3, 'Cięcie'),
(4, 'Magazyn'),
(5, 'Polska'),
(6, 'Gdzieś'),
(7, 'Wschodni'),
(8, 'Zachodni'),
(9, 'Środkowy'),
(10, 'Morski'),
(11, 'Księżycowy');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `idea`
--

CREATE TABLE `idea` (
  `id_idea` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  `id_users` text COLLATE utf8_polish_ci NOT NULL,
  `before_value` text COLLATE utf8_polish_ci NOT NULL,
  `after_value` text COLLATE utf8_polish_ci NOT NULL,
  `mod_value` text COLLATE utf8_polish_ci DEFAULT NULL,
  `date_added` datetime NOT NULL,
  `date_implementation` date DEFAULT NULL,
  `pkt_idea` int(3) NOT NULL,
  `pkt_mod` int(3) DEFAULT NULL,
  `pkt_user` int(3) NOT NULL,
  `stat_coo` tinyint(4) DEFAULT NULL,
  `stat_mod` tinyint(4) DEFAULT NULL,
  `savings` tinyint(4) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `idea`
--

INSERT INTO `idea` (`id_idea`, `id_area`, `id_users`, `before_value`, `after_value`, `mod_value`, `date_added`, `date_implementation`, `pkt_idea`, `pkt_mod`, `pkt_user`, `stat_coo`, `stat_mod`, `savings`, `status`) VALUES
(1, 1, '4,6', 'Jest dostępnych wiele różnych wersji Lorem Ipsum, ale większość zmieniła się pod wpływem dodanego humoru czy przypadkowych słów, które nawet w najmniejszym stopniu nie przypominają istniejących. Jeśli masz zamiar użyć fragmentu Lorem Ipsum, lepiej mieć pewność, że nie ma niczego „dziwnego” w środku tekstu. Wszystkie Internetowe generatory Lorem Ipsum mają tendencje do kopiowania już istniejących bloków, co czyni nasz pierwszym prawdziwym generatorem w Internecie. Używamy zawierającego ponad 200 łacińskich słów słownika, w kontekście wielu znanych sentencji, by wygenerować tekst wyglądający odpowiednio. To wszystko czyni „nasz” Lorem Ipsum wolnym od powtórzeń, humorystycznych wstawek czy niecharakterystycznych słów.', 'Jest dostępnych wiele różnych wersji Lorem Ipsum, ale większość zmieniła się pod wpływem dodanego humoru czy przypadkowych słów, które nawet w najmniejszym stopniu nie przypominają istniejących. Jeśli masz zamiar użyć fragmentu Lorem Ipsum, lepiej mieć pewność, że nie ma niczego „dziwnego” w środku tekstu. Wszystkie Internetowe generatory Lorem Ipsum mają tendencje do kopiowania już istniejących bloków, co czyni nasz pierwszym prawdziwym generatorem w Internecie. Używamy zawierającego ponad 200 łacińskich słów słownika, w kontekście wielu znanych sentencji, by wygenerować tekst wyglądający odpowiednio. To wszystko czyni „nasz” Lorem Ipsum wolnym od powtórzeń, humorystycznych wstawek czy niecharakterystycznych słów.', NULL, '2020-09-16 00:00:00', NULL, 0, 20, 20, NULL, NULL, 0, 1),
(2, 1, '4,6', 'Jest dostępnych wiele różnych wersji Lorem Ipsum, ale większość zmieniła się pod wpływem dodanego humoru czy przypadkowych słów, które nawet w najmniejszym stopniu nie przypominają istniejących. Jeśli masz zamiar użyć fragmentu Lorem Ipsum, lepiej mieć pewność, że nie ma niczego „dziwnego” w środku tekstu. Wszystkie Internetowe generatory Lorem Ipsum mają tendencje do kopiowania już istniejących bloków, co czyni nasz pierwszym prawdziwym generatorem w Internecie. Używamy zawierającego ponad 200 łacińskich słów słownika, w kontekście wielu znanych sentencji, by wygenerować tekst wyglądający odpowiednio. To wszystko czyni „nasz” Lorem Ipsum wolnym od powtórzeń, humorystycznych wstawek czy niecharakterystycznych słów.', 'Jest dostępnych wiele różnych wersji Lorem Ipsum, ale większość zmieniła się pod wpływem dodanego humoru czy przypadkowych słów, które nawet w najmniejszym stopniu nie przypominają istniejących. Jeśli masz zamiar użyć fragmentu Lorem Ipsum, lepiej mieć pewność, że nie ma niczego „dziwnego” w środku tekstu. Wszystkie Internetowe generatory Lorem Ipsum mają tendencje do kopiowania już istniejących bloków, co czyni nasz pierwszym prawdziwym generatorem w Internecie. Używamy zawierającego ponad 200 łacińskich słów słownika, w kontekście wielu znanych sentencji, by wygenerować tekst wyglądający odpowiednio. To wszystko czyni „nasz” Lorem Ipsum wolnym od powtórzeń, humorystycznych wstawek czy niecharakterystycznych słów.', NULL, '2020-09-16 22:25:40', NULL, 0, NULL, 20, NULL, NULL, 0, 3),
(3, 1, '1', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. &lt;br> Lorem Ipsum has been &lt; &amp; the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived &lt; &quot;not&quot; only five centuries, &lt; but also the leap into electronic typesetting', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. &lt;br> Lorem Ipsum has been &lt; &amp; the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived &lt; &quot;not&quot; only five centuries, &lt; but also the leap into electronic typesetting', NULL, '2020-09-16 23:45:36', NULL, 0, NULL, 10, NULL, NULL, 0, 4),
(4, 2, '6,3', 'Sed rutrum orci lorem, et tincidunt erat suscipit et. Phasellus vel facilisis sem. Vestibulum convallis dolor et ligula faucibus, at scelerisque mi commodo. Mauris imperdiet suscipit risus. Nulla euismod quis libero sed posuere. Integer cursus ipsum neque, et auctor mi sollicitudin egestas. Sed enim nisi, dapibus non posuere ac, iaculis ut risus. Nulla pharetra turpis felis, nec dapibus diam sollicitudin non. Sed eget mi malesuada, consectetur mauris at, mattis dolor. Aenean ac dignissim ipsum. Donec vitae magna tortor. Duis congue condimentum elit vitae condimentum. ', 'Morbi eros libero, imperdiet quis nibh id, aliquet lacinia ex. Duis quis justo eu tellus fringilla venenatis id vitae elit. Ut porttitor nisi sed tincidunt dapibus. Proin in odio sit amet mauris aliquam volutpat quis eu augue. Quisque scelerisque, justo pellentesque elementum vulputate, lectus lectus pellentesque orci, at ultricies elit arcu facilisis tortor. Vestibulum tristique, est a auctor laoreet, neque lectus auctor risus, sit amet placerat est odio eu nisi. Sed ullamcorper ex ac scelerisque dictum. Donec venenatis dignissim massa eu condimentum. Phasellus at blandit massa. Praesent pharetra nisl feugiat velit dictum, nec malesuada ante semper. ', NULL, '2020-09-19 00:00:21', '2020-09-03', 0, 40, 40, NULL, NULL, 0, 2),
(5, 4, '5,9,3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL, '2020-09-19 13:18:25', NULL, 0, NULL, 50, NULL, NULL, 0, 0),
(6, 9, '11', 'asas', 'asas', NULL, '2020-09-19 13:36:03', NULL, 0, NULL, 10, NULL, NULL, 0, 0),
(7, 2, '3', 'asasasasa', 'asasasas', NULL, '2020-09-19 13:38:19', NULL, 0, NULL, 10, NULL, NULL, 0, 0),
(8, 6, '9,5', 'Statystyki\nNajwięcej wdrożonych w kwartale\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,\n', 'Statystyki\nNajwięcej wdrożonych w kwartale\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,\n', NULL, '2020-09-19 13:48:46', NULL, 0, NULL, 10, NULL, NULL, 0, 4),
(9, 2, '2,4,6', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Metus dictum at tempor commodo ullamcorper a lacus vestibulum sed. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Magna ac placerat vestibulum lectus. Sed risus pretium quam vulputate dignissim. Molestie nunc non blandit massa. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Aliquet lectus proin nibh nisl condimentum id venenatis a. Enim sed faucibus turpis in eu mi bibendum. Facilisis volutpat est velit egestas dui id ornare arcu. Facilisis mauris sit amet massa vitae tortor. Fringilla urna porttitor rhoncus dolor. Commodo sed egestas egestas fringilla phasellus. Libero nunc consequat interdum varius sit. Facilisis sed odio morbi quis commodo odio. Nunc sed velit dignissim sodales ut. Nunc sed velit dignissim sodales ut. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Felis bibendum ut tristique et egestas quis.', 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Metus dictum at tempor commodo ullamcorper a lacus vestibulum sed. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Magna ac placerat vestibulum lectus. Sed risus pretium quam vulputate dignissim. Molestie nunc non blandit massa. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Aliquet lectus proin nibh nisl condimentum id venenatis a. Enim sed faucibus turpis in eu mi bibendum. Facilisis volutpat est velit egestas dui id ornare arcu. Facilisis mauris sit amet massa vitae tortor. Fringilla urna porttitor rhoncus dolor. Commodo sed egestas egestas fringilla phasellus. Libero nunc consequat interdum varius sit. Facilisis sed odio morbi quis commodo odio. Nunc sed velit dignissim sodales ut. Nunc sed velit dignissim sodales ut. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Felis bibendum ut tristique et egestas quis.Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Metus dictum at tempor commodo ullamcorper a lacus vestibulum sed. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant. Magna ac placerat vestibulum lectus. Sed risus pretium quam vulputate dignissim. Molestie nunc non blandit massa. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Aliquet lectus proin nibh nisl condimentum id venenatis a. Enim sed faucibus turpis in eu mi bibendum. Facilisis volutpat est velit egestas dui id ornare arcu. Facilisis mauris sit amet massa vitae tortor. Fringilla urna porttitor rhoncus dolor. Commodo sed egestas egestas fringilla phasellus. Libero nunc consequat interdum varius sit. Facilisis sed odio morbi quis commodo odio. Nunc sed velit dignissim sodales ut. Nunc sed velit dignissim sodales ut. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Felis bibendum ut tristique et egestas quis.Pellentesque habitant morbi tristique senectus et netu', NULL, '2020-09-20 11:22:49', NULL, 0, NULL, 10, NULL, NULL, 0, 3),
(10, 1, '1,3,5', 'JSON.parse(el.dataset.select_user)[1]', 'Euismod in pellentesque massa placerat duis ultricies lacus. Enim nulla aliquet porttitor lacus luctus accumsan tortor. Volutpat maecenas volutpat blandit aliquam etiam. Egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam. Tortor consequat id porta nibh venenatis cras. Adipiscing bibendum est ultricies integer quis auctor. Venenatis tellus in metus vulputate eu scelerisque felis. At in tellus integer feugiat scelerisque varius morbi. Nisl condimentum id venenatis a condimentum. Egestas purus viverra accumsan in nisl nisi scelerisque eu. Vel orci porta non pulvinar neque laoreet suspendisse. Vitae tempus quam pellentesque nec nam aliquam sem et. Congue eu consequat ac', NULL, '2020-09-20 11:26:46', NULL, 0, NULL, 20, NULL, NULL, 0, 0),
(11, 4, '4,6,2', 'Loremp Ipsum is simply dummy text of the printing and typesetting industry. &lt;br> Lorem Ipsum has been &lt; &amp; the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived &lt; &quot;not&quot; only five centuries, &lt; but also the leap into electronic typesetting, ', 'Loremp Ipsum is simply dummy text of the printing and typesetting industry. &lt;br> Lorem Ipsum has been &lt; &amp; the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived &lt; &quot;not&quot; only five centuries, &lt; but also the leap into electronic typesetting, Loremp Ipsum is simply dummy text of the printing and typesetting industry. &lt;br> Lorem Ipsum has been &lt; &amp; the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived &lt; &quot;not&quot; only five centuries, &lt; but also the leap into electronic typesetting, ', NULL, '2020-09-21 18:12:19', NULL, 0, NULL, 10, NULL, NULL, 0, 0),
(12, 2, '2,4', 'Google wykorzystuje pliki cookie i inne dane do dostarczania, utrzymywania i ulepszania swoich usług oraz reklam. Jeśli się zgodzisz, będziemy personalizować wyświetlane treści i reklamy na podstawie Twojej aktywności w usługach Google, takich jak wyszukiwarka, Mapy i YouTube. Współpracujemy też z firmami, które mierzą, jak użytkownicy korzystają z naszych usług. Aby przejrzeć dostępne opcje, kliknij „Pokaż więcej” lub w dowolnej chwili wejdź na g.co/privacytools.', 'Google wykorzystuje pliki cookie i inne dane do dostarczania, utrzymywania i ulepszania swoich usług oraz reklam. Jeśli się zgodzisz, będziemy personalizować wyświetlane treści i reklamy na podstawie Twojej aktywności w usługach Google, takich jak wyszukiwarka, Mapy i YouTube. Współpracujemy też z firmami, które mierzą, jak użytkownicy korzystają z naszych usług. Aby przejrzeć dostępne opcje, kliknij „Pokaż więcej” lub w dowolnej chwili wejdź na g.co/privacytools.', NULL, '2020-09-24 20:15:03', NULL, 0, NULL, 10, NULL, NULL, 0, 0),
(13, 4, '2,4,6', '{jsSidebar(&quot;Classes&quot;)}}\n\nSłowo kluczowe static definiuje statyczną metodę lub klasę. Metody statyczne nie są wywoływane na instancjach klasy, a bezpośrednio na samej klasie. Są to często funkcje służące na przykład do tworzenia czy klonowania obiektów.', '{jsSidebar(&quot;Classes&quot;)}}\n\nSłowo kluczowe static definiuje statyczną metodę lub klasę. Metody statyczne nie są wywoływane na instancjach klasy, a bezpośrednio na samej klasie. Są to często funkcje służące na przykład do tworzenia czy klonowania obiektów.', NULL, '2020-09-25 18:25:29', NULL, 0, NULL, 10, NULL, NULL, 0, 0),
(14, 9, '2,4,6,5,9,3,1', '{jsSidebar(&quot;Classes&quot;)}}\n\nSłowo kluczowe static definiuje statyczną metodę lub klasę. Metody statyczne nie są wywoływane na instancjach klasy, a bezpośrednio na samej klasie. Są to często funkcje służące na przykład do tworzenia czy klonowania obiektów.', '{jsSidebar(&quot;Classes&quot;)}}\n\nSłowo kluczowe static definiuje statyczną metodę lub klasę. Metody statyczne nie są wywoływane na instancjach klasy, a bezpośrednio na samej klasie. Są to często funkcje służące na przykład do tworzenia czy klonowania obiektów.', NULL, '2020-09-25 18:26:21', NULL, 0, NULL, 30, NULL, NULL, 0, 0),
(15, 2, '2,4,6', 'aas', 'aas', NULL, '2020-09-25 19:04:30', NULL, 0, NULL, 10, NULL, NULL, 0, 0),
(16, 6, '6', 'wewewe', 'wewewe', NULL, '2020-09-25 19:05:33', NULL, 0, NULL, 10, NULL, NULL, 0, 0),
(17, 2, '2', 'uityuoyiykyuykyu', 'ykyukykykyk', NULL, '2020-09-25 19:07:48', NULL, 0, NULL, 10, NULL, NULL, 0, 0),
(18, 2, '6,4,2', 'asasasasasasas', 'asasasasasasas', NULL, '2020-09-25 19:09:03', NULL, 0, NULL, 10, NULL, NULL, 0, 0),
(19, 2, '6,4,2', 'If you want to find all HTML elements that match a specified CSS selector (id, class names, types, attributes, values of attributes, etc), use the querySelectorAll() method.\n\nThis example returns a list of all &lt;p> elements with class=&quot;intro&quot;.If you want to find all HTML elements that match a specified CSS selector (id, class names, types, attributes, values of attributes, etc), use the querySelectorAll() method.\n\nThis example returns a list of all &lt;p> elements with class=&quot;intro&quot;.If you want to find all HTML elements that match a specified CSS selector (id, class names, types, attributes, values of attributes, etc), use the querySelectorAll() method.\n\nThis example returns a list of all &lt;p> elements with class=&quot;intro&quot;.', 'If you want to find all HTML elements that match a specified CSS selector (id, class names, types, attributes, values of attributes, etc), use the querySelectorAll() method.\n\nThis example returns a list of all &lt;p> elements with class=&quot;intro&quot;.If you want to find all HTML elements that match a specified CSS selector (id, class names, types, attributes, values of attributes, etc), use the querySelectorAll() method.\n\nThis example returns a list of all &lt;p> elements with class=&quot;intro&quot;.If you want to find all HTML elements that match a specified CSS selector (id, class names, types, attributes, values of attributes, etc), use the querySelectorAll() method.\n\nThis example returns a list of all &lt;p> elements with class=&quot;intro&quot;.', NULL, '2020-09-25 19:10:42', NULL, 0, NULL, 10, NULL, NULL, 0, 0),
(20, 1, '6,4,2,12', 'If you want to find all HTML elements that match a specified CSS selector (id, class names, types, attributes, values of attributes, etc), use the querySelectorAll() method.\n\nThis example returns a list of all &lt;p> elements with class=&quot;intro&quot;.', 'If you want to find all HTML elements that match a specified CSS selector (id, class names, types, attributes, values of attributes, etc), use the querySelectorAll() method.\n\nThis example returns a list of all &lt;p> elements with class=&quot;intro&quot;.', NULL, '2020-09-25 19:11:11', NULL, 0, NULL, 30, NULL, NULL, 0, 0),
(21, 4, '2,4', 'Przypadkowo wcisnąłeś caps locka i wpisałeś jakiś tekst, a teraz szkoda przepisywać to wszystko od nowa', 'Przypadkowo wcisnąłeś caps locka i wpisałeś jakiś tekst, a teraz szkoda przepisywać to wszystko od nowa', NULL, '2020-09-25 19:13:20', NULL, 0, NULL, 30, NULL, NULL, 0, 0),
(22, 2, '2,4,6', 'Przypadkowo wcisnąłeś caps locka i wpisałeś jakiś tekst, a teraz szkoda przepisywać to wszystko od nowa', 'Przypadkowo wcisnąłeś caps locka i wpisałeś jakiś tekst, a teraz szkoda przepisywać to wszystko od nowa', NULL, '2020-09-25 19:13:38', NULL, 0, NULL, 20, NULL, NULL, 0, 0),
(23, 1, '1', '&quot;But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?&quot;', '&quot;But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?&quot;', NULL, '2020-10-11 22:47:55', NULL, 0, NULL, 40, NULL, NULL, 1, 0),
(24, 1, '3,1', '&quot;On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.&quot;', '&quot;On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.&quot;', NULL, '2020-10-11 22:51:27', NULL, 0, NULL, 50, NULL, NULL, 0, 0),
(25, 9, '9', '&quot;On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.&quot;', '&quot;On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.&quot;', NULL, '2020-10-11 22:53:23', NULL, 0, NULL, 20, NULL, NULL, 0, 0),
(26, 3, '3', 'aADSDSADSAD', 'asdasdasdasdasd', NULL, '2020-10-11 22:55:43', NULL, 0, NULL, 30, NULL, NULL, 0, 0),
(27, 5, '5', 'sadasdasd', 'asdsadasd', NULL, '2020-10-11 22:56:12', NULL, 0, NULL, 10, NULL, NULL, 0, 0),
(28, 5, '1,3,5,9', 'asdsadadadadadaegdjyf', 'fsfesrhsgsrg', NULL, '2020-10-11 22:57:56', NULL, 0, NULL, 30, NULL, NULL, 0, 0),
(29, 2, '2,4', '12121212121', '1212121212121', NULL, '2020-10-14 19:32:16', NULL, 0, NULL, 10, NULL, NULL, 0, 0),
(30, 2, '4,2,6', '6666666666666666666666666666', '6666666666666666666666666666666666', NULL, '2020-10-14 20:04:19', NULL, 0, NULL, 10, NULL, NULL, 0, 0),
(31, 2, '2,4,6', '222222222222222222222222222', '222222222222222222222222222222', NULL, '2020-10-14 20:05:38', NULL, 0, NULL, 10, NULL, NULL, 0, 0),
(32, 2, '2,4,6', 'dddddddddd', 'dddddddddd', NULL, '2020-10-14 20:12:41', NULL, 0, NULL, 50, NULL, NULL, 1, 0),
(33, 2, '2,4,6', '121212', '12112', NULL, '2020-10-14 20:15:18', NULL, 0, NULL, 40, NULL, NULL, 1, 0),
(34, 1, '1,5,9', '1212121313123', '12321412313', NULL, '2020-10-14 20:17:19', NULL, 0, NULL, 90, NULL, NULL, 1, 0),
(35, 2, '4,2', 'aaaaaaaaaaa', 'ddddddddddddddddddd', NULL, '2020-10-14 20:18:22', NULL, 0, NULL, 100, NULL, NULL, 1, 0),
(36, 3, '3,5,9', 'asasas', 'ssss', NULL, '2020-10-14 20:18:52', NULL, 0, NULL, 40, NULL, NULL, 1, 0),
(37, 5, '5,9', 'asas', 'asas', NULL, '2020-10-14 20:19:18', NULL, 0, NULL, 30, NULL, NULL, 0, 0),
(38, 2, '6,4,2', 'sdgdfdzvaesr', 'sdfsbad', NULL, '2020-10-14 20:31:55', NULL, 0, NULL, 20, NULL, NULL, 0, 0),
(39, 2, '2,4', 'qwqw', 'qwqwq', NULL, '2020-10-14 20:35:51', NULL, 0, NULL, 10, NULL, NULL, 1, 0),
(40, 1, '1', 'Jaki test dlaczego ja tego tekstu nie wpisuje przy użyciu dziesięciorga placów, Koniecznie nawyk trzeba zaprogramować w głowie. Trudno jednak przy tak krótkich tekstach jak w programowaniu pisać taką metodą. Jednak należy ćwiczyć i tak robić to', 'Pisać dziesięcioma palcami w każdym przypadku. Przed chwilą zamknąłem okno edytora JavaScrpit, z powodu pomieszania klawiszy. Liczy się droga do celu a nie sam cel. Te zdanie nabiera dla mnie nowego znaczenia.', NULL, '2020-10-14 20:42:38', NULL, 0, NULL, 100, NULL, NULL, 1, 0),
(41, 2, '2,4', 'Proszę wpisać w te pole wartość stanu obecnego. ', 'Test foreth zamiast map na tablicy, uzasadnieniem tego jest fakt mnij operacji na obekicie', NULL, '2020-10-15 20:00:40', NULL, 0, NULL, 50, NULL, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `moderator`
--

CREATE TABLE `moderator` (
  `id_mod` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_area` int(11) NOT NULL,
  `log` varchar(11) COLLATE utf8_polish_ci NOT NULL,
  `pass` varchar(11) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `rating_setting`
--

CREATE TABLE `rating_setting` (
  `id_title` int(11) NOT NULL,
  `title` text COLLATE utf8_polish_ci NOT NULL,
  `name_option` text COLLATE utf8_polish_ci NOT NULL,
  `value_option` text COLLATE utf8_polish_ci NOT NULL,
  `header` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `rating_setting`
--

INSERT INTO `rating_setting` (`id_title`, `title`, `name_option`, `value_option`, `header`) VALUES
(1, 'Propozycja oszczędnościowa 5000 PLN w skali roku:', 'savings', 'NIE,TAK', 0),
(2, 'Każda propozycja usprawnieniowa zgłoszona i zaakceptowana: ', 'any_suggestion', '10pkt,20pkt', 0),
(3, 'Dodatkowo propozycje związane z:', '', '', 1),
(4, 'Polepszenie BHP:', 'bhp', '0pkt,10pkt,20pkt,30pkt', 0),
(5, 'Oszczędność czasu energii, materiałów itp:', 'other_savings', '0pkt,10pkt,20pkt', 0),
(6, 'Samodzielne wdrożenie:', 'independence', '0pkt,10pkt,20pkt,30pkt', 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `FK_user_area` (`id_area`) USING BTREE;

--
-- Indeksy dla tabeli `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id_area`);

--
-- Indeksy dla tabeli `idea`
--
ALTER TABLE `idea`
  ADD PRIMARY KEY (`id_idea`);

--
-- Indeksy dla tabeli `moderator`
--
ALTER TABLE `moderator`
  ADD PRIMARY KEY (`id_mod`);

--
-- Indeksy dla tabeli `rating_setting`
--
ALTER TABLE `rating_setting`
  ADD PRIMARY KEY (`id_title`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `account`
--
ALTER TABLE `account`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT dla tabeli `area`
--
ALTER TABLE `area`
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT dla tabeli `idea`
--
ALTER TABLE `idea`
  MODIFY `id_idea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT dla tabeli `moderator`
--
ALTER TABLE `moderator`
  MODIFY `id_mod` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `rating_setting`
--
ALTER TABLE `rating_setting`
  MODIFY `id_title` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `FK_user_area` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
