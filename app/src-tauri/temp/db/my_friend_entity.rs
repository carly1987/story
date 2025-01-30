use diesel::{ Identifiable, Insertable, Queryable, Selectable};
use serde::{Deserialize, Serialize};

use crate::schema::my_friend;

#[derive(Insertable,Queryable, Selectable,Identifiable, Debug, PartialEq,Clone,Serialize,Deserialize)]
#[diesel(table_name = my_friend)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
#[serde(rename_all = "camelCase")]
pub struct MyFriendEntity{
    pub id: String,
    pub name: String,
    pub role_name: Option<String>
}