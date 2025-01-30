/*
 Navicat Premium Dump SQL

 Source Server         : story
 Source Server Type    : SQLite
 Source Server Version : 3045000 (3.45.0)
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3045000 (3.45.0)
 File Encoding         : 65001

 Date: 07/12/2024 16:38:57
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS "roles";
CREATE TABLE "roles" (
  "id" TEXT(255) NOT NULL,
  "name" TEXT(255),
  "ename" TEXT(255),
  "nick" TEXT(255),
  "selfname" TEXT(255),
  "sex" TEXT(255),
  "age" TEXT(255),
  "birth" TEXT(255),
  "star" TEXT(255),
  "shengao" TEXT(255),
  "tizhong" TEXT(255),
  "xuexing" TEXT(255),
  "xuetong" TEXT(255),
  "shencai" TEXT(255),
  "fuse" TEXT(255),
  "lianxing" TEXT(255),
  "faxing" TEXT(255),
  "eye" TEXT(255),
  "yizhuo" TEXT(255),
  "titai" TEXT(255),
  "shentai" TEXT(255),
  "shentitezheng" TEXT(255),
  "waimaoxingrong" TEXT(255),
  "xingquxiang" TEXT(255),
  "xingge" TEXT(255),
  "xingge_event" TEXT(255),
  "grow_event" TEXT(255),
  "grow_xingge" TEXT(255),
  "grow_xingge_event" TEXT(255),
  "good" TEXT(255),
  "bad" TEXT(255),
  "koutou" TEXT(255),
  "ruanlei" TEXT(255),
  "country" TEXT(255),
  "zhongzu" TEXT(255),
  "shenfen" TEXT(255),
  "job" TEXT(255),
  "jieji" TEXT(255),
  "money" TEXT(255),
  "banlv" TEXT(255),
  "qingren" TEXT(255),
  "friend" TEXT(255),
  "sudi" TEXT(255),
  "ouxiang" TEXT(255),
  "duishou" TEXT(255),
  "zunjing" TEXT(255),
  "chouren" TEXT(255),
  "qmzm" TEXT(255),
  "dbddr" TEXT(255),
  PRIMARY KEY ("id")
);

PRAGMA foreign_keys = true;
