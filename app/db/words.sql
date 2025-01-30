/*
 Navicat Premium Dump SQL

 Source Server         : story
 Source Server Type    : SQLite
 Source Server Version : 3045000 (3.45.0)
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3045000 (3.45.0)
 File Encoding         : 65001

 Date: 07/12/2024 16:39:46
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for words
-- ----------------------------
DROP TABLE IF EXISTS "words";
CREATE TABLE "words" (
  "id" INTEGER NOT NULL,
  "word" TEXT(255),
  "type" TEXT(255),
  "mood" TEXT(255),
  "eg" TEXT(255),
  "body" TEXT(255),
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Records of words
-- ----------------------------
BEGIN;
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (1, '睨', '动', '', '睨了一眼，睥睨', '眼睛');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (2, '抿', '动', NULL, '抿唇不语', '嘴，耳朵，翅膀');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (3, '抹', '动，量', NULL, '抹眼泪，一抹夕阳', '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (4, '捏', '动', NULL, '捏紧拳头，捏了捏', '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (5, '掂', '动', NULL, '掂量', '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (6, '高呼', '说', NULL, NULL, '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (7, '提', '动', NULL, '提挈，提携', '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (8, '抱', '动', NULL, '抱着', '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (9, '满脸愁容', '形', NULL, NULL, '脸');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (10, '塞', '动', NULL, NULL, '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (11, '吩咐道', '说', NULL, NULL, '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (12, '应声', '说', NULL, NULL, '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (13, '感叹', '说', NULL, '不由得感叹', '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (14, '呐', '语气', NULL, NULL, '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (15, '闻言', '听', NULL, NULL, '耳朵');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (16, '叹气', '说', NULL, '长叹一声，叹息', '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (17, '卑微地', '形', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (18, '跪', '动', NULL, NULL, '腿');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (19, '绝美的', '外貌', NULL, '冷面绝美的', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (20, '冻', '感', NULL, '冻的通红', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (21, '踹', '动', NULL, '一脚狠踹', '脚');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (22, '暴戾狠辣', '性格', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (23, '肖想', '想', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (24, '大雪纷飞', '雪', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (25, '积雪', '雪', NULL, '雪积了三指厚', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (26, '家徒四壁', '穷', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (27, '缠绵病榻', '病', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (28, '无视', '动', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (29, '羞辱', '动', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (30, '倾', '动', NULL, '身子微倾', '身体');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (31, '倚', '动', NULL, '倚靠', '身体');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (32, '姿态慵懒', '形', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (33, '拉丝', NULL, NULL, '眸子里缠绵拉丝', '眼');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (34, '梦', NULL, NULL, '春秋大梦，白日梦个，黄粱一梦', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (35, '咬', '动', NULL, '咬着牙，咬着后牙槽，咬碎了一口牙，咬住嘴唇，咬牙不再多言，咬唇不语', '牙');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (36, '求', '动', NULL, '祈求', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (37, '笑', '说', NULL, '扬起讥讽的笑', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (38, '嫌弃', '形', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (39, '暮气沉沉', '形', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (40, '皲裂', '形', NULL, '嘴唇皲裂', '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (41, '渗', '动', NULL, '渗血', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (42, '搀扶', '动', NULL, NULL, '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (43, '扇', '动', NULL, NULL, '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (44, '摔', '动', NULL, '摔跤', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (45, '猩红的', '形', NULL, NULL, '眼');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (46, '懵逼地', '形', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (47, '拥趸', '名', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (48, '扶额', '动', '无奈', NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (49, '老妪', '名', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (50, '帷帽', '帽', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (51, '杵', '动', NULL, '杵着拐杖，一杵拐杖', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (52, '衣衫褴褛', '穷', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (53, '骨瘦如柴', '穷', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (54, '揉搓', '动', NULL, '双手揉搓着', '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (55, '蓦然', '时间', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (56, '晶亮', NULL, NULL, NULL, '眼睛');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (57, '气若游丝', '病', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (58, '喘', '动', NULL, '喘息，喘着气', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (59, '颤', NULL, NULL, '颤着手', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (60, '药石无医', '病', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (61, '感激涕零', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (62, '束脩', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (63, '眼神坚定', NULL, NULL, NULL, '眼');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (64, '翘首以盼', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (65, '一脸不耐烦', NULL, NULL, NULL, '脸');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (66, '捧', '动', NULL, '两只手捧着脸', '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (67, '脸色无波', NULL, NULL, NULL, '脸');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (68, '颠沛流离', '穷', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (69, '苦口婆心', '说', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (70, '捂', '动', NULL, '捂着脸', '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (71, '簪缨世家', '勋贵', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (72, '撇了撇嘴', NULL, '不屑', NULL, '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (73, '讳莫如深', NULL, NULL, NULL, '脸');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (74, '扯', '动词', NULL, '扯出一个笑', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (75, '阴翳', NULL, NULL, NULL, '脸');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (76, '眯', NULL, NULL, '双眼眯了眯', '眼');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (77, '嗤', NULL, NULL, '冷嗤，嗤笑，从鼻子里嗤了一声', '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (78, '喃喃', '说', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (79, '哧', '拟声', NULL, '马路过的哼哧声， 哧了一声', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (80, '嘶鸣', '动', NULL, '马儿嘶鸣一声', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (81, '刨', '动', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (82, '愠怒', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (83, '淡淡地', '看', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (84, '清雅而冰冷', '声音', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (85, '瞥', '看', NULL, NULL, '眼');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (86, '颀长白皙', '形', NULL, NULL, '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (87, '遥遥清绝', '气质', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (88, '慵懒而疏离', '气质', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (89, '温润如玉', '气质', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (90, '人间散客', '气质', NULL, '云是人间散客亦是人间难得', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (91, '人间清绝', '气质', NULL, '人间清绝沅湘路,常笑灵均作许愁，占尽人间清绝事,紫藤香起竹根炉，人间天上俱清绝', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (92, '清冷矜贵', '气质，声音', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (93, '咻', '拟声', NULL, '长剑咻的一声', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (94, '满脸豪横', NULL, NULL, NULL, '脸');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (95, '哼', '说', NULL, '冷哼一声', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (96, '佝偻', '形', NULL, NULL, '身体');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (97, '电光火石之间', '时间', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (98, '砰', '拟声', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (99, '满脸茫然', NULL, NULL, NULL, '脸');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (100, '挑眉', NULL, NULL, '挑眉诧异', '眉');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (101, '皱眉', NULL, NULL, NULL, '眉');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (102, '思忖', '想', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (103, '盯', '看', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (104, '揣', NULL, NULL, '揣好了请帖', '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (105, '嘴唇翕合', NULL, NULL, NULL, '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (106, '梨花带雨', '哭', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (107, '怒斥', '说', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (108, '瞪', '看', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (109, '吼', '说', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (110, '惊讶道', '说', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (111, '犹豫道', '说', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (112, '圭臬', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (113, '咧嘴一笑', '说', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (114, '青翠掩映', '环境', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (115, '风光旖旎', '环境', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (116, '风光绮丽', '环境', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (117, '曲折游廊', '建筑', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (118, '连天花簇好似彩霞', '环境', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (119, '踮', NULL, NULL, '踮着脚', '脚');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (120, '踌躇着', '说', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (121, '踟蹰着', '说', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (122, '心中讶然', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (123, '水榭', '建筑', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (124, '花厅', '建筑', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (125, '垂花门', '建筑', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (126, '扫', NULL, NULL, '扫了好几眼', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (127, '嚣张跋扈', '品格', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (128, '纨绔张扬', '品格', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (129, '打量', '看', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (130, '莲步上前', '走路', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (131, '腰肢轻扭', '走路', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (132, '妙曼身材', '外貌', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (133, '媚态十足', '外貌', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (134, '蹙', NULL, NULL, '眉头轻蹙，蹙眉', '眉');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (135, '泫然欲泣', '哭', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (136, '明眸善睐', NULL, NULL, NULL, '眼');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (137, '嘴巴微张', NULL, NULL, NULL, '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (138, '嘴巴闭上', NULL, NULL, NULL, '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (139, '嘴角抽了抽', NULL, NULL, NULL, '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (140, '眸含秋波', NULL, NULL, NULL, '眼');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (141, '顾盼生姿', NULL, NULL, NULL, '眼');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (142, '萦绕', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (143, '朱唇轻启', NULL, NULL, NULL, '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (144, '心神摇曳', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (145, '声音洪亮震天', '声音', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (146, '脚下生风', '走路', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (147, '唏嘘', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (148, '绞', NULL, NULL, '绞着帕子', '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (149, '声如蚊蝇', '声音', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (150, '目不斜视', '看', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (151, '噗嗤', '拟声', NULL, '噗嗤一声笑', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (152, '阴沉', NULL, NULL, NULL, '眼，脸');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (153, '嗔', '说', NULL, '嗔道', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (154, '身体一歪', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (155, '噘', NULL, NULL, '噘着嘴有些委屈', '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (156, '撅', NULL, NULL, '头一偏嘴一撅', '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (157, '啪', '拟声', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (158, '咝', '拟声，说', NULL, '咝了一声', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (159, '忿世嫉俗', '品格', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (160, '唏嘘不已', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (161, '大放厥词', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (162, '放浪形骸', '品格', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (163, '章台', NULL, NULL, '妓女聚集之地', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (164, '焦头烂额', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (165, '黯然', NULL, NULL, '面色黯然', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (166, '独自凌乱', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (167, '沉着脸', NULL, NULL, NULL, '脸');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (168, '捶', NULL, NULL, '捶捶腰', '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (169, '薄唇剑眉', '外貌', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (170, '星目如月', '外貌', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (171, '破碎感', '外貌', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (172, '征愣间', '时间', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (173, '一时哑然', '无语', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (174, '噎', '无语', NULL, '无语凝噎，语噎，一噎', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (175, '鳞次栉比', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (176, '典契', '当铺', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (177, '拢', '动', NULL, '手指拢住，越拢越紧', '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (178, '攥', '动', NULL, '攥了拳头', '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (179, '波光潋滟', '眼', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (180, '噙', '笑', '', '嘴巴噙着一抹笑', '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (181, '眸光温柔缱绻', '眼', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (182, '狭长幽深的黑眸', '眼', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (183, '淬', '动', NULL, '眼神淬毒', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (184, '一股凉意从脚底板串到天灵盖', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (185, '努了努嘴', '俏皮', NULL, NULL, '嘴');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (186, '腹诽叹息', '叹息', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (187, '啧', NULL, NULL, '啧啧惋惜，啧啧称叹', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (188, '僵着脸', NULL, NULL, NULL, '脸');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (189, '扬', NULL, NULL, '扬起笑', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (190, '点头', NULL, NULL, '笃定点头', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (191, '沉疴', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (192, '眼神晦涩', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (193, '嘴角微勾', NULL, NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (194, '高岭之花', '气质', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (195, '娇媚多姿', '外貌', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (196, '肤若凝脂', '外貌', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (197, '手指如削葱根般嫩白', NULL, NULL, NULL, '手指');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (198, '光洁如雪', '皮肤', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (199, '流转的艳艳波光', '眼神', NULL, NULL, '眼');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (200, '嗐', '拟声', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (201, '扛', NULL, NULL, '扛在了肩上', '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (202, '幞头巾', '服饰', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (203, '揽', '动', '', '一把揽住腰', '手');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (204, '铃医', '名词', NULL, '铃医乃是走方大夫，行脚大夫', NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (205, '目光灿灿', '眼神', NULL, NULL, '眼');
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (206, '司南佩', '名', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (207, '清冷绝尘', '气质', NULL, NULL, NULL);
INSERT INTO "words" ("id", "word", "type", "mood", "eg", "body") VALUES (208, '命蒂', '名', NULL, NULL, NULL);
COMMIT;

PRAGMA foreign_keys = true;
