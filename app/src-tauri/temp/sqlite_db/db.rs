use rusqlite::Connection;

pub fn connect() -> Connection {
  Connection::open("../story").unwrap()
}