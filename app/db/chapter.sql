/*
 Navicat Premium Dump SQL

 Source Server         : story
 Source Server Type    : SQLite
 Source Server Version : 3045000 (3.45.0)
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3045000 (3.45.0)
 File Encoding         : 65001

 Date: 07/12/2024 16:31:59
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for chapter
-- ----------------------------
DROP TABLE IF EXISTS "chapter";
CREATE TABLE "chapter" (
  "id" INTEGER NOT NULL,
  "story" INTEGER,
  "title" TEXT(255),
  "frame" TEXT(255),
  PRIMARY KEY ("id")
);

PRAGMA foreign_keys = true;
