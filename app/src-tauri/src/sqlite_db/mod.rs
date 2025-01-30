pub mod chapter;
pub mod content;
pub mod story;
use lazy_static::lazy_static;
use rusqlite::Connection;
use std::sync::Mutex;

pub struct DbManager {
    db_url: String,
}
lazy_static! {
    static ref INSTANCE: Mutex<DbManager> = Mutex::new(DbManager {
        db_url: String::from("")
    });
}
impl DbManager {
    pub fn set_url(url: String) {
        let mut instance = INSTANCE.lock().unwrap();
        instance.db_url = url;
    }
    pub fn get_url() -> String {
        let instance = INSTANCE.lock().unwrap();
        instance.db_url.clone()
    }
    pub fn get_connection() -> Connection {
        let instance = INSTANCE.lock().unwrap();
        let database_url = instance.db_url.clone();
        Connection::open(database_url).expect("db miss")
    }
}
