use crate::sqlite_db::DbManager;
use rusqlite::Row;
use serde::{Deserialize, Serialize};

#[derive(Debug, Default, Clone, Serialize, Deserialize)]
pub struct Content {
    pub id: i32,
    pub story: Option<i32>,
    pub chapter: Option<i32>,
    pub text: Option<String>,
    pub note: Option<String>,
    pub stage: Option<String>,
}

fn reduce(row: &Row) -> Content {
    Content {
        id: row.get("id").unwrap(),
        story: row.get("story").unwrap(),
        chapter: row.get("chapter").unwrap(),
        text: row.get("text").unwrap(),
        note: row.get("note").unwrap(),
        stage: row.get("stage").unwrap(),
    }
}

pub fn create(text: &str, story: i32, chapter: i32) -> i32 {
    let client = DbManager::get_connection();
    let mut result = 0;
    match client.execute(
        "INSERT INTO contents (text, story, chapter) VALUES (?1, ?2, ?3)",
        [
            text,
            &story.to_string().as_str(),
            &chapter.to_string().as_str(),
        ],
    ) {
        Ok(_) => {
            result = get(text).id;
        }
        Err(ref error) => {
            println!("<<<<<<<<<<<Error: createContent {:?}", error);
        }
    }
    result
}

fn get(text: &str) -> Content {
    let client = DbManager::get_connection();
    let mut stmt = client
        .prepare("SELECT * FROM contents WHERE text = '?1'")
        .unwrap();
    match stmt.query_row([text], |row| Ok(reduce(row))) {
        Ok(res) => res,
        Err(_) => Content {
            id: 0,
            story: Some(0),
            chapter: Some(0),
            text: Some(("").to_string()),
            note: Some(("").to_string()),
            stage: Some(("").to_string()),
        },
    }
}

pub fn update(id: String, text: String) -> usize {
    let client = DbManager::get_connection();
    let mut result = 0;
    match client.execute("UPDATE contents SET text = ?1 WHERE id = ?2", (text, id)) {
        Ok(res) => {
            result = res;
            println!("<<<<<<<<<<<success: updateContent {:?}", res);
        }
        Err(_) => {
            println!("<<<<<<<<<<<Error: updateContent");
        }
    }
    println!("<<<<<<<<<<<updateContent  result {:?}", result);
    result
}

pub fn delete(id: i32) -> usize {
    let client = DbManager::get_connection();
    let mut result = 0;
    match client.execute("DELETE FROM contents WHERE id = ?1", &[&id]) {
        Ok(res) => {
            result = res;
        }
        Err(error) => {
            // 处理错误的情况
            println!("<<<<<<<<<<<Error: deleteContent id: {} , {:?}", id, error);
            // 可以选择在这里返回错误、退出程序或其他错误处理策略
        }
    }
    result
}

pub fn query(chapter: i32, story: i32) -> Vec<Content> {
    let client = DbManager::get_connection();
    let mut stmt = client
        .prepare("SELECT * FROM contents Where story = ?1 And chapter = ?2 ORDER BY id asc")
        .unwrap();
    let mut rows = stmt.query([story, chapter]).unwrap();
    let mut list: Vec<Content> = Vec::new();
    while let Some(row) = rows.next().unwrap() {
        list.push(reduce(row));
    }
    list
}
