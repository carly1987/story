/*
 Navicat Premium Dump SQL

 Source Server         : storyDB
 Source Server Type    : SQLite
 Source Server Version : 3045000 (3.45.0)
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3045000 (3.45.0)
 File Encoding         : 65001

 Date: 08/12/2024 15:58:28
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for story
-- ----------------------------
DROP TABLE IF EXISTS "story";
CREATE TABLE "story" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" TEXT(255),
  "category" TEXT(255),
  "tone" TEXT(255),
  "intro" TEXT(255),
  "plot" TEXT(255),
  "cause" TEXT(255),
  "develop" TEXT(255),
  "turn" TEXT(255),
  "result" TEXT(255),
  "side" TEXT(255),
  "high" TEXT(255)
);

-- ----------------------------
-- Records of story
-- ----------------------------
BEGIN;
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (389, '癫，都癫，癫点好啊', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (390, '谁让他修仙的', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (391, '被我始乱终弃的将军回朝了', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (392, '史上第一混乱', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (393, '8.红楼梦-曹雪芹', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (394, '宠妾灭妻？这侯门主母我不当了', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (512, '修仙界第一留守儿童', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (513, '三寸人间', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (514, '衰神小王爷的福运团宠妻', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (515, '桃花马上请长缨', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (516, '饥荒年，我囤货娇养了古代大将军', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (517, '造作时光', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (518, ' 苏信赵凌', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (519, '疯癫公主：噶，都给噶了', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (523, '黑莲花攻略手册', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (525, '满门反派', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (526, '家佛请进门', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO "story" ("id", "name", "category", "tone", "intro", "plot", "cause", "develop", "turn", "result", "side", "high") VALUES (527, '云鬓楚腰', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Auto increment value for story
-- ----------------------------
UPDATE "main"."sqlite_sequence" SET seq = 527 WHERE name = 'story';

PRAGMA foreign_keys = true;
