use crate::db::connect;
use serde::{Deserialize, Serialize};
use serde_json::{Value};
use std::fs::File;
use std::io::prelude::*;
use std::io::BufReader;
use std::path::Path;
use regex::Regex;


#[derive(Debug, Default, Clone, Serialize, Deserialize)]
pub struct Content {
    id: i32,
    story: i32,
    chapter: i32,
    text: String,
    note: Option<String>,
    stage: Option<Value>,
}

pub fn createContent(name: &str, story: i32, chapter: i32) -> i32 {
  let mut client = connect().expect("no data");
  let mut id = 0;
  match client.execute(
      "INSERT INTO contents (text, story, chapter) VALUES ($1, $2, $3)",
      &[&name, &story, &chapter],
  ) {
      Ok(res) => {
          println!("<<<<<<<<<<<Ok: createContent {:?}", res);
          id = getContentByText(name);
      },
      Err(ref error) => {
          println!("<<<<<<<<<<<Error: createContent {:?}", error);
      },
  }
  id
}

fn getContentByText(text: &str) -> i32 {
    let mut client = connect().expect("no data");
    let query = format!("SELECT * FROM contents WHERE text = '{}'", text);
    let list = client.query(&query, &[]).unwrap();
    let mut id = 0;
    for row in list {
        id = row.get("id");
        println!("<<<<getContentByText: {}", &id);
    }
    id
}

pub fn updateContent(id: String, text: String) {
    let idInt: i32 = id.parse().unwrap();
    let mut client = connect().expect("no data");
    let query = format!("UPDATE contents SET text = '{}' WHERE id = {}", text, id);
    println!("updateContent {}", &query);
    match client.execute(&query, &[]) {
        Ok(res) => {
            // 处理错误的情况
            println!("<<<<<<<<<<<Success: updateContent {:?}", res);
            // 可以选择在这里返回错误、退出程序或其他错误处理策略
        },
        Err(error) => {
            // 处理错误的情况
            println!("<<<<<<<<<<<Error: updateContent id: {} , {:?}", idInt, error);
            // 可以选择在这里返回错误、退出程序或其他错误处理策略
        },
    }
}

pub fn deleteContent(id: i32) {
    let mut client = connect().expect("no data");
    let query = format!("DELETE FROM contents WHERE id = {}", id);
    println!("deleteContent {}", &query);
    match client.execute(&query, &[]) {
        Ok(res) => {
            // 处理错误的情况
            println!("<<<<<<<<<<<Success: deleteContent {:?}", res);
            // 可以选择在这里返回错误、退出程序或其他错误处理策略
        },
        Err(error) => {
            // 处理错误的情况
            println!("<<<<<<<<<<<Error: deleteContent id: {} , {:?}", id, error);
            // 可以选择在这里返回错误、退出程序或其他错误处理策略
        },
    }
}

pub fn getAllContentByChapterAndStory(chapter: i32, story: i32) -> Vec<Content> {
  let mut client = connect().expect("no data");
  let mut result = Vec::new();
  match client.query(
      "SELECT * FROM contents Where story = $1 And chapter = $2 ORDER BY id asc",
      &[&story, &chapter],
  ) {
      Ok(res) => {
          for row in res {
              result.push(Content{
                  id: row.get("id"),
                  story: row.get("story"),
                  chapter: row.get("chapter"),
                  text: row.get("text"),
                  note: row.get("note"),
                  stage: Some(row.get("stage")).unwrap(),
              });
          }
          
      },
      Err(error) => {
          // 处理错误的情况
          println!("<<<<<<<<<<<Error: getAllContentByChapterAndStory {:?}", error);
          // 可以选择在这里返回错误、退出程序或其他错误处理策略
      },
  }
  result
}

pub fn updateContentChapter(line: i32, chapter: i32) {
  //"select * from content WHERE chapter = 0 AND text ~* '^第.*章' ORDER BY id ASC",
  let mut client = connect().expect("no data");
  match client.query(
      "select * from content WHERE chapter = 0 AND text ~* '本章未完 点击下一页继续阅读' ORDER BY id ASC",
      &[],
  ) {
      Ok(res) => {
          let mut i = 0;
          let mut lastLine = line;
          let lastChapter = chapter;
          for row in res {
              let id = row.get("id");
              let sql = format!("UPDATE content SET chapter = {} WHERE id BETWEEN {} AND {};", lastChapter + i + 1, lastLine + 1, id);
              println!("<<<<<<<updateContentChapter sql: {:?}", &sql);
              client.execute(&sql, &[]);
              i += 1;
              lastLine = id;
          }
          println!("<<<<<<<<<<<Ok: updateContentChapter");
      },
      Err(error) => {
          // 处理错误的情况
          println!("<<<<<<<<<<<Error: updateContentChapter {:?}", error);
          // 可以选择在这里返回错误、退出程序或其他错误处理策略
      },
  };


}