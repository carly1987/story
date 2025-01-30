use crate::sqlite_db::db::connect;
use crate::sqlite_db::chapter;
use crate::sqlite_db::content;
use rusqlite::Row;
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

fn reduce(row: &Row) -> Story {
  Story {
    id: row.get("id").unwrap(),
    name: row.get("name").unwrap(),
    category: row.get("category").unwrap(),
    tone: row.get("tone").unwrap(),
    intro: row.get("intro").unwrap(),
    plot: row.get("plot").unwrap(),
    side: row.get("side").unwrap(),
    cause: row.get("cause").unwrap(),
    develop: row.get("develop").unwrap(),
    turn: row.get("turn").unwrap(),
    high: row.get("high").unwrap(),
    result: row.get("result").unwrap(),
  }
}

fn create_story(name: &str) -> i32 {
  let client = connect();
  let mut result: i32 = 0;
  match client.execute("SELECT name FROM story WHERE name = ?1", &[&name]) {
      Ok(res) => {
          if res > 0 {
              result = get(name).id;
          } else {
              result = add(name);
          }
      },
      Err(_) => {
          result = add(name);
      }, 
  }
  result
}

pub fn query() -> Vec<Story> {
    let client = connect();
    let mut stmt = client
        .prepare("SELECT * FROM story ORDER BY id DESC")
        .unwrap();
    let mut rows = stmt.query([]).unwrap();
    let mut list: Vec<Story> = Vec::new();
    while let Some(row) = rows.next().unwrap() {
      list.push(reduce(row));
    }
    list
}

pub fn add(name: &str) -> i32 {
    let client = connect();
    match client.execute("INSERT INTO story (name) VALUES ($1)", &[&name]) {
        Ok(res) => {
            if res >= 1 {
              get(&name).id
            } else {
                0
            }
        }
        Err(_) => 0,
    }
}

fn get(name: &str) -> Story {
  let client = connect();
  let mut stmt = client
        .prepare("SELECT * FROM story Where name = ?1")
        .unwrap();
  match stmt.query_row([&name], |row| {
    Ok(reduce(row))
  }) {
    Ok(story) => story,
    Err(_) => Story {
      id: 0,
      name: (&name).to_string(),
      category: todo!(),
      tone: todo!(),
      intro: todo!(),
      plot: todo!(),
      side: todo!(),
      cause: todo!(),
      develop: todo!(),
      turn: todo!(),
      high: todo!(),
      result: todo!(),
    }
  }
}

pub fn upload(path: String) {
  let file = Path::new(&path);
  let file_name = file.file_stem().unwrap().to_str().unwrap();
  let story = create_story(file_name);
  let f = File::open(path).unwrap();
  let reader = BufReader::new(f);
  let mut chapter = 0;
  for line in reader.lines() {
      let line = line.unwrap();
      let re = Regex::new(r"^第.*章").unwrap();
      if re.is_match(&line) {
          chapter = chapter::create(&line, story);
      } else {
          if line.is_empty() {

          } else {
              content::create(&line, story, chapter);
          }
      }
      
  }
}

