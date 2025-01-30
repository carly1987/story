
use std::sync::Mutex;

use diesel::{r2d2::{ConnectionManager, Pool}, SqliteConnection};
use lazy_static::lazy_static;

pub mod my_friend_service;
pub mod my_friend_entity;

/**
 * @author Lortar
 * @date 2024-12-04
 * @desc 简单的数据连接池管理
 */
pub struct DbManager{
    db_url: String
}
lazy_static! {
    static ref INSTANCE: Mutex<DbManager> = Mutex::new(DbManager{
        db_url: String::from("")
    });
}
impl DbManager{
    pub fn set_url(url: String){
        let mut instance = INSTANCE.lock().unwrap();
        instance.db_url = url;
    }
    pub fn get_url() -> String{
        let instance = INSTANCE.lock().unwrap();
        instance.db_url.clone()
    }
    pub fn get_connection_pool() -> Pool<ConnectionManager<SqliteConnection>>{
        let instance = INSTANCE.lock().unwrap();
        let database_url = instance.db_url.clone();

        let manager = ConnectionManager::<SqliteConnection>::new(database_url);
        Pool::builder()
            .test_on_check_out(true)
            .build(manager)
            .expect("无法创建数据库连接池")
    }
}