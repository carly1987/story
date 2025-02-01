
use tauri::{App, Manager};


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
