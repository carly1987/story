use warp::Filter;
use std::thread;

#[tauri::command]
pub fn start() {
    println!("start server");

    // 在一个新线程中启动 Web 服务
    thread::spawn(|| {
        let hello = warp::path::end()
            .map(|| "Hello, World!");

        // 启动 Web 服务
        tokio::runtime::Runtime::new()
            .unwrap()
            .block_on(async {
                warp::serve(hello)
                    .run(([127, 0, 0, 1], 3030))
                    .await;
            });
    });
}