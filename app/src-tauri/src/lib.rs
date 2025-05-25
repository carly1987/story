mod sqlite_db;
mod local;
mod server;
mod proxy;
use tauri::{App, Manager,TitleBarStyle, WebviewUrl, WebviewWindowBuilder};

#[tauri::command]
fn read_text(path:String) -> local::StoryData {
    local::read_txt(path)
}

#[tauri::command]
fn read_json(path: String) -> String {
    match local::read_json_as_string(path) {
        Ok(data) => data,
        Err(err) => {
            eprintln!("读取 JSON 文件失败: {}", err);
            "err".to_string()
        }
    }
}

#[tauri::command]
fn local_library(path:String) -> Vec<String> {
    local::library(path)
}

#[tauri::command]
fn start_server() {
    server::start();
}

#[tauri::command]
fn start_proxy(source: String) {
    proxy::startProxy(source);
}

#[tauri::command]
async fn get_text_from_selector(selector: String, url: String) -> String {
    proxy::get_inner_html(selector, url).await
}

#[tauri::command]
async fn get_chapter_list(selector: String, url: String) -> Vec<String> {
    proxy::get_chapter_list(selector, url).await
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            start_server,
            start_proxy,
            local_library,
            get_text_from_selector,
            get_chapter_list,
            read_json,
            read_text,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}