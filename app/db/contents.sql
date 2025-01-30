/*
 Navicat Premium Dump SQL

 Source Server         : story
 Source Server Type    : SQLite
 Source Server Version : 3045000 (3.45.0)
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3045000 (3.45.0)
 File Encoding         : 65001

 Date: 07/12/2024 16:36:10
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for contents
-- ----------------------------
DROP TABLE IF EXISTS "contents";
CREATE TABLE "contents" (
  "id" INTEGER NOT NULL,
  "text" TEXT(255),
  "note" TEXT(255),
  "stage" TEXT(255),
  "story" INTEGER,
  "chapter" INTEGER,
  PRIMARY KEY ("id")
);

PRAGMA foreign_keys = true;
