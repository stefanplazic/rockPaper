
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE `round` (
  `id` int(20) NOT NULL,
  `sessionId` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `roundId` int(20) NOT NULL,
  `playerId` int(20) NOT NULL,
  `type` enum('loose','win','draw','') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessionUser`
--

CREATE TABLE `sessionUser` (
  `sessionId` int(20) NOT NULL,
  `userId` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(20) NOT NULL,
  `email` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `round`
--
ALTER TABLE `round`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Constraint_Session` (`sessionId`);

--
-- Indexes for table `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`roundId`,`playerId`),
  ADD KEY `FK_Constraint_Player` (`playerId`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessionUser`
--
ALTER TABLE `sessionUser`
  ADD PRIMARY KEY (`sessionId`,`userId`),
  ADD KEY `FK_Constraint_User` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `round`
--
ALTER TABLE `round`
  ADD CONSTRAINT `FK_Constraint_Session` FOREIGN KEY (`sessionId`) REFERENCES `session` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `score`
--
ALTER TABLE `score`
  ADD CONSTRAINT `FK_Constraint_Player` FOREIGN KEY (`playerId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `FK_Constraint_Round` FOREIGN KEY (`roundId`) REFERENCES `round` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `sessionUser`
--
ALTER TABLE `sessionUser`
  ADD CONSTRAINT `FK_Constraint_User` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

