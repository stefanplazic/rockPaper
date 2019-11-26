CREATE TABLE `user` (
  `id` int(20) unsigned NOT NULL,
  `email` varchar(50) unsigned NOT NULL,
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;


CREATE TABLE `session` (
  `id` int(20) unsigned NOT NULL,
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `sessionUser` (
  `sessionId` int(20) unsigned NOT NULL,
  `userId` int(20) unsigned NOT NULL,
  
  PRIMARY KEY (`sessionId`,`userId`),
  FOREIGN KEY (sessionId) REFERENCES session (id),
  FOREIGN KEY (userId) REFERENCES user (id),
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `round` (
  `id` int(20) unsigned NOT NULL,
  `sessionId` int(20) unsigned NOT NULL,
  
  PRIMARY KEY (`id`),
  FOREIGN KEY (sessionId) REFERENCES session (id),
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `score` (
  `roundId` int(20) unsigned NOT NULL,
  `playerId` int(20) unsigned NOT NULL,
  
  PRIMARY KEY (`roundId`,`playerId`),
  FOREIGN KEY (roundId) REFERENCES round (id),
  FOREIGN KEY (playerId) REFERENCES user (id),
)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
