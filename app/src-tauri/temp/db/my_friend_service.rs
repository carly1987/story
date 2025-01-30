use diesel::{QueryDsl, RunQueryDsl::{self}};

use crate::schema::my_friend;

use super::{my_friend_entity::MyFriendEntity, DbManager};


pub fn list() -> Result<Vec<MyFriendEntity>, String>{
    let pool = DbManager::get_connection_pool().clone();
    let conn = &mut pool.get().unwrap();
    let query = my_friend::table
        .select(my_friend::all_columns)
        .load::<MyFriendEntity>(conn);
    match query {
        Ok(result) => {
            Ok(result)
        },
        Err(_) => {
            Err(String::from("查询失败"))
        }
    }
}