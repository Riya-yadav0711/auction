-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: auction
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auctiondetail`
--

DROP TABLE IF EXISTS `auctiondetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auctiondetail` (
  `auctionId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `auctioneerName` varchar(50) DEFAULT NULL,
  `auctioneerEmail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`auctionId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auctiondetail`
--

LOCK TABLES `auctiondetail` WRITE;
/*!40000 ALTER TABLE `auctiondetail` DISABLE KEYS */;
INSERT INTO `auctiondetail` VALUES (1,'The Antiques','riya yadav','riya@gmail.com'),(2,'The Gallery','riya yadav','riya@gmail.com');
/*!40000 ALTER TABLE `auctiondetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bidvalue`
--

DROP TABLE IF EXISTS `bidvalue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bidvalue` (
  `auctionId` int DEFAULT NULL,
  `bidderId` varchar(100) DEFAULT NULL,
  `bidValue` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bidvalue`
--

LOCK TABLES `bidvalue` WRITE;
/*!40000 ALTER TABLE `bidvalue` DISABLE KEYS */;
INSERT INTO `bidvalue` VALUES (2,'ea7d4e15-b7ed-41ff-8bde-3f17962a5c44',10000),(1,'ea7d4e15-b7ed-41ff-8bde-3f17962a5c44',15000),(1,'f968d985-fd6e-4e61-acbb-efefc5ff4fea',17000),(2,'f968d985-fd6e-4e61-acbb-efefc5ff4fea',7000),(1,'4cead493-44cf-449e-85b2-8848c3696bd6',19000),(2,'4cead493-44cf-449e-85b2-8848c3696bd6',16000),(2,'4cead493-44cf-449e-85b2-8848c3696bd6',16700),(2,'f968d985-fd6e-4e61-acbb-efefc5ff4fea',18000);
/*!40000 ALTER TABLE `bidvalue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `roleId` int NOT NULL,
  `roleName` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`roleId`),
  UNIQUE KEY `roleId_UNIQUE` (`roleId`),
  UNIQUE KEY `roleName_UNIQUE` (`roleName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'auctioneer'),(2,'bidder');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` varchar(100) NOT NULL,
  `firstName` varchar(30) DEFAULT NULL,
  `lastName` varchar(30) DEFAULT NULL,
  `role` int NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `token` varchar(30) DEFAULT NULL,
  `tokenExp` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('4cead493-44cf-449e-85b2-8848c3696bd6','rohan','jadhav',2,'rohan@gmail.com','$2b$10$UK6hfdfJG/2BOmWa5STA9.00Hr.Tvf2jDsx2gvI7cnWilWjnCQ4Qi',NULL,NULL),('55fd6cae-4af2-452d-930e-c0fa5c685aa4','riya','yadav',1,'riya@gmail.com','$2b$10$6m39ChWjI.5xQp.lBS1Vr.Tyni6T4uSSh5Axiokg7RVdMn6Az2F9e',NULL,NULL),('ea7d4e15-b7ed-41ff-8bde-3f17962a5c44','kuldeep','panwar',2,'kuldeep@gmail.com','$2b$10$PEji/GG2oLypFFr0QZSALOgyifUNGOgPhJEc7E5aiHVAQXlqk9Sju',NULL,NULL),('f968d985-fd6e-4e61-acbb-efefc5ff4fea','saurabh','mishra',2,'saurabh@gmail.com','$2b$10$RPyKZuaCfYJDBscEiM/Dm.1Y0Fklu3bPzAbkZIALqmotuVtN726w2',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-13 13:43:45
