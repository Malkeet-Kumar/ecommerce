-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 30, 2024 at 09:59 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecom`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `add_id` varchar(250) NOT NULL,
  `u_id` varchar(250) DEFAULT NULL,
  `fullname` varchar(250) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `addressline1` varchar(250) DEFAULT NULL,
  `addressline2` varchar(250) DEFAULT NULL,
  `pincode` varchar(20) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `landmark` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`add_id`, `u_id`, `fullname`, `mobile`, `country`, `addressline1`, `addressline2`, `pincode`, `city`, `state`, `landmark`) VALUES
('0f8e0690-2af1-4e23-b17c-a8f31afdde94', 'ad6443ab-aa58-45e3-b896-6009d4c484aa', 'sumit', '1892739817237', 'india', 'alksdalj', 'aklsdjlaksdjl', '136119', 'kkrkajsd', 'haryana', 'asd'),
('1b83a25d-b0d6-45d9-b58a-1222c9f82d21', '8a6f5f3a-e1ef-49f6-b820-78abf600318e', 'Aniket', '9813940038', 'India', ' Village Sangohi, Post Office Sangoha', 'near Sardar ki chakki', '132001', 'Karnal', 'Haryana', ''),
('5fe685f7-85b5-46c4-bf21-d991fa063838', '8a6f5f3a-e1ef-49f6-b820-78abf600318e', 'Payal', '1234567890', 'India', 'xyz', 'abc', '123456', 'Palampur', 'HP', ''),
('d2355a6f-ca44-4670-ac9e-ddb93b05dc43', 'ad6443ab-aa58-45e3-b896-6009d4c484aa', 'malkeet kumar', '99813940038', 'india', 'vpo sangoha', 'near gurudwara', '132001', 'karnal', 'haryana', 'optional'),
('f9950b7e-2d90-4af8-a0a6-3304e910fb51', '8a6f5f3a-e1ef-49f6-b820-78abf600318e', 'Malkeet Kumar', '8397087924', 'India', 'VPO Sangoha', 'Aare wali gali', '132001', 'Karnal', 'Haryana', '');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`) VALUES
(1, 'Admin1', 'admin@gmail.com', 'password');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `u_id` varchar(250) DEFAULT NULL,
  `p_id` varchar(250) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `addingTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`u_id`, `p_id`, `quantity`, `addingTime`) VALUES
('ad6443ab-aa58-45e3-b896-6009d4c484aa', '09300bd8-5e24-4034-a34a-fb19c7ef29c4', 5, '2024-01-02 18:38:36'),
('8a6f5f3a-e1ef-49f6-b820-78abf600318e', '09300bd8-5e24-4034-a34a-fb19c7ef29c4', 5, '2024-01-23 10:35:28');

-- --------------------------------------------------------

--
-- Table structure for table `deliverypersons`
--

CREATE TABLE `deliverypersons` (
  `delp_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(25) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `center` varchar(255) DEFAULT NULL,
  `center_number` int(11) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `deliverypersons`
--

