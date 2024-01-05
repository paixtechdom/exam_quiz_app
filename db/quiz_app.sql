-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 29, 2023 at 02:15 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `userName` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `userName`, `password`) VALUES
(1, 'admin', 'adminadmin');

-- --------------------------------------------------------

--
-- Table structure for table `examquestions`
--

CREATE TABLE `examquestions` (
  `id` int(11) NOT NULL,
  `examKey` varchar(250) NOT NULL,
  `question` varchar(400) NOT NULL,
  `optionA` varchar(400) NOT NULL,
  `optionB` varchar(400) NOT NULL,
  `optionC` varchar(400) NOT NULL,
  `optionD` varchar(400) NOT NULL,
  `answer` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `examquestions`
--

INSERT INTO `examquestions` (`id`, `examKey`, `question`, `optionA`, `optionB`, `optionC`, `optionD`, `answer`) VALUES
(78, 'admin30552023281', 'How many wives did Odudua marry?', '5', '4', '13', 'many', 'many'),
(83, 'admin512202370', 'Which is not a part of speech', 'noun', 'simile', 'pronoun', 'adjective', 'simile'),
(84, 'admin512202370', 'how many parts of speech do we have', '5', '8', '6', '9', '9'),
(85, 'admin512202370', 'Which part of speech is responsible for naming?', 'noun', 'adjective', 'pronoun', 'verb', 'noun'),
(86, 'admin44222023608', 'Computer applications used in computer science', 'corel draw', 'visual studio code ', 'photoshop', 'all of the above', 'all of the above'),
(87, 'admin44222023608', 'which is not a word processing software', 'corel draw', 'word pad', 'ms word', 'wps office', 'corel draw'),
(89, 'admin30552023281', 'who killed moremi', 'omi mirimirirn', 'igbos', 'ooni', 'none of the above', 'none of the above'),
(90, 'admin30552023281', 'what did odudua bring from heaven', 'cock, chain and chameleon', 'cock, staff, chain and chameleon', 'cock, hen and staff', 'staff, cock and chain', 'cock, staff, chain and chameleon'),
(91, 'admin30552023281', 'who is neil armstrong?', 'a voyager', 'an italian voyager', 'a colonizer', 'none of the above', 'an italian voyager'),
(116, 'admin30552023281', 'Who discovered America ', ' Amerigos vespusis ', ' neil armstrong ', ' george washington ', ' queen elizabeth ', ' neil armstrong '),
(117, 'admin30552023281', 'How many deities are there in yoruba land ', ' 401 ', ' 7 ', ' 400 ', ' 20 ', ' 401 ');

-- --------------------------------------------------------

--
-- Table structure for table `examresults`
--

CREATE TABLE `examresults` (
  `id` int(11) NOT NULL,
  `matricNumber` varchar(250) NOT NULL,
  `studentName` varchar(250) NOT NULL,
  `department` varchar(250) NOT NULL,
  `faculty` varchar(250) NOT NULL,
  `level` varchar(60) NOT NULL,
  `examKey` varchar(200) NOT NULL,
  `score` int(11) NOT NULL,
  `dateOfExamination` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `examresults`
--

INSERT INTO `examresults` (`id`, `matricNumber`, `studentName`, `department`, `faculty`, `level`, `examKey`, `score`, `dateOfExamination`) VALUES
(276, 'EDC-C0-S0-C8', 'Erekete Bobo', 'Computer Science', 'Pure and Applied Sciences', '100', 'admin30552023281', 5, '2023-08-29 11:40:16'),
(277, 'EDC-M0-G0-T7', 'Erekete Queen', 'Accounting', 'Management Sciences', '100', 'admin30552023281', 5, '2023-08-29 11:41:20'),
(278, 'EDC-P0-U0-B2', 'OPEYEMI AKINTOLA', 'Public Administrations', 'Management Sciences', '100', 'admin30552023281', 4, '2023-08-29 11:42:09'),
(491, 'EDC-C0-S0-C1', 'Oluwaferanmi John', 'Computer Science', 'Pure and Applied Sciences', '300', 'admin30552023281', 6, '2023-08-29 11:57:51');

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `id` int(11) NOT NULL,
  `examTitle` varchar(250) NOT NULL,
  `examKey` varchar(250) NOT NULL,
  `faculty` varchar(250) NOT NULL,
  `department` varchar(250) NOT NULL,
  `level` varchar(250) NOT NULL,
  `duration` int(250) NOT NULL,
  `status` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`id`, `examTitle`, `examKey`, `faculty`, `department`, `level`, `duration`, `status`) VALUES
(29, 'English Exam', 'admin512202370', 'Arts and Communication', 'Linguistics', '200', 120, 'Active'),
(37, 'French ', 'admin39122023738', 'All', 'All', '300', 0, 'Active'),
(38, 'History Omega Semester', 'admin30552023281', 'All', 'All', 'All', 120, 'Active'),
(42, 'Application Package', 'admin44222023608', 'Pure and Applied Sciences', 'Computer Science', '100', 120, 'Active'),
(43, 'Benin People and Culture', 'admin22302023401', 'All', 'All', 'All', 0, 'Active'),
(44, 'Calculus', 'admin2392023605', 'Pure and Applied Sciences', 'Computer Science', '100', 0, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `firstName` varchar(250) NOT NULL,
  `middleName` varchar(250) NOT NULL,
  `lastName` varchar(250) NOT NULL,
  `matricNumber` varchar(250) NOT NULL,
  `password` varchar(400) NOT NULL,
  `faculty` varchar(400) NOT NULL,
  `department` varchar(400) NOT NULL,
  `level` varchar(200) NOT NULL,
  `dateCreated` timestamp(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `firstName`, `middleName`, `lastName`, `matricNumber`, `password`, `faculty`, `department`, `level`, `dateCreated`) VALUES
(4, 'Oluwaferanmi', 'Peace', 'John', 'EDC-C0-S0-C1', 'johnpeace', 'Pure and Applied Sciences', 'Computer Science', '300', '2023-07-14 02:36:47.295'),
(5, 'Erekete', 'Emmanuel', 'Bobo', 'EDC-C0-S0-C8', 'bobobobo', 'Pure and Applied Sciences', 'Computer Science', '100', '2023-07-14 02:37:29.728'),
(6, 'Erekete', 'Elizabeth', 'Queen', 'EDC-M0-G0-T7', 'queenqueen', 'Management Sciences', 'Accounting', '100', '2023-07-14 02:39:26.178'),
(7, 'OPEYEMI', 'Elizabeth', 'AKINTOLA', 'EDC-P0-U0-B2', 'akintola', 'Management Sciences', 'Public Administrations', '100', '2023-07-14 02:39:26.178');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `examquestions`
--
ALTER TABLE `examquestions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `examresults`
--
ALTER TABLE `examresults`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `examquestions`
--
ALTER TABLE `examquestions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `examresults`
--
ALTER TABLE `examresults`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=492;

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
