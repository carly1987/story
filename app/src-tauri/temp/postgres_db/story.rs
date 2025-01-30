use crate::db::connect;
use crate::chapter;
use crate::content;
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::prelude::*;
use std::io::BufReader;
use std::path::Path;
use regex::Regex;

#[derive(Debug, Default, Clone, Serialize, Deserialize)]
pub struct Story {
    id: i32,
    name: String,
    category: Option<String>,
    tone: Option<String>,
    intro: Option<String>,
    plot: Option<String>,
    side: Option<String>,
    cause: Option<String>,
    develop: Option<String>,
    turn: Option<String>,
    high: Option<String>,
    result: Option<String>,
}


pub fn addStory(name: &str) -> i32 {
  let mut client = connect().expect("no data");
  match client.execute(
      "INSERT INTO story (name) VALUES ($1)",
      &[&name],
  ) {
      Ok(res) => {
          if res >= 1 {
              getStoryIdByName(name)
          } else {
              0
          }
      },
      Err(ref error) => {
          0
      },
  }
}

fn getStoryIdByName(name: &str) -> i32 {
  let mut client = connect().expect("no data");
  let mut id = 0;
  match client.query(
      "SELECT * FROM story Where name = $1",
      &[&name],
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

fn createStory(name: &str) -> i32 {
  let mut client = connect().expect("no data");
  let query = format!("SELECT name FROM story WHERE name = '{}'", name);
  let mut result = 0;
  match client.execute(&query, &[]) {
      Ok(res) => {
          if res > 0 {
              result = getStoryIdByName(name);
          } else {
              result = addStory(name);
          }
      },
      Err(ref error) => {
          result = addStory(name);
      }, 
  }
  result
}

pub fn getAllStory() -> Vec<Story> {
    let mut client = connect().expect("no data");
    let mut result = Vec::new();
    match client.query(
        "SELECT * FROM story ORDER BY id DESC",
        &[],
    ) {
        Ok(res) => {
            for row in res {
                result.push(Story{
                    id: row.get("id"),
                    name: row.get("name"),
                    category: row.get("category"),
                    tone: row.get("tone"),
                    intro: row.get("intro"),
                    plot: row.get("plot"),
                    side: row.get("side"),
                    cause: row.get("cause"),
                    develop: row.get("develop"),
                    turn: row.get("turn"),
                    high: row.get("high"),
                    result: row.get("result"),
                });
            }
            
        },
        Err(error) => {
            // 处理错误的情况
            println!("<<<<<<<<<<<Error: getAllStory {:?}", error);
            // 可以选择在这里返回错误、退出程序或其他错误处理策略
        },
    }
    result
}

pub fn uploadTxt(path: String) {
    let file = Path::new(&path);
    let file_name = file.file_stem().unwrap().to_str().unwrap();
    let story = createStory(file_name);
    let f = File::open(path).unwrap();
    let reader = BufReader::new(f);
    let mut chapter = 0;
    for line in reader.lines() {
        let line = line.unwrap();
        let re = Regex::new(r"^第.*章").unwrap();
        if re.is_match(&line) {
            chapter = chapter::createChapter(&line, story);
        } else {
            if line.is_empty() {

            } else {
                content::createContent(&line, story, chapter);
            }
        }
        
    }
}