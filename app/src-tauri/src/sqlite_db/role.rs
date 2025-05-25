use crate::sqlite_db::DbManager;
use rusqlite::Row;
use serde::{Deserialize, Serialize};

#[derive(Debug, Default, Clone, Serialize, Deserialize)]
pub struct Role {
    id: i32,
    name: Option<String>,
    frame: Option<String>,
}

fn reduce(row: &Row) -> Chapter {
    Chapter {
        id: row.get("id").unwrap(),
        story: row.get("story").unwrap(),
        title: row.get("title").unwrap(),
        frame: row.get("frame").unwrap(),
    }
}

pub fn query(id: i32) -> Vec<Chapter> {
    let client = DbManager::get_connection();
    let mut stmt = client.prepare("SELECT * FROM chapter Where story = ?1 ORDER BY id asc").unwrap();
    let mut rows = stmt.query([id]).unwrap();
    let mut list: Vec<Chapter> = Vec::new();
    while let Some(row) = rows.next().unwrap() {
      list.push(reduce(row));
    }
    list
}

pub fn create(name: &str, story: i32) -> i32 {
    let client = DbManager::get_connection();
    let mut result = 0;
    match client.execute("SELECT * FROM chapter WHERE title = '?1' And story = ?2",&[&name, &story.to_string().as_str()],
    ) {
        Ok(res) => {
            if res >= 1 {
                result = get(&name, story).id;
            } else {
                result = add(&name, story);
            }
        }
        Err(_) => {
            result = add(&name, story);
        }
    }
    result
}

fn get(name: &str, story: i32) -> Chapter {
    let client = DbManager::get_connection();
    let mut stmt = client
        .prepare("SELECT * FROM chapter Where title = ?1 And story = ?2")
        .unwrap();
    match stmt.query_row([&name, &story.to_string().as_str()], |row| Ok(reduce(row))) {
        Ok(res) => res,
        Err(_) => Chapter {
            id: 0,
            story: 0,
            title: Some(("").to_string()),
            frame: Some(("").to_string()),
        },
    }
}

pub fn add(name: &str, story: i32) -> i32 {
    let client = DbManager::get_connection();
    //.to_string().as_str()
    match client.execute(
        "INSERT INTO chapter (title, story) VALUES (?1, ?2)",
        &[&name, &story.to_string().as_str()],
    ) {
        Ok(res) => {
            println!("<<<<<<<<<<<Ok: addChapter {:?}", res);
            if res >= 1 {
                get(name, story).id
            } else {
                0
            }
        }
        Err(ref error) => {
            println!("<<<<<<<<<<<Error: addChapter {:?}", error);
            0
        }
    }
}
