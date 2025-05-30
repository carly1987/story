use crate::sqlite_db::chapter;
use crate::sqlite_db::content;
use crate::sqlite_db::story;
use crate::sqlite_db::DbManager;
use regex::Regex;
use serde::de::DeserializeOwned;
use serde::{Deserialize, Serialize};
use std::fs;
use std::io::prelude::*;
use std::io::BufReader;
use std::io::Read;
use std::path::Path;
use std::io;

#[derive(Debug, Default, Clone, Serialize, Deserialize)]
pub struct StoryData {
    name: String,
    chapter_list: Vec<chapter::Chapter>,
    content_list: Vec<content::Content>,
}

fn read_json<T: DeserializeOwned>(file_path: String) -> Result<T, String> {
    // 打开文件
    let mut file = match fs::File::open(file_path) {
        Ok(file) => file,
        Err(e) => return Err(format!("无法打开文件: {}", e)),
    };

    // 读取文件内容到字符串
    let mut contents = String::new();
    if file.read_to_string(&mut contents).is_err() {
        return Err("无法读取文件内容".to_string());
    }

    // 解析 JSON 数据为结构体
    match serde_json::from_str(&contents) {
        Ok(person) => Ok(person),
        Err(e) => Err(format!("解析 JSON 文件失败: {}", e)),
    }
}

pub fn read_txt(path: String) -> StoryData {
    let file = Path::new(&path);
    let file_name = file.file_stem().unwrap().to_str().unwrap();
    let f = fs::File::open(&path).unwrap();
    let reader = BufReader::new(f);
    let mut chapter_list: Vec<chapter::Chapter> = Vec::new();
    let mut chapter_index = 0;
    let mut content_list: Vec<content::Content> = Vec::new();
    let mut content_index = 0;
    for line in reader.lines() {
        let line = line.unwrap();
        let re = Regex::new(r"^第.*章").unwrap();
        println!("文本 {:?}", re.is_match(&line));
        if re.is_match(&line) {
            chapter_index += 1;
            chapter_list.push({
                chapter::Chapter {
                    id: chapter_index,
                    story: 0,
                    label: Some(line),
                    frame: Some(String::new()),
                }
            });
            
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

pub fn export(path: String) -> StoryData {
    read_txt(path)
}

pub fn library(path: String) -> Vec<String> {
    let mut list: Vec<String> = Vec::new();
    match fs::read_dir(path) {
        Ok(entries) => {
            for entry in entries {
                match entry {
                    Ok(entry) => {
                        let path = entry.path();
                        if path.is_dir() {
                            list.push(path.to_string_lossy().into_owned());
                        }
                    }
                    Err(e) => println!("读取条目失败: {}", e),
                }
            }
        }
        Err(e) => println!("读取本地书库失败: {}", e),
    }
    list
}

pub fn read_json_as_string(file_path: String) -> Result<String, io::Error> {
    let contents = fs::read_to_string(file_path)?;
    Ok(contents)
}
