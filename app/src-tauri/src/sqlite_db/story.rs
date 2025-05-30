use crate::sqlite_db::chapter;
use crate::sqlite_db::content;
use crate::sqlite_db::DbManager;
use regex::Regex;
use rusqlite::Row;
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::prelude::*;
use std::io::BufReader;
use std::path::Path;

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

#[derive(Debug, Default, Clone, Serialize, Deserialize)]
pub struct StoryData {
    name: String,
    chapter_list: Vec<chapter::Chapter>,
    content_list: Vec<content::Content>,
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
    let client = DbManager::get_connection();

    let mut result: i32 = 0;
    match client.execute("SELECT name FROM story WHERE name = ?1", &[&name]) {
        Ok(res) => {
            if res > 0 {
                result = get(name).id;
            } else {
                result = add(name);
            }
        }
        Err(_) => {
            result = add(name);
        }
    }
    result
}

pub fn query() -> Vec<Story> {
    let client = DbManager::get_connection();
    println!("get_url: {:?}", DbManager::get_url());
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
    let client = DbManager::get_connection();
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
    let client = DbManager::get_connection();
    let mut stmt = client
        .prepare("SELECT * FROM story Where name = ?1")
        .unwrap();
    match stmt.query_row([&name], |row| Ok(reduce(row))) {
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
        },
    }
}

pub fn upload(path: String) {
    let file = Path::new(&path);
    let file_name = file.file_stem().unwrap().to_str().unwrap();
    let story = create_story(file_name);
    let f = File::open(path).unwrap();
    let reader = BufReader::new(f);
    let mut chapterId = 0;
    for line in reader.lines() {
        let line = line.unwrap();
        let re = Regex::new(r"^第.*章").unwrap();
        if re.is_match(&line) {
            chapterId = chapter::create(&line, story);
        } else {
            if line.is_empty() {
            } else {
                content::create(&line, story, chapterId);
            }
        }
    }
}

pub fn open(path: String) -> StoryData {
    let file = Path::new(&path);
    let file_name = file.file_stem().unwrap().to_str().unwrap();
    let f = File::open(&path).unwrap();
    let reader = BufReader::new(f);
    let mut chapter_list: Vec<chapter::Chapter> = Vec::new();
    let mut chapter_index = 0;
    let mut content_list: Vec<content::Content> = Vec::new();
    let mut content_index = 0;
    for line in reader.lines() {
        let line = line.unwrap();
        let re = Regex::new(r"^第.*章").unwrap();
        if re.is_match(&line) {
            chapter_list.push({
                chapter::Chapter {
                    id: chapter_index,
                    story: 0,
                    label: Some(line),
                    frame: Some(String::new()),
                }
            });
            chapter_index += 1;
        } else {
            if line.is_empty() {
            } else {
                content_list.push({
                    content::Content {
                        id: content_index,
                        story: Some(0),
                        chapter: Some(chapter_index),
                        text: Some(line),
                        note: Some(String::new()),
                        stage: Some(String::new()),
                    }
                });
                content_index += 1;
            }
        }
    }
    {
        StoryData {
            name: file_name.to_owned(),
            chapter_list,
            content_list,
        }
    }
}
