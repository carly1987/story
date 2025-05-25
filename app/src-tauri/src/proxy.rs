use warp::Filter;
use reqwest::Client;
use std::sync::Arc;
use std::thread;
use scraper::{Html, Selector};
use serde::Serialize;

// 定义查询参数结构体
#[derive(serde::Deserialize)]
struct ProxyQuery {
    url: String,
}


pub fn startProxy(source: String) {
    println!("start server");

    // 在一个新线程中启动 Web 服务
    thread::spawn(|| {
        // 创建 reqwest 客户端，并用 Arc 包装
        let client = Arc::new(Client::new());

        // 用 Arc 包装 source
        let source = Arc::new(source);

        // 定义代理路由
        let proxy = warp::path!("proxy")
            .and(warp::query::<ProxyQuery>()) // 提取查询参数
            .and_then({
                let client = Arc::clone(&client); // 克隆 Arc
                let source = Arc::clone(&source); // 克隆 Arc
                move |query: ProxyQuery| {
                    let client = Arc::clone(&client); // 再次克隆 Arc
                    let source = Arc::clone(&source); // 再次克隆 Arc
                    async move {
                        // 发起请求到目标 URL
                        let response = client.get(&query.url).send().await;
                        match response {
                            Ok(res) => {
                                // 将目标 URL 的响应内容返回给客户端
                                let body = res.text().await.unwrap_or_else(|_| "Failed to read response body".to_string());
                                let proxy_url = "http://127.0.0.1:3030/proxy"; // 代理服务器的地址
                                let fixed_body = fix_links(&body, &source, proxy_url);
                                
                                Ok::<_, warp::Rejection>(warp::reply::html(fixed_body))
                            }
                            Err(_) => {
                                // 如果请求失败，返回错误信息
                                Ok(warp::reply::html("Failed to fetch the target URL".to_string()))
                            }
                        }
                    }
                }
            });

        // 启动 Web 服务
        tokio::runtime::Runtime::new()
            .unwrap()
            .block_on(async {
                warp::serve(proxy)
                    .run(([127, 0, 0, 1], 3030))
                    .await;
            })
    });
}


fn fix_links(html: &str, base_url: &str, proxy_url: &str) -> String {
    let document = Html::parse_document(html);
    let selector = Selector::parse("a").unwrap();

    let mut fixed_html = html.to_string();
    for element in document.select(&selector) {
        if let Some(href) = element.value().attr("href") {
            // 将相对路径转换为绝对路径
            let absolute_url = if href.starts_with("http") {
                href.to_string() // 已经是绝对路径
            } else {
                format!("{}{}", base_url, href) // 拼接为绝对路径
            };
            // 将链接指向代理服务器
            let proxy_link = format!("{}?url={}", proxy_url, absolute_url);
            // 只替换当前 <a> 标签的 href 属性
            let old_href = format!(r#"href="{}""#, href);
            let new_href = format!(r#"href="{}""#, proxy_link);
            fixed_html = fixed_html.replace(&old_href, &new_href);

        }
    }
    println!("Fixed HTML: {}", fixed_html);
    fixed_html
}

fn extract_dom_text(html: &str, selector: &str) -> String {
    let document = Html::parse_document(html);
    let selector = Selector::parse(selector).unwrap();

    let mut extracted_text = String::new();
    for element in document.select(&selector) {
        extracted_text.push_str(&element.text().collect::<String>());
        extracted_text.push('\n'); // 添加换行符
    }

    extracted_text
}


fn extract_dom_href(html: &str, selector: &str) -> Vec<String> {
    let document = Html::parse_document(html);
    let selector = Selector::parse(selector).unwrap();

    let mut extracted_hrefs = Vec::new(); // 使用 Vec<String> 存储结果
    for element in document.select(&selector) {
        if let Some(href) = element.attr("href") {
            extracted_hrefs.push(href.to_string()); // 将 href 转换为 String 并推入数组
        }
    }

    extracted_hrefs
}

pub async fn get_inner_html(selector: String, url: String) -> String {
    // 创建 reqwest 客户端
    let client = Client::new();

    // 发送 HTTP 请求
    let response = client.get(&url).send().await;

    // 处理响应
    match response {
        Ok(res) => {
            // 检查请求是否成功
            if res.status().is_success() {
                // 获取响应体的 HTML 内容
                let body = res.text().await.unwrap_or_else(|_| "".to_string());

                println!("提取指定选择器的文本内容: {}", url);
                extract_dom_text(&body, &selector)
            } else {
                // 如果请求失败，返回空字符串
                println!("如果请求失败，返回空字符串 0: {}", url);
                "no".to_string()
            }
        }
        Err(_) => {
            // 如果请求失败，返回空字符串
            println!("如果请求失败，返回空字符串 1: {}", url);
            "err".to_string()
        }
    }
}

pub async fn get_chapter_list(selector: String, url: String) -> Vec<String> {
// 创建 reqwest 客户端
let client = Client::new();

// 发送 HTTP 请求
let response = client.get(&url).send().await;

// 处理响应
match response {
    Ok(res) => {
        // 检查请求是否成功
        if res.status().is_success() {
            // 获取响应体的 HTML 内容
            let body = res.text().await.unwrap_or_else(|_| "".to_string());

            
            extract_dom_href(&body, &selector)
        } else {
            // 如果请求失败，返回空字符串
            Vec::new()
        }
    }
    Err(_) => {
        // 如果请求失败，返回空字符串
        println!("如果请求失败，返回空字符串 1: {}", url);
        Vec::new()
    }
}
}