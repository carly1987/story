use crate::db::connect;
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::prelude::*;
use std::io::BufReader;
use std::path::Path;
use regex::Regex;

#[derive(Debug, Default, Clone, Serialize, Deserialize)]
pub struct Chapter {
    id: i32,
    story: i32,
    title: Option<String>,
    frame: Option<String>,
}

pub fn getAllChapterByStory(id: i32) -> Vec<Chapter> {
  let mut client = connect().expect("no data");
  let mut result = Vec::new();
  match client.query(
      "SELECT * FROM chapter Where story = $1 ORDER BY id asc ",
      &[&id],
  ) {
      Ok(res) => {
          for row in res {
              result.push(Chapter{
                  id: row.get("id"),
                  story: row.get("story"),
                  title: row.get("title"),
                  frame: row.get("frame"),
              });
          }
          
      },
      Err(error) => {
          // 处理错误的情况
          println!("<<<<<<<<<<<Error: getAllChapterByStory {:?}", error);
          // 可以选择在这里返回错误、退出程序或其他错误处理策略
      },
  }
  result
}

pub fn createChapter(name: &str, story: i32) -> i32 {
  let mut client = connect().expect("no data");
  let query = format!("SELECT * FROM chapter WHERE title = '{}' And story = {}", name, story);
  let mut result = 0;
  println!("createChapter sql: {:?}", query);
  match client.execute(&query, &[]) {
      Ok(res) => {
          if res >= 1 {
              result = getChapterIdByNameAndStory(name, story);
          } else {
              result = addChapter(name, story);
          }
      },
      Err(ref error) => {
          result = addChapter(name, story);
      }, 
  }
  result
}

fn getChapterIdByNameAndStory(name: &str, story: i32) -> i32 {
  let mut client = connect().expect("no data");
  let mut id = 0;
  match client.query(
      "SELECT * FROM chapter Where title = $1 And story = $2",
      &[&name, &story.to_string().as_str()],
  ){
      Ok(res) => {
          let mut i = 0;
          for row in res {
              if i == 0 {
                  id = row.get("id");
              }
              i = i + 1; 
          }
      },
      Err(error) => {
          // 处理错误的情况
          println!("<<<<<<<<<<<Error: getAllContentByChapterAndStory {:?}", error);
          // 可以选择在这里返回错误、退出程序或其他错误处理策略
      },
  }
  id
}

pub fn addChapter(name: &str, story: i32) -> i32 {
  let mut client = connect().expect("no data");
  //.to_string().as_str()
  match client.execute(
      "INSERT INTO chapter (title, story) VALUES ($1, $2)",
      &[&name, &story],
  ) {
      Ok(res) => {
          println!("<<<<<<<<<<<Ok: addChapter {:?}", res);
          if res >= 1 {
              getChapterIdByNameAndStory(name, story)
          } else {
              0
          }
      },
      Err(ref error) => {
          println!("<<<<<<<<<<<Error: addChapter {:?}", error);
          0
      },
  }
}
