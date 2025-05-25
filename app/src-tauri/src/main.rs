// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    // 判断是dev还是prod，加载对应的配置
    if cfg!(debug_assertions) {
        dotenv::from_filename(".env").unwrap().load();
    } else {
        let prod_env = include_str!("../.env.production");
        let result = dotenv::from_read(prod_env.as_bytes()).unwrap();
        result.load();
    }
    story_lib::run()
}
