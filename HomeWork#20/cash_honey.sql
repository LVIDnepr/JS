-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 29 2018 г., 10:03
-- Версия сервера: 5.6.38
-- Версия PHP: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `cash_honey`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Cleints`
--

CREATE TABLE `Cleints` (
  `id_cleint` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Order`
--

CREATE TABLE `Order` (
  `id_order` int(11) UNSIGNED NOT NULL,
  `id_product` int(11) UNSIGNED NOT NULL,
  `id_client` int(11) UNSIGNED NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Owners`
--

CREATE TABLE `Owners` (
  `id_owners` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Producers`
--

CREATE TABLE `Producers` (
  `id_producer` int(11) UNSIGNED NOT NULL,
  `title_company` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `id_owner` int(11) UNSIGNED NOT NULL,
  `phone` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Products`
--

CREATE TABLE `Products` (
  `id_product` int(11) UNSIGNED NOT NULL,
  `title_product` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `id_producer` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Cleints`
--
ALTER TABLE `Cleints`
  ADD PRIMARY KEY (`id_cleint`);

--
-- Индексы таблицы `Order`
--
ALTER TABLE `Order`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `Order/Products_idx` (`id_product`),
  ADD KEY `Order/Clients_idx` (`id_client`);

--
-- Индексы таблицы `Owners`
--
ALTER TABLE `Owners`
  ADD PRIMARY KEY (`id_owners`);

--
-- Индексы таблицы `Producers`
--
ALTER TABLE `Producers`
  ADD PRIMARY KEY (`id_producer`),
  ADD KEY `Producers/Owners_idx` (`id_owner`);

--
-- Индексы таблицы `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `Products/Producers_idx` (`id_producer`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Cleints`
--
ALTER TABLE `Cleints`
  MODIFY `id_cleint` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Owners`
--
ALTER TABLE `Owners`
  MODIFY `id_owners` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Producers`
--
ALTER TABLE `Producers`
  MODIFY `id_producer` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Products`
--
ALTER TABLE `Products`
  MODIFY `id_product` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Order`
--
ALTER TABLE `Order`
  ADD CONSTRAINT `Order/Clients` FOREIGN KEY (`id_client`) REFERENCES `Cleints` (`id_cleint`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `Order/Products` FOREIGN KEY (`id_product`) REFERENCES `Products` (`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `Producers`
--
ALTER TABLE `Producers`
  ADD CONSTRAINT `Producers/Owners` FOREIGN KEY (`id_owner`) REFERENCES `Owners` (`id_owners`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `Products/Producers` FOREIGN KEY (`id_producer`) REFERENCES `Producers` (`id_producer`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
