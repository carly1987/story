
use postgres::{Client, NoTls};


pub fn connect() -> Result<Client, postgres::Error> {
    let mut client = Client::connect(
        "host=127.0.0.1 port=5432 user=xy password=xiayun dbname=story",
        NoTls,
    );
    match client {
        Ok(_) => {
            println!("<<<<<<<<<<Success: client");
        }
        Err(ref error) => {
            println!("<<<<<<<<<<<Error: client {:?}", error);
        }
    }
    client
}