INSERT INTO `deliverypersons` (`delp_id`, `name`, `mobile`, `email`, `password`, `center`, `center_number`, `pincode`, `city`) VALUES
(1, 'deliveryPerson00', '1234567890', 'del00@abc.com', '123456789', NULL, 1, '133001', 'Ambala'),
(3, 'deliveryPerson02', '1234567890', 'del02@abc.com', 'Pass@12345', NULL, 1, '133001', 'Ambala'),
(4, 'deliveryPerson10', '1234567890', 'del10@abc.com', 'Pass@12345', NULL, 2, '127021', 'Bhiwani'),
(5, 'deliveryPerson11', '1234567890', 'del11@abc.com', 'Pass@12345', NULL, 2, '127021', 'Bhiwani'),
(6, 'deliveryPerson12', '1234567890', 'del12@abc.com', 'Pass@12345', NULL, 2, '127021', 'Bhiwani'),
(7, 'deliveryPerson20', '1234567890', 'del20@abc.com', 'Pass@12345', NULL, 3, '121002', 'Faridabad'),
(8, 'deliveryPerson21', '1234567890', 'del21@abc.com', 'Pass@12345', NULL, 3, '121002', 'Faridabad'),
(9, 'deliveryPerson22', '1234567890', 'del22@abc.com', 'Pass@12345', NULL, 3, '121002', 'Faridabad'),
(10, 'deliveryPerson30', '1234567890', 'del30@abc.com', 'Pass@12345', NULL, 4, '122001', 'Gurugram'),
(11, 'deliveryPerson31', '1234567890', 'del31@abc.com', 'Pass@12345', NULL, 4, '122001', 'Gurugram'),
(12, 'deliveryPerson32', '1234567890', 'del32@abc.com', 'Pass@12345', NULL, 4, '122001', 'Gurugram'),
(13, 'deliveryPerson40', '1234567890', 'del40@abc.com', 'Pass@12345', NULL, 5, '125001', 'Hissar'),
(14, 'deliveryPerson41', '1234567890', 'del41@abc.com', 'Pass@12345', NULL, 5, '125001', 'Hissar'),
(15, 'deliveryPerson42', '1234567890', 'del42@abc.com', 'Pass@12345', NULL, 5, '125001', 'Hissar'),
(16, 'deliveryPerson50', '1234567890', 'del50@abc.com', 'Pass@12345', NULL, 6, '126102', 'Jind'),
(17, 'deliveryPerson51', '1234567890', 'del51@abc.com', 'Pass@12345', NULL, 6, '126102', 'Jind'),
(18, 'deliveryPerson52', '1234567890', 'del52@abc.com', 'Pass@12345', NULL, 6, '126102', 'Jind'),
(19, 'deliveryPerson60', '1234567890', 'del60@abc.com', 'Pass@12345', NULL, 7, '132001', 'Karnal'),
(20, 'deliveryPerson61', '1234567890', 'del61@abc.com', 'Pass@12345', NULL, 7, '132001', 'Karnal'),
(21, 'deliveryPerson62', '1234567890', 'del62@abc.com', 'Pass@12345', NULL, 7, '132001', 'Karnal'),
(22, 'deliveryPerson70', '1234567890', 'del70@abc.com', 'Pass@12345', NULL, 8, '136027', 'Kaithal'),
(23, 'deliveryPerson71', '1234567890', 'del71@abc.com', 'Pass@12345', NULL, 8, '136027', 'Kaithal'),
(24, 'deliveryPerson72', '1234567890', 'del72@abc.com', 'Pass@12345', NULL, 8, '136027', 'Kaithal'),
(25, 'deliveryPerson80', '1234567890', 'del80@abc.com', 'Pass@12345', NULL, 9, '136118', 'Kurukshetra'),
(26, 'deliveryPerson81', '1234567890', 'del81@abc.com', 'Pass@12345', NULL, 9, '136118', 'Kurukshetra'),
(27, 'deliveryPerson82', '1234567890', 'del82@abc.com', 'Pass@12345', NULL, 9, '136118', 'Kurukshetra'),
(28, 'deliveryPerson90', '1234567890', 'del90@abc.com', 'Pass@12345', NULL, 10, '134112', 'Panchkula'),
(29, 'deliveryPerson91', '1234567890', 'del91@abc.com', 'Pass@12345', NULL, 10, '134112', 'Panchkula'),
(30, 'deliveryPerson92', '1234567890', 'del92@abc.com', 'Pass@12345', NULL, 10, '134112', 'Panchkula'),
(31, 'deliveryPerson100', '1234567890', 'del100@abc.com', 'Pass@12345', NULL, 11, '132103', 'Panipat'),
(32, 'deliveryPerson101', '1234567890', 'del101@abc.com', 'Pass@12345', NULL, 11, '132103', 'Panipat'),
(33, 'deliveryPerson102', '1234567890', 'del102@abc.com', 'Pass@12345', NULL, 11, '132103', 'Panipat'),
(34, 'deliveryPerson110', '1234567890', 'del110@abc.com', 'Pass@12345', NULL, 12, '123401', 'Rewari'),
(35, 'deliveryPerson111', '1234567890', 'del111@abc.com', 'Pass@12345', NULL, 12, '123401', 'Rewari'),
(36, 'deliveryPerson112', '1234567890', 'del112@abc.com', 'Pass@12345', NULL, 12, '123401', 'Rewari'),
(37, 'deliveryPerson120', '1234567890', 'del120@abc.com', 'Pass@12345', NULL, 13, '124001', 'Rohtak'),
(38, 'deliveryPerson121', '1234567890', 'del121@abc.com', 'Pass@12345', NULL, 13, '124001', 'Rohtak'),
(39, 'deliveryPerson122', '1234567890', 'del122@abc.com', 'Pass@12345', NULL, 13, '124001', 'Rohtak'),
(40, 'deliveryPerson130', '1234567890', 'del130@abc.com', 'Pass@12345', NULL, 14, '125055', 'Sirsa'),
(41, 'deliveryPerson131', '1234567890', 'del131@abc.com', 'Pass@12345', NULL, 14, '125055', 'Sirsa'),
(42, 'deliveryPerson132', '1234567890', 'del132@abc.com', 'Pass@12345', NULL, 14, '125055', 'Sirsa'),
(43, 'deliveryPerson140', '1234567890', 'del140@abc.com', 'Pass@12345', NULL, 15, '131001', 'Sonipat'),
(44, 'deliveryPerson141', '1234567890', 'del141@abc.com', 'Pass@12345', NULL, 15, '131001', 'Sonipat'),
(45, 'deliveryPerson142', '1234567890', 'del142@abc.com', 'Pass@12345', NULL, 15, '131001', 'Sonipat'),
(46, 'deliveryPerson150', '1234567890', 'del150@abc.com', 'Pass@12345', NULL, 16, '135001', 'Yamunanagar'),
(47, 'deliveryPerson151', '1234567890', 'del151@abc.com', 'Pass@12345', NULL, 16, '135001', 'Yamunanagar'),
(48, 'deliveryPerson152', '1234567890', 'del152@abc.com', 'Pass@12345', NULL, 16, '135001', 'Yamunanagar'),
(0, 'deliveryPerson01', '1234567890', 'del01@abc.com', '1234567890', '1', NULL, '133001', 'Ambala');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `o_id` varchar(250) NOT NULL,
  `u_id` varchar(250) DEFAULT NULL,
  `p_id` varchar(250) DEFAULT NULL,
  `sid` varchar(250) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `payment_method` varchar(250) DEFAULT NULL,
  `payment_status` tinyint(4) DEFAULT NULL,
  `placedDate` datetime NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `billAmount` int(11) DEFAULT NULL,
  `statusCode` int(11) DEFAULT NULL,
  `delivery_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`o_id`, `u_id`, `p_id`, `sid`, `quantity`, `payment_method`, `payment_status`, `placedDate`, `address`, `billAmount`, `statusCode`, `delivery_date`) VALUES
('20b7e8db-9098-40e4-bb19-22ef1a592564', 'ad6443ab-aa58-45e3-b896-6009d4c484aa', '0cd9d299-acf3-456b-bc50-ce87803fb03c', '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 'COD', 0, '2023-12-20 04:12:31', 'd2355a6f-ca44-4670-ac9e-ddb93b05dc43', 57, 5, '2023-12-29 18:55:29'),
('22239882-9e8c-4156-9e19-322defaef00a', '8a6f5f3a-e1ef-49f6-b820-78abf600318e', '058504b0-65e3-4adb-83a8-2d6085cf7eb5', '21760c36-d568-484d-8dc0-4c88b3002c66', 5, 'COD', 1, '2023-12-08 04:55:56', 'f9950b7e-2d90-4af8-a0a6-3304e910fb51', 145, 4, '2023-12-29 16:25:05'),
('321313a8-21e0-4e99-9d52-48967bdf2f9a', 'ad6443ab-aa58-45e3-b896-6009d4c484aa', '103400a6-67e1-420b-aa84-e49e5777cb3c', '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 'COD', 0, '2023-12-30 05:41:57', 'd2355a6f-ca44-4670-ac9e-ddb93b05dc43', 120, 5, '2023-12-30 05:45:46'),
('38be1a86-6b96-4ce5-941a-f60c2810166f', '8a6f5f3a-e1ef-49f6-b820-78abf600318e', '09300bd8-5e24-4034-a34a-fb19c7ef29c4', '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 'undefined', 0, '2024-01-20 06:50:13', '5fe685f7-85b5-46c4-bf21-d991fa063838', 46, 0, '0000-00-00 00:00:00'),
('49d466aa-c76c-49be-b092-0f459d70879a', 'ad6443ab-aa58-45e3-b896-6009d4c484aa', '09300bd8-5e24-4034-a34a-fb19c7ef29c4', '21760c36-d568-484d-8dc0-4c88b3002c66', 5, 'COD', 0, '2023-12-31 15:17:34', 'd2355a6f-ca44-4670-ac9e-ddb93b05dc43', 230, 2, '0000-00-00 00:00:00'),
('61bc6ed9-6dee-4cc5-9c51-0b3df9944033', 'ad6443ab-aa58-45e3-b896-6009d4c484aa', '09300bd8-5e24-4034-a34a-fb19c7ef29c4', '21760c36-d568-484d-8dc0-4c88b3002c66', 4, 'COD', 0, '2023-12-28 10:19:31', '0f8e0690-2af1-4e23-b17c-a8f31afdde94', 184, 5, '2023-12-30 04:34:28'),
('755c2bf8-0d46-4331-a6e8-1972ed74f2a9', 'ad6443ab-aa58-45e3-b896-6009d4c484aa', '09300bd8-5e24-4034-a34a-fb19c7ef29c4', '21760c36-d568-484d-8dc0-4c88b3002c66', 3, 'COD', 0, '2023-12-20 04:12:31', 'd2355a6f-ca44-4670-ac9e-ddb93b05dc43', 138, 5, '2023-12-29 19:02:05'),
('89734aaa-f71a-40e4-b7ad-0125cc7c605c', '8a6f5f3a-e1ef-49f6-b820-78abf600318e', '102220c3-5971-43f3-bcf4-57790fd2d6a6', '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 'COD', 0, '2024-01-10 12:42:40', '1b83a25d-b0d6-45d9-b58a-1222c9f82d21', 40, 3, '0000-00-00 00:00:00'),
('c6dd8b81-fc9c-45ad-80f6-3ca1f268bdac', 'ad6443ab-aa58-45e3-b896-6009d4c484aa', '102220c3-5971-43f3-bcf4-57790fd2d6a6', '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 'COD', 0, '2023-12-30 05:41:57', 'd2355a6f-ca44-4670-ac9e-ddb93b05dc43', 40, 5, '2023-12-30 05:47:52'),
('e997de89-0bfc-4dfe-9f59-62cb41428507', 'ad6443ab-aa58-45e3-b896-6009d4c484aa', '058504b0-65e3-4adb-83a8-2d6085cf7eb5', '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 'COD', 1, '2023-12-28 10:18:48', 'd2355a6f-ca44-4670-ac9e-ddb93b05dc43', 29, 4, '2024-01-01 06:57:47');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `p_id` varchar(250) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `category` varchar(250) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `sellerId` varchar(250) DEFAULT NULL,
  `isActive` tinyint(4) DEFAULT NULL,
  `isApproved` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`p_id`, `name`, `price`, `image`, `description`, `category`, `stock`, `sellerId`, `isActive`, `isApproved`) VALUES
('01a05202-517c-444e-a2e8-62aefa46cfe3', 'OPPOF19', 123, 'pimage-1704266441639-855821721', 'OPPO F19 is officially announced on April 2021.', 'Electronics', 123, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, NULL),
('034767ad-8527-4245-aa26-d1d014e71dd3', 'HP Pavilion 15-DK1056WM', 89, 'pimage-1704266446928-554880476', 'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5 8GB 256GB SSD GTX 1650 4GB Windows 10', 'Electronics', 89, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, NULL),
('041293cf-2864-439c-8521-8a35bc8a65b0', 'Leather Strap Skeleton Watch', 46, 'pimage-1702631580258-998168922', 'Leather Strap Skeleton Watch for Men - Stylish and Latest Design', 'mens-watches', 98, '21760c36-d568-484d-8dc0-4c88b3002c66', 0, 1),
('058504b0-65e3-4adb-83a8-2d6085cf7eb5', 'TC Reusable Silicone Magic Washing Gloves', 29, 'https://i.dummyjson.com/data/products/88/1.jpg', 'TC Reusable Silicone Magic Washing Gloves with Scrubber, Cleaning Brush Scrubber Gloves Heat Resistant Pair for Cleaning of Kitchen, Dishes, Vegetables and Fruits, Bathroom, Car Wash, Pet Care and Multipurpose', 'automotive', 13, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('09300bd8-5e24-4034-a34a-fb19c7ef29c4', 'Women Shoulder Bags', 46, 'https://i.dummyjson.com/data/products/71/1.jpg', 'LouisWill Women Shoulder Bags Long Clutches Cross Body Bags Phone Bags PU Leather Hand Bags Large Capacity Card Holders Zipper Coin Purses Fashion Crossbody Bags for Girls Ladies', 'womens-bags', 90, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('0cd9d299-acf3-456b-bc50-ce87803fb03c', 'Leather Hand Bag Gucci', 57, 'https://i.dummyjson.com/data/products/74/1.jpg', 'It features an attractive design that makes it a must have accessory in your collection. We sell different kind of bags for boys, kids, women, girls and also for unisex.', 'womens-bags', 43, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('0d4045e6-1841-4d36-a508-bca865fa5101', 'Sneakers Joggers Shoes', 40, 'https://i.dummyjson.com/data/products/56/1.jpg', 'Gender: Men , Colors: Same as DisplayedCondition: 100% Brand New', 'mens-shoes', 6, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('102220c3-5971-43f3-bcf4-57790fd2d6a6', 'Brown Perfume', 40, 'https://i.dummyjson.com/data/products/12/1.jpg', 'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml', 'fragrances', 52, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('103400a6-67e1-420b-aa84-e49e5777cb3c', 'Non-Alcoholic Concentrated Perfume Oil', 120, 'https://i.dummyjson.com/data/products/14/1.jpg', 'Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil', 'fragrances', 114, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('103d57ea-b682-49a8-9fa6-b300c46b60d1', 'Flying Wooden Bird', 17, 'pimage-1704220785418-590806533', 'Package nclude 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF Laminated 3.5mm', 'Electronics', 17, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, NULL),
('16228bee-bcc0-46ef-bb1e-8e1073aa8533', 'Infinix INBOOK', 1099, 'https://i.dummyjson.com/data/products/9/1.jpg', 'Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty', 'laptops', 96, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('1e16a94a-b057-4ba8-8e8e-8466c335a43e', 'Elegant Female Pearl Earrings', 30, 'https://i.dummyjson.com/data/products/79/1.jpg', 'Elegant Female Pearl Earrings Set Zircon Pearl Earings Women Party Accessories 9 Pairs/Set', 'womens-jewellery', 16, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('21dab2c9-2ef9-4ab8-8f04-c2752397a672', 'ank Tops for Womens/Girls', 50, 'https://i.dummyjson.com/data/products/37/1.jpg', 'PACK OF 3 CAMISOLES ,VERY COMFORTABLE SOFT COTTON STUFF, COMFORTABLE IN ALL FOUR SEASONS', 'tops', 107, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('228ed490-25b2-4120-ac8f-61c2c89972bb', 'Kabir Singh Square Sunglass', 50, 'https://i.dummyjson.com/data/products/82/1.jpg', 'Orignal Metal Kabir Singh design 2020 Sunglasses Men Brand Designer Sun Glasses Kabir Singh Square Sunglass', 'sunglasses', 78, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('23362750-9a58-491c-a31c-f9a6a97fc593', 'sublimation plain kids tank', 100, 'https://i.dummyjson.com/data/products/38/1.png', 'sublimation plain kids tank tops wholesale', 'tops', 20, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('258af1b9-5e78-44d4-8e78-ec1a12c3a66f', 'Sofa for Coffe Cafe', 50, 'https://i.dummyjson.com/data/products/32/1.jpg', 'Ratttan Outdoor furniture Set Waterproof  Rattan Sofa for Coffe Cafe', 'furniture', 30, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('27ea6696-63b7-4d11-8560-bda8b015500b', 'Oil Free Moisturizer 100ml', 40, 'https://i.dummyjson.com/data/products/18/1.jpg', 'Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.', 'skincare', 88, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('2c029150-85de-45c0-8fe2-dfa3678953d5', 'Waterproof Leather Brand Watch', 46, 'https://i.dummyjson.com/data/products/62/1.jpg', 'Watch Crown With Environmental IPS Bronze Electroplating; Display system of 12 hours', 'mens-watches', 95, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('30c4c525-76fe-4def-8830-3da223f228a4', 'Hyaluronic Acid Serum', 19, 'https://i.dummyjson.com/data/products/16/1.png', 'L\'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid', 'skincare', 110, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('340e78c6-ea37-450e-bf4b-9b603965eca3', 'Samsung Universe 9', 1249, 'https://i.dummyjson.com/data/products/3/1.jpg', 'Samsung\'s new variant which goes beyond Galaxy to the Universe', 'smartphones', 36, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('35da5ea6-7be0-4e3c-8807-e0d3381ba17d', 't Temperature Controller Incubator Controller', 40, 'https://i.dummyjson.com/data/products/87/1.jpg', 'Both Heat and Cool Purpose, Temperature control range; -50 to +110, Temperature measurement accuracy; 0.1, Control accuracy; 0.1', 'automotive', 37, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('37df2fc6-51d0-4c7b-a5ad-c73dc56f8fd9', 'Elbow Macaroni - 400 gm', 14, 'https://i.dummyjson.com/data/products/22/1.jpg', 'Product details of Bake Parlor Big Elbow Macaroni - 400 gm', 'groceries', 146, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('3e818445-dccc-46f6-9eca-49fe1f868073', 'Mornadi Velvet Bed', 40, 'https://i.dummyjson.com/data/products/31/1.jpg', 'Mornadi Velvet Bed Base with Headboard Slats Support Classic Style Bedroom Furniture Bed Set', 'furniture', 140, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('419eb5e4-fa72-42f2-8392-9713555f6c7b', 'women\'s shoes', 40, 'https://i.dummyjson.com/data/products/46/1.webp', 'Close: Lace, Style with bottom: Increased inside, Sole Material: Rubber', 'womens-shoes', 72, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('43047823-fbd8-44b7-8401-624862e65cba', 'Leather Straps Wristwatch', 120, 'https://i.dummyjson.com/data/products/61/1.jpg', 'Style:Sport ,Clasp:Buckles ,Water Resistance Depth:3Bar', 'mens-watches', 91, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('466dbc3f-88e8-4473-a8ef-b8e4ac47bffc', 'Plant Hanger For Home', 41, 'https://i.dummyjson.com/data/products/26/1.jpg', 'Boho Decor Plant Hanger For Home Wall Decoration Macrame Wall Hanging Shelf', 'home-decoration', 131, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('46b9385f-c8a3-4bde-808b-66cc44c6ee4f', 'Stainless Steel Wrist Watch', 47, 'https://i.dummyjson.com/data/products/65/1.jpg', 'Stylish Watch For Man (Luxury) Classy Men\'s Stainless Steel Wrist Watch - Box Packed', 'mens-watches', 94, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('46d4fe13-991b-4bf9-bb54-45ee7482fecb', 'Women Shoes', 36, 'https://i.dummyjson.com/data/products/50/1.jpeg', '2020 New Arrivals Genuine Leather Fashion Trend Platform Summer Women Shoes', 'womens-shoes', 46, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('5447b4f2-30b3-4c8a-a1e5-46a23cd02350', 'OPPOF19', 280, 'https://i.dummyjson.com/data/products/4/1.jpg', 'OPPO F19 is officially announced on April 2021.', 'smartphones', 123, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('550ad7fd-cf58-41d8-8871-da5d1ba51b71', 'Stainless Steel Women', 35, 'https://i.dummyjson.com/data/products/70/1.jpg', 'Fashion Skmei 1830 Shell Dial Stainless Steel Women Wrist Watch Lady Bracelet Watch Quartz Watches Ladies', 'womens-watches', 111, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('594ace66-da69-45c1-a3ab-bee54f61941c', 'Sneaker shoes', 120, 'https://i.dummyjson.com/data/products/47/1.jpg', 'Synthetic Leather Casual Sneaker shoes for Women/girls Sneakers For Women', 'womens-shoes', 50, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('5bc3853b-ad71-4db7-8c77-c72401bcdca8', 'Pubg Printed Graphic T-Shirt', 46, 'https://i.dummyjson.com/data/products/54/1.jpg', 'Product Description Features: 100% Ultra soft Polyester Jersey. Vibrant & colorful printing on front. Feels soft as cotton without ever cracking', 'mens-shirts', 136, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('5ed3f428-ddce-437f-847c-97847fcf6817', ';alskd', 10, 'null', 'aaa', ';lka;lskd;lk;lkas', 100, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('6292db3f-5a66-4c0b-b734-fac679f6f035', 'Stylish Luxury Digital Watch', 57, 'https://i.dummyjson.com/data/products/68/1.jpg', 'Stylish Luxury Digital Watch For Girls / Women - Led Smart Ladies Watches For Girls', 'womens-watches', 77, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('63571de6-b4c1-47fc-bffe-07d0dcee01a8', 'Steel Analog Couple Watches', 35, 'https://i.dummyjson.com/data/products/66/1.jpg', 'Elegant design, Stylish ,Unique & Trendy,Comfortable wear', 'womens-watches', 24, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('646c5fa5-3d0a-44d7-b60b-71274f9ed9fc', 'Fog Scent Xpressio Perfume', 13, 'https://i.dummyjson.com/data/products/13/1.jpg', 'Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men', 'fragrances', 61, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('660c47e2-73fb-4646-91bc-ebf163090efe', 'NIGHT SUIT', 55, 'https://i.dummyjson.com/data/products/41/1.jpg', 'NIGHT SUIT RED MICKY MOUSE..  For Girls. Fantastic Suits.', 'womens-dresses', 21, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('68008794-376c-496b-aefd-64803d6c2f63', 'Women Strip Heel', 40, 'https://i.dummyjson.com/data/products/48/1.jpg', 'Features: Flip-flops, Mid Heel, Comfortable, Striped Heel, Antiskid, Striped', 'womens-shoes', 25, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('6dc02f7f-eadc-459b-9773-f80c8bce22af', 'Fancy hand clutch', 44, 'https://i.dummyjson.com/data/products/73/1.jpg', 'This fashion is designed to add a charming effect to your casual outfit. This Bag is made of synthetic leather.', 'womens-bags', 101, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('74949af7-f6f6-4141-a708-4eb11ad98618', 'formal offices shoes', 57, 'https://i.dummyjson.com/data/products/58/1.jpg', 'Pattern Type: Solid, Material: PU, Toe Shape: Pointed Toe ,Outsole Material: Rubber', 'mens-shoes', 68, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('75700155-c570-41f9-8552-d61b74eeb846', 'Silver Ring Set Women', 70, 'https://i.dummyjson.com/data/products/76/1.jpg', 'Jewelry Type:RingsCertificate Type:NonePlating:Silver PlatedShapeattern:noneStyle:CLASSICReligious', 'womens-jewellery', 51, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('80b65f8f-45d6-4398-a1b0-8200a2a5b16f', 'HOT SALE IN EUROPE electric racing motorcycle', 920, 'https://i.dummyjson.com/data/products/92/1.jpg', 'HOT SALE IN EUROPE electric racing motorcycle electric motorcycle for sale adult electric motorcycles', 'motorcycle', 22, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('81d22034-1b82-4879-ac6d-698cfe0a35d9', 'Ladies Multicolored Dress', 79, 'https://i.dummyjson.com/data/products/44/1.jpg', 'This classy shirt for women gives you a gorgeous look on everyday wear and specially for semi-casual wears.', 'womens-dresses', 2, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('85507c73-d6d3-4777-be2a-1f3e9849df35', 'Metal Ceramic Flower', 35, 'https://i.dummyjson.com/data/products/97/1.jpg', 'Metal Ceramic Flower Chandelier Home Lighting American Vintage Hanging Lighting Pendant Lamp', 'lighting', 146, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('8669da0c-cdee-416e-bc82-6d2052029de7', 'Women Sweaters Wool', 600, 'https://i.dummyjson.com/data/products/39/1.jpg', '2021 Custom Winter Fall Zebra Knit Crop Top Women Sweaters Wool Mohair Cos Customize Crew Neck Women\' S Crop Top Sweater', 'tops', 55, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('88051f9f-348c-4d26-9aa0-7eb48611a7e1', 'Automatic Motor Gas Motorcycles', 1050, 'https://i.dummyjson.com/data/products/93/1.jpg', '150cc 4-Stroke Motorcycle Automatic Motor Gas Motorcycles Scooter motorcycles 150cc scooter', 'motorcycle', 127, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('8b1c28b5-6b22-40e9-85c0-b2c0c49a8ea4', 'iPhone X', 899, 'https://i.dummyjson.com/data/products/2/1.jpg', 'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...', 'smartphones', 34, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('901e4430-6a52-4bc8-8d4c-57ed48947550', 'American Vintage Wood Pendant Light', 46, 'https://i.dummyjson.com/data/products/99/1.jpg', 'American Vintage Wood Pendant Light Farmhouse Antique Hanging Lamp Lampara Colgante', 'lighting', 138, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('910495f3-e6c2-4c08-9e8c-5ce149da8aff', '3 Tier Corner Shelves', 700, 'https://i.dummyjson.com/data/products/33/1.jpg', '3 Tier Corner Shelves | 3 PCs Wall Mount Kitchen Shelf | Floating Bedroom Shelf', 'furniture', 106, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('98f406cb-7033-4ac4-b9a3-ca5a6c5f29a8', 'Gulab Powder 50 Gram', 70, 'https://i.dummyjson.com/data/products/25/1.png', 'Dry Rose Flower Powder Gulab Powder 50 Gram • Treats Wounds', 'groceries', 47, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('9b3b5081-29aa-4e5a-a59b-1cd343caf2ec', 'Spring and summershoes', 20, 'https://i.dummyjson.com/data/products/59/1.jpg', 'Comfortable stretch cloth, lightweight body; ,rubber sole, anti-skid wear;', 'mens-shoes', 137, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('9bcd9196-16b1-406e-a791-98da6d0d368e', 'Wholesale cargo lashing Belt', 930, 'https://i.dummyjson.com/data/products/95/1.jpg', 'Wholesale cargo lashing Belt Tie Down end Ratchet strap customized strap 25mm motorcycle 1500kgs with rubber handle', 'motorcycle', 144, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('9c16862b-00bf-4a1e-bd49-c383e1f76ca1', 'Eau De Perfume Spray', 30, 'https://i.dummyjson.com/data/products/15/1.jpg', 'Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality', 'fragrances', 105, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('9c7edc66-99eb-4dda-918f-cc60c1411b96', 'Orange Essence Food Flavou', 14, 'https://i.dummyjson.com/data/products/23/1.jpg', 'Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item', 'groceries', 26, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('9ce54a40-0b96-427d-a3e4-8e18fa7014fd', 'Stiched Kurta plus trouser', 80, 'https://i.dummyjson.com/data/products/42/1.png', 'FABRIC: LILEIN CHEST: 21 LENGHT: 37 TROUSER: (38) :ARABIC LILEIN', 'womens-dresses', 148, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('9e16078b-ee34-4e01-be66-6a5477c43118', '3 lights lndenpant kitchen islang', 34, 'https://i.dummyjson.com/data/products/98/1.jpg', '3 lights lndenpant kitchen islang dining room pendant rice paper chandelier contemporary led pendant light modern chandelier', 'lighting', 44, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('a02590ca-426b-4e78-beb3-31310fd64831', 'Skin Beauty Serum.', 46, 'https://i.dummyjson.com/data/products/19/1.jpg', 'Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m', 'skincare', 54, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('a07426c6-acac-4678-b22a-f6eb8a54dde1', 'Plastic Table', 50, 'https://i.dummyjson.com/data/products/34/1.jpg', 'V?ery good quality plastic table for multi purpose now in reasonable price', 'furniture', 136, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('a08f0b90-94ee-4510-99be-8d9d4902c25b', 'Bluetooth Aux', 25, 'https://i.dummyjson.com/data/products/86/1.jpg', 'Bluetooth Aux Bluetooth Car Aux Car Bluetooth Transmitter Aux Audio Receiver Handfree Car Bluetooth Music Receiver Universal 3.5mm Streaming A2DP Wireless Auto AUX Audio Adapter With Mic For Phone MP3', 'automotive', 22, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('a36400b5-55a2-4375-9618-8e92e70e7aad', 'Flying Wooden Bird', 51, 'https://i.dummyjson.com/data/products/27/1.jpg', 'Package Include 6 Birds with Adhesive Tape Shape: 3D Shaped Wooden Birds Material: Wooden MDF, Laminated 3.5mm', 'home-decoration', 17, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('a4638c59-dbfc-4854-b5bd-59cf64f85b46', 'perfume Oil', 13, 'https://i.dummyjson.com/data/products/11/1.jpg', 'Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil', 'fragrances', 65, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('a485d12e-6980-4f5c-bc29-194ef50e18f8', 'Loafers for men', 47, 'https://i.dummyjson.com/data/products/57/1.jpg', 'Men Shoes - Loafers for men - Rubber Shoes - Nylon Shoes - Shoes for men - Moccassion - Pure Nylon (Rubber) Expot Quality.', 'mens-shoes', 20, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('a66aedb1-a003-40e7-9d5b-4d04b3bdc401', 'Samsung Galaxy Book', 1499, 'https://i.dummyjson.com/data/products/7/1.jpg', 'Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched', 'laptops', 50, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('a918517b-2860-423d-b134-091ca99ef256', 'Tree Oil 30ml', 12, 'https://i.dummyjson.com/data/products/17/1.jpg', 'Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,', 'skincare', 78, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('aaece327-0451-4e9a-b6be-25fd5f5e5e5d', 'Qualcomm original Car Charger', 40, 'https://i.dummyjson.com/data/products/89/1.jpg', 'best Quality CHarger , Highly Recommended to all best Quality CHarger , Highly Recommended to all', 'automotive', 79, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('ad7dea22-d3b1-4273-a477-0bd323e5e4dc', 'Fashion Magnetic Wrist Watch', 60, 'https://i.dummyjson.com/data/products/67/1.jpg', 'Buy this awesome  The product is originally manufactured by the company and it\'s a top selling product with a very reasonable', 'womens-watches', 46, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('af40c6b0-b976-4f89-a134-b1593ab552b4', '3 DOOR PORTABLE', 41, 'https://i.dummyjson.com/data/products/35/1.jpg', 'Material: Stainless Steel and Fabric  Item Size: 110 cm x 45 cm x 175 cm Package Contents: 1 Storage Wardrobe', 'furniture', 68, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('b1d3eccc-fc8f-4309-8f46-0d5a473af9f9', 'Seven Pocket Women Bag', 68, 'https://i.dummyjson.com/data/products/75/1.jpg', 'Seven Pocket Women Bag Handbags Lady Shoulder Crossbody Bag Female Purse Seven Pocket Bag', 'womens-bags', 13, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('b465556f-2c52-4ce9-924d-a2c962a241d5', 'MacBook Pro', 1749, 'https://i.dummyjson.com/data/products/6/1.png', 'MacBook Pro 2021 with mini-LED display may launch between September, November', 'laptops', 83, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('b67854fd-f634-4cca-b6cf-de1aa9d6d04a', 'Key Holder', 30, 'https://i.dummyjson.com/data/products/30/1.jpg', 'Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality', 'home-decoration', 54, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('b6cebd21-7b5c-4737-ab5c-a83fe6da8c64', 'Freckle Treatment Cream- 15gm', 70, 'https://i.dummyjson.com/data/products/20/1.jpg', 'Fair & Clear is Pakistan\'s only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.', 'skincare', 140, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('b7de34e4-713d-4b2e-804e-79423fbd27bf', 'Golden Watch Pearls Bracelet Watch', 47, 'https://i.dummyjson.com/data/products/69/1.jpg', 'Product details of Golden Watch Pearls Bracelet Watch For Girls - Golden Chain Ladies Bracelate Watch for Women', 'womens-watches', 89, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('b7e5b1a0-fd1b-496f-9c43-cca08dc98011', 'Stylish Casual Jeans Shoes', 58, 'https://i.dummyjson.com/data/products/60/1.jpg', 'High Quality ,Stylish design ,Comfortable wear ,FAshion ,Durable', 'mens-shoes', 129, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('b7f91251-e741-4c29-b035-bdbb516ab89d', 'kkkkkk', 123, 'image-1702872427366-466490897', 'wzrcfybhjnmk;,l', 'recfgvbhjn', 123456, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('b83cc3e6-e149-4ce9-acde-d6b54610b143', 'Chappals & Shoe Ladies Metallic', 23, 'https://i.dummyjson.com/data/products/49/1.jpg', 'Womens Chappals & Shoe Ladies Metallic Tong Thong Sandal Flat Summer 2020 Maasai Sandals', 'womens-shoes', 107, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('bb9a1932-8ef2-4e91-bb0d-347bf6ffa3f6', 'Sleeve Shirt Womens', 90, 'https://i.dummyjson.com/data/products/36/1.jpg', 'Cotton Solid Color Professional Wear Sleeve Shirt Womens Work Blouses Wholesale Clothing Casual Plain Custom Top OEM Customized', 'tops', 39, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('be7acb85-f037-4fb9-8985-18f895237c42', 'iPhone 9', 549, 'https://i.dummyjson.com/data/products/1/1.jpg', 'An apple mobile which is nothing like apple', 'smartphones', 94, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('bf79851d-41b8-40b7-8553-aa015dad9782', '- Daal Masoor 500 grams', 20, 'https://i.dummyjson.com/data/products/21/1.png', 'Fine quality Branded Product Keep in a cool and dry place', 'groceries', 133, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('c040af2c-1dd4-405b-8900-7de582760e99', 'Wiley X Night Vision Yellow Glasses', 30, 'https://i.dummyjson.com/data/products/83/1.jpg', 'Wiley X Night Vision Yellow Glasses for Riders - Night Vision Anti Fog Driving Glasses - Free Night Glass Cover - Shield Eyes From Dust and Virus- For Night Sport Matches', 'sunglasses', 115, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('c821a76a-26e5-41a8-a97a-9ad83861abec', 'Chain Pin Tassel Earrings', 45, 'https://i.dummyjson.com/data/products/80/1.jpg', 'Pair Of Ear Cuff Butterfly Long Chain Pin Tassel Earrings - Silver ( Long Life Quality Product)', 'womens-jewellery', 9, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('c91a9841-1639-455f-8d12-fe7cd493d852', 'Square Sunglasses', 28, 'https://i.dummyjson.com/data/products/84/1.jpg', 'Fashion Oversized Square Sunglasses Retro Gradient Big Frame Sunglasses For Women One Piece Gafas Shade Mirror Clear Lens 17059', 'sunglasses', 64, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('cbf8257b-1c27-40a5-9d3b-a85657aa0435', 'Crystal chandelier maria theresa for 12 light', 47, 'https://i.dummyjson.com/data/products/100/1.jpg', 'Crystal chandelier maria theresa for 12 light', 'lighting', 133, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('d2406ecb-7653-4c3a-9650-e7086dcb5372', 'Round Silver Frame Sun Glasses', 19, 'https://i.dummyjson.com/data/products/81/1.jpg', 'A pair of sunglasses can protect your eyes from being hurt. For car driving, vacation travel, outdoor activities, social gatherings,', 'sunglasses', 78, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('d2e6b277-f9f5-415f-a5eb-dbe4161aaa86', 'FREE FIRE T Shirt', 10, 'https://i.dummyjson.com/data/products/52/1.png', 'quality and professional print - It doesn\'t just look high quality, it is high quality.', 'mens-shirts', 128, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('d3a6aca9-5d05-42ff-8ae1-d1e73bf66237', 'women winter clothes', 57, 'https://i.dummyjson.com/data/products/40/1.jpg', 'women winter clothes thick fleece hoodie top with sweat pantjogger women sweatsuit set joggers pants two piece pants set', 'tops', 84, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('d49712e1-62e2-49a5-8d0d-6c270f0b91cf', 'Royal Blue Premium Watch', 50, 'https://i.dummyjson.com/data/products/63/1.jpg', 'Men Silver Chain Royal Blue Premium Watch Latest Analog Watch', 'mens-watches', 142, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('d51054f3-0c7b-4276-ad67-595eedf95279', 'Money Heist Printed Summer T Shirts', 66, 'https://i.dummyjson.com/data/products/55/1.jpg', 'Fabric Jercy, Size: M & L Wear Stylish Dual Stiched', 'mens-shirts', 122, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('dfb0029a-a794-411c-850a-361ca566a96b', 'Rhinestone Korean Style Open Rings', 30, 'https://i.dummyjson.com/data/products/78/thumbnail.jpg', 'Fashion Jewellery 3Pcs Adjustable Pearl Rhinestone Korean Style Open Rings For Women', 'womens-jewellery', 9, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('e3d1fc87-682e-4492-86d8-933322db0852', 'Cycle Bike Glow', 35, 'https://i.dummyjson.com/data/products/90/1.jpg', 'Universal fitment and easy to install no special wires, can be easily installed and removed. Fits most standard tyre air stem valves of road, mountain bicycles, motocycles and cars.Bright led will turn on w', 'automotive', 63, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('e4d64562-3048-4259-9e3e-2ec69f32f412', '3D Embellishment Art Lamp', 20, 'https://i.dummyjson.com/data/products/28/1.jpg', '3D led lamp sticker Wall sticker 3d wall art light on/off button  cell operated (included)', 'home-decoration', 54, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('e568583b-3d64-4c02-9470-f28ed8df4216', 'printed high quality T shirts', 35, 'https://i.dummyjson.com/data/products/53/1.webp', 'Brand: vintage Apparel ,Export quality', 'mens-shirts', 6, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('e6d7bcaa-b925-4aa3-b59f-0868b5b56e78', 'LouisWill Men Sunglasses', 50, 'https://i.dummyjson.com/data/products/85/1.jpg', 'LouisWill Men Sunglasses Polarized Sunglasses UV400 Sunglasses Day Night Dual Use Safety Driving Night Vision Eyewear AL-MG Frame Sun Glasses with Free Box for Drivers', 'sunglasses', 92, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('e75b1df6-16f7-4d4f-8eb9-fbcd8eaf9ae0', 'Handcraft Chinese style', 60, 'https://i.dummyjson.com/data/products/29/1.jpg', 'Handcraft Chinese style art luxury palace hotel villa mansion home decor ceramic vase with brass fruit plate', 'home-decoration', 7, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('e8d27e3c-7d89-4ba6-b0cb-262588eabffc', 'lighting ceiling kitchen', 30, 'https://i.dummyjson.com/data/products/96/1.jpg', 'Wholesale slim hanging decorative kid room lighting ceiling kitchen chandeliers pendant light modern', 'lighting', 96, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('e9e79050-11c6-4b6a-8618-498cedef9443', 'Malai Maxi Dress', 50, 'https://i.dummyjson.com/data/products/45/1.jpg', 'Ready to wear, Unique design according to modern standard fashion, Best fitting ,Imported stuff', 'womens-dresses', 96, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('e9f41b57-4fca-44ef-96d6-bcafc6bf2003', 'cereals muesli fruit nuts', 46, 'https://i.dummyjson.com/data/products/24/1.jpg', 'original fauji cereal muesli 250gm box pack original fauji cereals muesli fruit nuts flakes breakfast cereal break fast faujicereals cerels cerel foji fouji', 'groceries', 113, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('f0a3711e-d4bc-4f8a-9529-8f8bf99b772d', 'Handbag For Girls', 23, 'https://i.dummyjson.com/data/products/72/1.jpg', 'This fashion is designed to add a charming effect to your casual outfit. This Bag is made of synthetic leather.', 'womens-bags', 27, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('f1e60357-dae3-4993-8fb2-bb556648d6bd', 'Black Motorbike', 569, 'https://i.dummyjson.com/data/products/91/1.jpg', 'Engine Type:Wet sump, Single Cylinder, Four Stroke, Two Valves, Air Cooled with SOHC (Single Over Head Cam) Chain Drive Bore & Stroke:47.0 x 49.5 MM', 'motorcycle', 115, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('f215ee96-13dd-4175-983d-9872253762a1', 'Huawei P30', 499, 'https://i.dummyjson.com/data/products/5/1.jpg', 'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.', 'smartphones', 32, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('f72b0e9e-afbf-4ea3-8aaf-0f40deb64d83', 'HP Pavilion 15-DK1056WM', 1099, 'https://i.dummyjson.com/data/products/10/1.jpg', 'HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10', 'laptops', 89, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('f948b023-3c8c-492a-9750-bea851013af8', 'Microsoft Surface Laptop 4', 1499, 'https://i.dummyjson.com/data/products/8/1.jpg', 'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.', 'laptops', 68, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('fb3988d9-b373-4bad-b7a0-9a425e8f860b', 'frock gold printed', 600, 'https://i.dummyjson.com/data/products/43/1.jpg', 'Ghazi fabric long frock gold printed ready to wear stitched collection (G992)', 'womens-dresses', 150, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('fb81c56f-eb83-4011-a3c9-ce748db3acc2', 'new arrivals Fashion motocross goggles', 900, 'https://i.dummyjson.com/data/products/94/1.webp', 'new arrivals Fashion motocross goggles motorcycle motocross racing motorcycle', 'motorcycle', 109, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1),
('fbfddf4d-4074-499a-988b-90d57462639e', 'half sleeves T shirts', 23, 'https://i.dummyjson.com/data/products/51/1.png', 'Many store is creating new designs and trend every month and every year. Daraz.pk have a beautiful range of men fashion brands', 'mens-shirts', 132, '21760c36-d568-484d-8dc0-4c88b3002c66', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `reasons`
--

CREATE TABLE `reasons` (
  `o_id` varchar(250) NOT NULL,
  `reason` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sellers`
