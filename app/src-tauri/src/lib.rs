mod sqlite_db;
use crate::sqlite_db::{chapter, content, story, DbManager};
use tauri::{App, Manager};

#[tauri::command]
fn get_all_story() -> Vec<story::Story> {
    story::query()
}

#[tauri::command]
fn add_story(name: String) -> i32 {
    story::add(&name)
}

#[tauri::command]
fn upload_txt(path: String) {
    story::upload(path);
}

#[tauri::command]
fn open_txt(path: String) -> story::StoryData {
    story::open(path)
}

#[tauri::command]
fn add_chapter(name: &str, story: i32) -> i32 {
    chapter::add(name, story)
}

#[tauri::command]
fn get_all_chapter(id: i32) -> Vec<chapter::Chapter> {
    chapter::query(id)
}

#[tauri::command]
fn get_all_content(chapter: i32, story: i32) -> Vec<content::Content> {
    content::query(chapter, story)
}

#[tauri::command]
fn create_content(content: String, story: i32, chapter: i32) -> i32 {
    content::create(&content, story, chapter)
}

#[tauri::command]
fn update_content(id: String, text: String) -> usize {
    content::update(id, text)
}

#[tauri::command]
fn delete_content(id: i32) -> usize {
    content::delete(id)
}

#[tauri::command]
fn test() -> String {
    String::from("value")
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .setup(|app| {
            child_thread(app);
            Ok(())
        })
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            test,
            upload_txt,
            open_txt,
            get_all_story,
            add_story,
            add_chapter,
            get_all_chapter,
            get_all_content,
            create_content,
            update_content,
            delete_content
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn child_thread(app: &mut App) {
    // 数据库文件的相对程序路径
    let database_url = dotenv::var("DATABASE_URL").expect("DATABASE_URL must be set");
    // 转化为绝对路径
    let resolver = app.path();
    let resource_dir = &resolver.resource_dir().unwrap();
    let resolver_path = resource_dir.join(&database_url);
    DbManager::set_url(resolver_path.display().to_string());
}