--

CREATE TABLE `sellers` (
  `sid` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) DEFAULT NULL,
  `fname` varchar(250) DEFAULT NULL,
  `lname` varchar(250) DEFAULT NULL,
  `buisness` varchar(250) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `isMailVerified` tinyint(4) DEFAULT NULL,
  `isApproved` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `sellers`
--

INSERT INTO `sellers` (`sid`, `email`, `password`, `fname`, `lname`, `buisness`, `address`, `city`, `pincode`, `country`, `isMailVerified`, `isApproved`) VALUES
('21760c36-d568-484d-8dc0-4c88b3002c66', 'Malkeetk075@gmail.com', '$2b$10$rpkTMKH4GmTZ49eJGj59KOJ2zw/uOaKEHYXnVDojksCeuDlaVoItC', 'Malkeet', 'Kumar', 'Forever', 'VPO Sangoha', 'Karnal', '132001', 'india', 1, 1),
('387e5f8b-76a7-441f-af57-765e35ff1408', 'seller123@gmail.com', NULL, 'First', 'seller', 'Ak Garments', 'Shop no. 90, V.P.O Sangoha', 'Karnal', '132001', 'india', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `seller_docs`
--

CREATE TABLE `seller_docs` (
  `sid` varchar(250) NOT NULL,
  `gstNo` varchar(250) DEFAULT NULL,
  `panNo` varchar(250) DEFAULT NULL,
  `accountNo` varchar(250) DEFAULT NULL,
  `passbookFile` varchar(250) DEFAULT NULL,
  `panFile` varchar(250) DEFAULT NULL,
  `aadharFile` varchar(250) DEFAULT NULL,
  `shopImage` varchar(250) DEFAULT NULL,
  `profileImage` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `seller_docs`
--

INSERT INTO `seller_docs` (`sid`, `gstNo`, `panNo`, `accountNo`, `passbookFile`, `panFile`, `aadharFile`, `shopImage`, `profileImage`) VALUES
('21760c36-d568-484d-8dc0-4c88b3002c66', 'gst number ni hai abhi', 'pan bhi ni hai', 'account khali hai', 'passbook-1702275353787-579332795', 'panFile-1702275353798-705001217', 'aadharFile-1702275353792-975559261', 'storeImage-1702275353802-974647844', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `shippers`
--

CREATE TABLE `shippers` (
  `shipper_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(12) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `center` varchar(255) DEFAULT NULL,
  `center_number` int(11) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `shippers`
--

INSERT INTO `shippers` (`shipper_id`, `name`, `mobile`, `email`, `password`, `center`, `center_number`, `pincode`, `city`) VALUES
(1, 'shipper1', '1234567890', 'abc1@abc.com', 'Abc@12345', 'Wow bazzar warehouse 1, Ambala', 1, '133001', 'Ambala'),
(2, 'shipper2', '1234567890', 'abc2@abc.com', 'Abc@12345', 'Wow bazzar warehouse 2, Bhiwani', 2, '127021', 'Bhiwani'),
(3, 'shipper3', '1234567890', 'abc3@abc.com', 'Abc@12345', 'Wow bazzar warehouse 3, Faridabad', 3, '121002', 'Faridabad'),
(4, 'shipper4', '1234567890', 'abc4@abc.com', 'Abc@12345', 'Wow bazzar warehouse 4, Gurugram', 4, '122001', 'Gurugram'),
(5, 'shipper5', '1234567890', 'abc5@abc.com', 'Abc@12345', 'Wow bazzar warehouse 5, Hissar', 5, '125001', 'Hissar'),
(6, 'shipper6', '1234567890', 'abc6@abc.com', 'Abc@12345', 'Wow bazzar warehouse 6, Jind', 6, '126102', 'Jind'),
(7, 'shipper7', '1234567890', 'abc7@abc.com', 'Abc@12345', 'Wow bazzar warehouse 7, Karnal', 7, '132001', 'Karnal'),
(8, 'shipper8', '1234567890', 'abc8@abc.com', 'Abc@12345', 'Wow bazzar warehouse 8, Kaithal', 8, '136027', 'Kaithal'),
(9, 'shipper9', '1234567890', 'abc9@abc.com', 'Abc@12345', 'Wow bazzar warehouse 9, Kurukshetra', 9, '136118', 'Kurukshetra'),
(10, 'shipper10', '1234567890', 'abc10@abc.com', 'Abc@12345', 'Wow bazzar warehouse 10, Panchkula', 10, '134112', 'Panchkula'),
(11, 'shipper11', '1234567890', 'abc11@abc.com', 'Abc@12345', 'Wow bazzar warehouse 11, Panipat', 11, '132103', 'Panipat'),
(12, 'shipper12', '1234567890', 'abc12@abc.com', 'Abc@12345', 'Wow bazzar warehouse 12, Rewari', 12, '123401', 'Rewari'),
(13, 'shipper13', '1234567890', 'abc13@abc.com', 'Abc@12345', 'Wow bazzar warehouse 13, Rohtak', 13, '124001', 'Rohtak'),
(14, 'shipper14', '1234567890', 'abc14@abc.com', 'Abc@12345', 'Wow bazzar warehouse 14, Sirsa', 14, '125055', 'Sirsa'),
(15, 'shipper15', '1234567890', 'abc15@abc.com', 'Abc@12345', 'Wow bazzar warehouse 15, Sonipat', 15, '131001', 'Sonipat'),
(16, 'shipper16', '1234567890', 'abc16@abc.com', 'Abc@12345', 'Wow bazzar warehouse 16, Yamunanagar', 16, '135001', 'Yamunanagar');

-- --------------------------------------------------------

--
-- Table structure for table `trackingstatus`
--

CREATE TABLE `trackingstatus` (
  `o_id` varchar(250) DEFAULT NULL,
  `statusCode` int(11) DEFAULT NULL,
  `location` varchar(250) DEFAULT NULL,
  `fromId` varchar(250) DEFAULT NULL,
  `assignedTo` varchar(250) DEFAULT NULL,
  `isRecieved` tinyint(4) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `sendNext` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `trackingstatus`
--

INSERT INTO `trackingstatus` (`o_id`, `statusCode`, `location`, `fromId`, `assignedTo`, `isRecieved`, `date`, `sendNext`) VALUES
('22239882-9e8c-4156-9e19-322defaef00a', 4, 'Delivered', '', '', 0, '2023-12-29T16:25:05.143Z', 0),
('e997de89-0bfc-4dfe-9f59-62cb41428507', 2, 'Ambala', '21760c36-d568-484d-8dc0-4c88b3002c66', '1', 1, '2023-12-31T16:00:36.610Z', 1),
('49d466aa-c76c-49be-b092-0f459d70879a', 1, NULL, NULL, NULL, 1, '2023-12-31T15:17:50.445Z', NULL),
('49d466aa-c76c-49be-b092-0f459d70879a', 2, 'Bhiwani', '21760c36-d568-484d-8dc0-4c88b3002c66', '2', 0, NULL, NULL),
('e997de89-0bfc-4dfe-9f59-62cb41428507', 2, 'Karnal', '1', '7', 1, '2024-01-01T06:55:06.219Z', 1),
('e997de89-0bfc-4dfe-9f59-62cb41428507', 3, 'Karnal', '7', '20', 0, '2024-01-01T06:55:24.691Z', 3),
('e997de89-0bfc-4dfe-9f59-62cb41428507', 4, 'Delivered', '', '', 0, '2024-01-01T06:57:47.909Z', 0),
('89734aaa-f71a-40e4-b7ad-0125cc7c605c', 1, NULL, NULL, NULL, 1, '2024-01-10T12:45:31.173Z', NULL),
('89734aaa-f71a-40e4-b7ad-0125cc7c605c', 2, 'Bhiwani', '21760c36-d568-484d-8dc0-4c88b3002c66', '2', 1, '2024-01-10T12:49:40.384Z', 1),
('89734aaa-f71a-40e4-b7ad-0125cc7c605c', 2, 'Karnal', '2', '7', 1, '2024-01-10T12:50:31.737Z', 1),
('89734aaa-f71a-40e4-b7ad-0125cc7c605c', 3, 'Karnal', '7', '20', 0, '2024-01-10T12:50:39.718Z', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `fname` varchar(250) DEFAULT NULL,
  `lname` varchar(250) DEFAULT NULL,
  `mobile` varchar(250) DEFAULT NULL,
  `isMailVerified` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `fname`, `lname`, `mobile`, `isMailVerified`) VALUES
('6a7e5e58-7d70-44af-9be2-80154d7d8122', '01sumitsaini@gmail.com', '$2b$10$Tj0SR8r2mI/YoMYlt5R5JOSaoN/QfZgV5WO7dmLPoCUb9gd8WLcsm', 'sumit ', 'saini', '1234567890', 0),
('8a6f5f3a-e1ef-49f6-b820-78abf600318e', 'aniketkashyap321@gmail.com', '$2b$10$CXOtJ.TM7kqcJez/s1.Y0OF/Cukaa05n.SJtbxc9I0JQDMP1vj4k2', 'Malkeet', 'Kumar', 'undefined', 0),
('ad6443ab-aa58-45e3-b896-6009d4c484aa', 'malkeetk075@gmail.com', '$2b$10$aFMbLfNQlqcyBzXJaS/tdewBI8v3sdNwTP.9TqH1CNZlUUeMO39eG', 'aniket', 'kashyap', '8397087924', 1),
('eb250d04-4dc4-4aa2-bc0e-284a088e90e1', '01sumitsaini@gamil.com', '$2b$10$w/3EQtgimxRhnsjyFrEKM.2reORPy/JbOdCiGbOsr6gFbshtpqlm6', 'sumit ', 'saini', '1234567890', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`add_id`),
  ADD KEY `u_id` (`u_id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD KEY `u_id` (`u_id`),
  ADD KEY `p_id` (`p_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`o_id`),
  ADD KEY `u_id` (`u_id`),
  ADD KEY `p_id` (`p_id`),
  ADD KEY `sid` (`sid`),
  ADD KEY `address` (`address`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`p_id`),
  ADD KEY `sellerId` (`sellerId`);

--
-- Indexes for table `reasons`
--
ALTER TABLE `reasons`
  ADD PRIMARY KEY (`o_id`);

--
-- Indexes for table `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`sid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `seller_docs`
--
ALTER TABLE `seller_docs`
  ADD KEY `sid` (`sid`);

--
-- Indexes for table `shippers`
--
ALTER TABLE `shippers`
  ADD PRIMARY KEY (`shipper_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `shippers`
--
ALTER TABLE `shippers`
  MODIFY `shipper_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`p_id`) REFERENCES `products` (`p_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`p_id`) REFERENCES `products` (`p_id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`sid`) REFERENCES `sellers` (`sid`),
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`address`) REFERENCES `addresses` (`add_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`sellerId`) REFERENCES `sellers` (`sid`);

--
-- Constraints for table `reasons`
--
ALTER TABLE `reasons`
  ADD CONSTRAINT `reasons_ibfk_1` FOREIGN KEY (`o_id`) REFERENCES `orders` (`o_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `seller_docs`
--
ALTER TABLE `seller_docs`
  ADD CONSTRAINT `seller_docs_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `sellers` (`sid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
