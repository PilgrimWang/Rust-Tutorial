export interface TutorialSection {
  id: string;
  title: string;
  description: string;
  content: TutorialContent[];
}

export interface TutorialContent {
  id: string;
  title: string;
  explanation: string;
  language?: string;
  code?: string;
  output?: string;
  tips?: string[];
  warnings?: string[];
}

export const rustTutorialData: TutorialSection[] = [
  {
    id: "intro",
    title: "Rust 简介",
    description: "了解Rust语言的特点、优势以及安装方法",
    content: [
      {
        id: "what-is-rust",
        title: "什么是 Rust？",
        explanation: `Rust 是一门系统级编程语言，由 Mozilla 研究院开发，于 2015 年发布 1.0 版本。它的设计目标是提供内存安全、并发安全和高级抽象，同时保持与 C/C++ 相当的性能。

Rust 的核心特点包括：
• **内存安全**：通过所有权系统在编译时防止内存错误
• **零成本抽象**：高级特性不带来运行时开销
• **并发安全**：编译时检测数据竞争
• **无垃圾回收**：手动内存管理，但安全可靠
• **跨平台**：支持 Windows、macOS、Linux 等多种平台`,
        code: `// Rust 示例：安全的内存管理
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // 所有权转移
    
    // println!("{}", s1); // 错误！s1 已不再有效
    println!("{}", s2); // 正确输出: hello
}`,
        output: `hello`,
        tips: [
          "Rust 连续多年被 Stack Overflow 评为最受开发者喜爱的语言",
          "Rust 被用于开发 Firefox 浏览器的渲染引擎 Servo",
          "许多大型科技公司（如 Google、Microsoft、Amazon）都在使用 Rust"
        ]
      },
      {
        id: "installation",
        title: "安装 Rust",
        explanation: `Rust 使用 rustup 工具链管理器进行安装。rustup 可以安装 Rust 编译器 (rustc)、包管理器 (cargo) 和其他标准工具。

安装完成后，你会获得：
• **rustc**：Rust 编译器
• **cargo**：Rust 的包管理器和构建工具
• **rustfmt**：代码格式化工具
• **clippy**：高级代码检查工具`,
        language: "bash",
        code: `# Linux/macOS
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Windows
download rustup-init.exe from https://rustup.rs

# 验证安装
rustc --version
cargo --version

# 更新 Rust
rustup update

# 卸载 Rust
rustup self uninstall`,
        tips: [
          "安装过程中选择默认选项即可",
          "安装完成后需要重启终端或运行 source $HOME/.cargo/env"
        ]
      },
      {
        id: "hello-world",
        title: "Hello, World!",
        explanation: `让我们编写第一个 Rust 程序。Rust 程序的入口点是 main 函数，println! 是一个宏（以 ! 结尾），用于向控制台输出文本。`,
        code: `fn main() {
    println!("Hello, World!");
}`,
        output: `Hello, World!`,
        tips: [
          "Rust 使用缩进 4 个空格",
          "语句以分号 ; 结尾",
          "println! 是宏，不是函数，注意后面的感叹号"
        ]
      }
    ]
  },
  {
    id: "cargo",
    title: "Cargo 与项目管理",
    description: "使用 Cargo 创建、构建、测试与组织 Rust 工程",
    content: [
      {
        id: "cargo-new",
        title: "创建第一个 Cargo 项目",
        explanation: `Cargo 是 Rust 官方的构建工具与包管理器。它负责：
• 创建项目骨架（src/、Cargo.toml）
• 下载与管理依赖
• 构建与运行（debug/release）
• 运行测试、生成文档等`,
        language: "bash",
        code: `# 创建一个二进制（可执行）项目
cargo new hello_rust
cd hello_rust

# 编译并运行（默认 debug）
cargo run

# 只做类型检查（更快）
cargo check`,
        output: `Hello, world!`,
        tips: [
          "Rust 项目根目录通常以 Cargo.toml 为标识",
          "cargo check 非常适合在开发时快速验证代码是否能通过编译"
        ]
      },
      {
        id: "cargo-toml",
        title: "理解 Cargo.toml 与依赖管理",
        explanation: `Cargo.toml 是项目清单文件，主要包含：
• [package]：包信息（name、version、edition）
• [dependencies]：依赖列表

依赖可以通过版本号、特性（features）等进行配置。`,
        language: "toml",
        code: `# Cargo.toml（示例）
[package]
name = "hello_rust"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1", features = ["derive"] }
anyhow = "1"`,
        tips: [
          "常见的依赖来源是 crates.io",
          "features 常用于按需启用可选能力，减少编译时间和二进制体积"
        ]
      },
      {
        id: "cargo-commands",
        title: "常用 Cargo 子命令",
        explanation: `Cargo 常用子命令一览：
• cargo build：构建
• cargo run：构建并运行
• cargo test：运行测试
• cargo doc：生成文档
• cargo fmt / cargo clippy：格式化与代码规范检查`,
        language: "bash",
        code: `cargo build
cargo build --release

cargo test

# 需要安装 rustfmt / clippy（通常随 rustup 安装）
cargo fmt
cargo clippy

cargo doc --open`,
        tips: [
          "release 构建会启用优化，适合发布与性能测试",
          "把 clippy 当作“更严格的编译器”能显著提升代码质量"
        ]
      },
      {
        id: "cargo-modules",
        title: "src/ 目录与模块拆分",
        explanation: `当代码变多时，可以将逻辑拆到多个模块文件中。下面示例演示了最简单的拆分方式：

• 在 main.rs 中声明 mod
• 在对应的 .rs 文件中提供 pub API`,
        language: "rust",
        code: `// src/main.rs
mod greet;

fn main() {
    greet::hello();
}

// src/greet.rs
pub fn hello() {
    println!("hi from module");
}`,
        output: `hi from module`,
        tips: [
          "模块是 Rust 代码组织的核心单元之一",
          "大型项目通常会结合 mod.rs / lib.rs、crate、workspace 等方式组织"
        ]
      },
      {
        id: "cargo-workspace",
        title: "Workspace：多 crate 工程",
        explanation: `当项目拆分为多个 crate（例如 app + library + tools）时，推荐使用 workspace 统一管理依赖与构建。

Workspace 的关键点：
• 根目录只有一个 Cargo.lock（依赖一致、构建更快）
• members 声明子 crate
• 子 crate 之间常用 path 依赖在本地联调`,
        language: "toml",
        code: `# 根目录 Cargo.toml（workspace）
[workspace]
members = ["crates/app", "crates/core"]

# crates/app/Cargo.toml（示例）
[package]
name = "app"
version = "0.1.0"
edition = "2021"

[dependencies]
core = { path = "../core" }`,
        tips: [
          "对大型项目来说，workspace 是最常见的组织方式",
          "发布到 crates.io 后可以把 path 依赖替换为版本依赖"
        ]
      },
      {
        id: "cargo-features",
        title: "Features：可选能力与条件编译",
        explanation: `features 用于“按需启用”可选能力，常见场景：
• 开关某些模块（比如开启日志、开启 serde）
• 选择不同实现（例如 std / no_std）

features 本质上是编译期条件开关，配合 cfg 宏工作。`,
        language: "rust",
        code: `// Cargo.toml（示例）:
// [features]
// default = ["log"]
// log = []
//
// [dependencies]
// log = { version = "0.4", optional = true }

#[cfg(feature = "log")]
fn init_log() {
    println!("log enabled");
}

#[cfg(not(feature = "log"))]
fn init_log() {
    println!("log disabled");
}

fn main() {
    init_log();
}`,
        tips: [
          "可选依赖需要 optional = true，并由 feature 拉起",
          "对外提供清晰的 feature 命名与说明，能显著提升库的可用性"
        ],
        warnings: [
          "features 会影响依赖图与编译产物，建议保持组合简单，避免“特性爆炸”"
        ]
      },
      {
        id: "cargo-profiles",
        title: "Profile：debug / release 的差异",
        explanation: `Cargo 默认提供两套 profile：
• dev：编译快、优化少，适合开发调试
• release：优化强，适合发布与性能测试

你可以在 Cargo.toml 里调整优化级别、调试信息、LTO 等。`,
        language: "toml",
        code: `# Cargo.toml（示例）
[profile.dev]
opt-level = 0

[profile.release]
opt-level = 3
lto = true`,
        tips: [
          "性能对比应该优先用 release 构建",
          "LTO 有助于性能与体积，但会增加编译时间"
        ]
      }
    ]
  },
  {
    id: "practice-cli",
    title: "实战：CLI 文本搜索器",
    description: "用工程化方式写一个可发布的命令行工具（mini-rg）",
    content: [
      {
        id: "cli-overview",
        title: "目标与项目结构",
        explanation: `这一章我们做一个“迷你版 ripgrep”：给定关键字和文件路径，在文件中搜索匹配行并打印结果。

验收目标（推荐）：
• 支持大小写敏感/不敏感开关
• 读取文件失败时返回非 0 退出码
• 有单元测试 + 至少一个集成测试
• cargo fmt / cargo clippy 通过`,
        language: "bash",
        code: `cargo new mini_rg
cd mini_rg

# 运行
cargo run -- --help

# 开发期检查
cargo fmt
cargo clippy
cargo test`,
        tips: [
          "先把核心逻辑提取到 lib.rs，再用 main.rs 做参数解析与输出，是更可测的结构",
          "从一开始就写最小可用版本，然后迭代功能开关（例如 ignore-case）"
        ]
      },
      {
        id: "cli-args",
        title: "参数解析：clap 基础用法",
        explanation: `命令行工具的第一步是“稳定的参数接口”。clap 是 Rust 生态中最常用的参数解析库之一。

建议做法：
• 用结构体承载参数（derive）
• 明确必填参数（query/path）
• 让帮助信息成为“文档的一部分”`,
        language: "rust",
        code: `// Cargo.toml（示例）:
// clap = { version = "4", features = ["derive"] }

use clap::Parser;

#[derive(Parser, Debug)]
#[command(name = "mini-rg")]
struct Args {
    /// 要搜索的关键字
    query: String,
    /// 文件路径
    path: String,
    /// 忽略大小写
    #[arg(long)]
    ignore_case: bool,
}

fn main() {
    let args = Args::parse();
    println!("{:?}", args);
}`,
        tips: [
          "不要手写 argv 解析，维护成本很高",
          "为参数加上注释，帮助信息会自动生成"
        ]
      },
      {
        id: "cli-lifetime-primer",
        title: "补充前置：先读懂 search<'a> 里的生命周期",
        explanation: `在下面的核心函数里会出现这样的签名：
• search<'a>(..., contents: &'a str, ...) -> Vec<&'a str>

这里的 'a 不是“让引用活得更久”，而是“声明返回值中的引用，必须来自 contents，并且不会比 contents 活得更久”。

为什么要标注：
• 返回的是引用（&str），不是新分配的 String
• 编译器需要知道“返回值借用自谁”
• 用同一个 'a 把输入与输出关联起来，借用关系就清晰了

如果你对生命周期还不熟，可以先记住一句实用规则：
• “函数返回引用时，要么返回来自某个输入引用的数据，要么返回 'static 引用；不能凭空造出悬垂引用”`,
        language: "rust",
        code: `// 返回值借用自 contents
pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    contents
        .lines()
        .filter(|line| line.contains(query))
        .collect()
}

// 下面这种写法会出错：试图返回局部变量的引用
// fn bad<'a>() -> &'a str {
//     let s = String::from("hello");
//     &s
// }`,
        tips: [
          "生命周期标注描述的是“关系”，不是“时长延长器”",
          "当函数返回 Vec<&str> 这类引用集合时，优先想清楚它借用了哪个输入"
        ]
      },
      {
        id: "cli-core",
        title: "核心逻辑：搜索并返回匹配行",
        explanation: `把搜索逻辑写成纯函数，是最容易测试与复用的方式。

核心函数建议签名：
• 输入：query、文本内容、是否忽略大小写
• 输出：匹配行的集合（Vec<&str> 或 Vec<String>）`,
        code: `pub fn search<'a>(query: &str, contents: &'a str, ignore_case: bool) -> Vec<&'a str> {
    let q = if ignore_case { query.to_lowercase() } else { query.to_string() };

    contents
        .lines()
        .filter(|line| {
            if ignore_case {
                line.to_lowercase().contains(&q)
            } else {
                line.contains(&q)
            }
        })
        .collect()
}

fn main() {
    let contents = "Rust\\nTrust me\\nCrab";
    let hits = search("rust", contents, true);
    println!("{:?}", hits);
}`,
        output: `["Rust", "Trust me"]`,
        tips: [
          "先做正确性，再做性能（例如避免重复 to_lowercase 可进一步优化）",
          "返回引用可以减少分配，但要理解生命周期标注的意义"
        ]
      },
      {
        id: "cli-io-and-exit",
        title: "IO 与退出码：把错误变成用户可理解的信息",
        explanation: `命令行工具里“错误体验”非常重要：
• 文件打不开：打印友好信息到 stderr，并返回非 0
• 没有匹配：可以像 ripgrep/grep 一样返回 1（无匹配）来便于脚本判断

一个简单策略是：main 返回 Result，然后在出错时统一处理。`,
        code: `use std::fs;

fn run(query: &str, path: &str) -> Result<(), std::io::Error> {
    let contents = fs::read_to_string(path)?;
    for line in contents.lines().filter(|l| l.contains(query)) {
        println!("{}", line);
    }
    Ok(())
}

fn main() {
    // 这里为简化写死参数，实际应来自 clap
    if let Err(e) = run("rust", "poem.txt") {
        eprintln!("mini-rg: {e}");
        std::process::exit(1);
    }
}`,
        tips: [
          "用 eprintln! 输出错误到 stderr，避免污染正常输出",
          "可参考：match=0、no match=1、error=2 的退出码约定（记得写进 --help/README）",
          "把业务逻辑放到 run()，main 只做“胶水层”"
        ]
      },
      {
        id: "cli-tests",
        title: "为 mini-rg 写测试",
        explanation: `测试优先覆盖“核心纯函数”，再用集成测试覆盖“整体行为”。

常见测试点：
• 大小写敏感/不敏感
• query 不存在时返回空
• 输入包含多行，能正确筛选`,
        code: `#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn case_sensitive() {
        let c = "Rust\\nTrust";
        assert_eq!(search("Rust", c, false), vec!["Rust"]);
    }

    #[test]
    fn case_insensitive() {
        let c = "Rust\\nTrust";
        assert_eq!(search("rust", c, true), vec!["Rust", "Trust"]);
    }
}`,
        tips: [
          "集成测试建议放在 tests/，通过 public API 驱动",
          "让测试数据尽量短小但覆盖边界"
        ]
      }
    ]
  },
  {
    id: "practice-web",
    title: "实战：Web API（axum）",
    description: "用 axum + tokio 构建一个可测试的 HTTP 服务",
    content: [
      {
        id: "web-overview",
        title: "目标与依赖选择",
        explanation: `这章实现一个小型 HTTP API（示例：/healthz、/echo、/users）。

常见依赖组合（示例）：
• tokio：异步运行时
• axum：路由与 handler
• serde：JSON 序列化/反序列化
• tracing：结构化日志`,
        language: "toml",
        code: `# Cargo.toml（示例）
[dependencies]
tokio = { version = "1", features = ["macros", "rt-multi-thread"] }
axum = "0.7"
serde = { version = "1", features = ["derive"] }
serde_json = "1"`,
        tips: [
          "先把 API 跑通，再逐步引入状态、错误模型、测试与日志",
          "Web 项目一定要有超时、日志与可观测性（哪怕是最简版）"
        ]
      },
      {
        id: "web-router",
        title: "最小可运行：Router + handler",
        explanation: `先从最小服务开始：一个健康检查接口 + 一个返回 JSON 的接口。`,
        code: `use axum::{routing::get, Json, Router};
use serde::Serialize;

#[derive(Serialize)]
struct Health {
    ok: bool,
}

async fn healthz() -> Json<Health> {
    Json(Health { ok: true })
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/healthz", get(healthz));
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}`,
        output: `GET /healthz -> {"ok":true}`,
        tips: [
          "handler 返回的类型尽量简单明确（例如 Json<T>）",
          "使用 localhost + 明确端口，避免绑定 0.0.0.0 引入安全风险"
        ]
      },
      {
        id: "web-state",
        title: "共享状态：注入 AppState",
        explanation: `当需要数据库连接池、配置或内存缓存时，通常会把状态放到 AppState，并通过 Router 的 state 注入到 handler。`,
        code: `use axum::{extract::State, routing::get, Router};
use std::sync::{Arc, Mutex};

#[derive(Clone, Default)]
struct AppState {
    counter: Arc<Mutex<u64>>,
}

async fn incr(State(state): State<AppState>) -> String {
    let mut n = state.counter.lock().unwrap();
    *n += 1;
    format!("count={n}")
}

#[tokio::main]
async fn main() {
    let state = AppState::default();
    let app = Router::new().route("/incr", get(incr)).with_state(state);
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}`,
        tips: [
          "真实项目里通常用更高阶的并发结构（例如原子类型、RwLock 或数据库）",
          "注意不要在持锁期间做 .await（会造成吞吐下降甚至死锁）"
        ]
      },
      {
        id: "web-errors",
        title: "错误模型：把错误映射成 HTTP 响应",
        explanation: `Web 服务的错误要对用户“稳定”，对开发者“可追踪”：
• 用户看到：状态码 + 可理解信息
• 服务端日志：保留底层错误上下文`,
        code: `use axum::{http::StatusCode, response::IntoResponse};

enum AppError {
    BadRequest(String),
    Internal(String),
}

impl IntoResponse for AppError {
    fn into_response(self) -> axum::response::Response {
        match self {
            AppError::BadRequest(msg) => (StatusCode::BAD_REQUEST, msg).into_response(),
            AppError::Internal(msg) => (StatusCode::INTERNAL_SERVER_ERROR, msg).into_response(),
        }
    }
}`,
        tips: [
          "把错误类型集中定义，避免 handler 里散落大量 map_err",
          "对外错误信息要稳定、可预期，不要泄露敏感细节"
        ]
      },
      {
        id: "web-tests",
        title: "HTTP 测试：用 ServiceExt 驱动 Router",
        explanation: `axum 的 Router 可以被当作 Service 来测试：构造请求、调用一次、断言响应。

这类测试运行快、无需真实监听端口，非常适合 CI。`,
        code: `// 伪代码示例：不同版本的 axum/tower API 会略有差异
// use tower::ServiceExt;
//
// let app = Router::new().route("/healthz", get(healthz));
// let res = app.oneshot(Request::builder().uri("/healthz").body(Body::empty()).unwrap()).await?;
// assert_eq!(res.status(), StatusCode::OK);`,
        tips: [
          "优先写这种“无端口”的服务内测试",
          "集成测试再覆盖：真实监听端口、跨进程调用等"
        ]
      }
    ]
  },
  {
    id: "style",
    title: "代码风格与工程结构",
    description: "从真实开源项目中学习 Rust 的工程化与风格约定",
    content: [
      {
        id: "style-tools",
        title: "rustfmt + clippy：让风格自动化",
        explanation: `建议把风格与 lint 变成“自动化门禁”，而不是代码评审时靠人盯：

• rustfmt：统一格式
• clippy：发现常见 bug/坏味道
• cargo test：回归验证`,
        language: "bash",
        code: `cargo fmt
cargo clippy -- -D warnings
cargo test`,
        tips: [
          "在 CI 里把 clippy warnings 当成错误（-D warnings）能有效提升代码质量",
          "让工具替人做重复劳动，评审关注设计与可读性"
        ]
      },
      {
        id: "style-boundaries",
        title: "模块边界：用类型系统表达约束",
        explanation: `从大型项目经验看，“边界清晰”比“写得快”更重要：

• 对外只暴露必要的 pub API
• 内部细节保持私有，降低耦合
• 用新类型（newtype）表达业务约束，避免裸类型滥用`,
        code: `#[derive(Clone, Debug, PartialEq, Eq, Hash)]
pub struct UserId(String);

impl UserId {
    pub fn new(raw: String) -> Result<Self, &'static str> {
        if raw.is_empty() {
            return Err("empty id");
        }
        Ok(Self(raw))
    }
}`,
        tips: [
          "newtype 是 Rust 工程里非常常见的“约束表达”手段",
          "默认私有，必要才 pub，是长期可维护的关键"
        ]
      },
      {
        id: "style-architecture",
        title: "工程分层：从 rust-analyzer 的思路学结构",
        explanation: `在超大型 Rust 项目中，常见做法是用多个 crate 做分层（layering）：

• 底层 crate：只放纯数据结构/算法/不可变模型
• 中层 crate：定义接口、抽象、增量计算/缓存
• 上层 crate：UI/协议/应用逻辑

这样可以把依赖方向固定下来，防止“相互引用的泥球”。`,
        language: "text",
        code: `# 一个简化的 workspace 结构示意
crates/
  core/        # 领域模型、纯逻辑（尽量无 IO）
  infra/       # IO 适配层（文件/网络/DB）
  app/         # 组合 core + infra，对外提供 CLI/Web`,
        tips: [
          "把 IO 边界往外推，核心逻辑就更容易测试",
          "依赖方向要单向：app -> infra -> core（或 app -> core，infra 也依赖 core）"
        ]
      },
      {
        id: "style-errors",
        title: "错误风格：用 thiserror + anyhow（工程常用套路）",
        explanation: `工程中通常区分两类错误：

• 库（library）：用 thiserror 定义可枚举的错误类型（结构化）
• 应用（application）：用 anyhow 作为“兜底错误”，并加上下文`,
        code: `// Cargo.toml（示例）:
// thiserror = "1"
// anyhow = "1"

use thiserror::Error;

#[derive(Debug, Error)]
pub enum CoreError {
    #[error("invalid user id")]
    InvalidUserId,
}
`,
        tips: [
          "错误类型要服务于“定位问题”与“稳定对外接口”",
          "错误消息（Display）通常建议小写、简洁、不要句号",
          "给错误加上下文（context）通常比自己拼字符串更可靠"
        ]
      }
    ]
  },
  {
    id: "basics",
    title: "基础语法",
    description: "变量、数据类型、函数和控制流",
    content: [
      {
        id: "variables",
        title: "变量与可变性",
        explanation: `Rust 中的变量默认是不可变的（immutable）。这是 Rust 安全性的一个重要特性。如果需要修改变量，必须使用 mut 关键字声明为可变的。

常量（const）与不可变变量的区别：
• 常量总是不可变的，不能使用 mut
• 常量必须在编译时确定值
• 常量使用全大写命名`,
        code: `fn main() {
    // 不可变变量
    let x = 5;
    // x = 6; // 错误！不能修改不可变变量
    
    // 可变变量
    let mut y = 5;
    y = 6; // 正确
    println!("y = {}", y);
    
    // 常量
    const MAX_POINTS: u32 = 100_000;
    println!("MAX_POINTS = {}", MAX_POINTS);
    
    // 变量遮蔽（Shadowing）
    let z = 5;
    let z = z + 1;
    let z = z * 2;
    println!("z = {}", z);
}`,
        output: `y = 6
MAX_POINTS = 100000
z = 12`,
        tips: [
          "使用不可变变量可以让代码更安全、更容易推理",
          "变量遮蔽可以重用变量名，同时改变类型"
        ]
      },
      {
        id: "data-types",
        title: "数据类型",
        explanation: `Rust 是静态类型语言，编译时必须知道所有变量的类型。Rust 有丰富的数据类型系统，包括标量类型和复合类型。

**标量类型**：
• 整数：i8, i16, i32, i64, i128, isize（有符号）；u8, u16, u32, u64, u128, usize（无符号）
• 浮点数：f32, f64
• 布尔型：bool（true/false）
• 字符型：char（Unicode 标量值）

**复合类型**：
• 元组（Tuple）：固定长度，可以包含不同类型
• 数组（Array）：固定长度，所有元素同类型`,
        code: `fn main() {
    // 整数
    let a: i32 = -10;
    let b: u64 = 100;
    let c = 0xff; // 十六进制
    let d = 0o77; // 八进制
    let e = 0b1111_0000; // 二进制，使用下划线提高可读性
    
    // 浮点数
    let f: f64 = 3.14;
    let g: f32 = 2.5;
    
    // 布尔型
    let t: bool = true;
    
    // 字符型
    let c: char = '中'; // Unicode 字符
    
    // 元组
    let tup: (i32, f64, &str) = (500, 6.4, "hi");
    let (x, y, z) = tup; // 解构
    println!("x = {}, y = {}, z = {}", x, y, z);
    println!("tup.0 = {}", tup.0); // 使用索引访问
    
    // 数组
    let arr = [1, 2, 3, 4, 5];
    let first = arr[0];
    println!("first = {}", first);
}`,
        output: `x = 500, y = 6.4, z = hi
tup.0 = 500
first = 1`,
        tips: [
          "i32 是最常用的整数类型",
          "f64 是默认浮点类型，精度更高",
          "数组长度固定，Vector 可以动态增长"
        ]
      },
      {
        id: "functions",
        title: "函数",
        explanation: `函数使用 fn 关键字定义。Rust 使用蛇形命名法（snake_case）作为函数和变量名的规范。

函数参数需要声明类型，返回值类型使用 -> 指定。Rust 是表达式语言，函数体中最后一个表达式的值会自动作为返回值。`,
        code: `fn main() {
    say_hello();
    
    let result = add(5, 3);
    println!("5 + 3 = {}", result);
    
    let x = five();
    println!("five() = {}", x);
    
    let y = plus_one(5);
    println!("plus_one(5) = {}", y);
}

// 无参数、无返回值的函数
fn say_hello() {
    println!("Hello!");
}

// 带参数、有返回值的函数
fn add(a: i32, b: i32) -> i32 {
    a + b // 注意：没有分号，这是表达式
}

// 返回值的函数
fn five() -> i32 {
    5
}

fn plus_one(x: i32) -> i32 {
    x + 1
}`,
        output: `Hello!
5 + 3 = 8
five() = 5
plus_one(5) = 6`,
        tips: [
          "函数定义顺序不重要，可以在 main 之后定义",
          "语句（statement）执行操作但不返回值",
          "表达式（expression）会计算并返回值"
        ],
        warnings: [
          "不要在返回表达式后面加分号，否则会变成语句，返回 ()"
        ]
      },
      {
        id: "control-flow",
        title: "控制流",
        explanation: `Rust 提供常见的控制流结构：if/else 条件判断、loop 无限循环、while 条件循环、for 遍历循环。

Rust 的 if 是表达式，可以返回值。loop 可以配合 break 返回一个值。`,
        code: `fn main() {
    // if/else
    let number = 6;
    
    if number % 4 == 0 {
        println!("可被 4 整除");
    } else if number % 3 == 0 {
        println!("可被 3 整除");
    } else if number % 2 == 0 {
        println!("可被 2 整除");
    } else {
        println!("不能被 4、3、2 整除");
    }
    
    // if 作为表达式
    let condition = true;
    let value = if condition { 5 } else { 6 };
    println!("value = {}", value);
    
    // loop 无限循环
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2; // 返回一个值
        }
    };
    println!("result = {}", result);
    
    // while 循环
    let mut n = 3;
    while n != 0 {
        println!("{}!", n);
        n -= 1;
    }
    println!("发射!");
    
    // for 循环
    let arr = [10, 20, 30, 40, 50];
    for element in arr.iter() {
        println!("value: {}", element);
    }
    
    // for 配合 range
    for i in 1..4 { // 1, 2, 3
        println!("i = {}", i);
    }
    
    for i in (1..4).rev() {
        println!("{}!", i);
    }
}`,
        output: `可被 3 整除
value = 5
result = 20
3!
2!
1!
发射!
value: 10
value: 20
value: 30
value: 40
value: 50
i = 1
i = 2
i = 3
3!
2!
1!`,
        tips: [
          "Rust 不会自动转换非布尔值为布尔值",
          "for 循环比 while 循环更安全，不会越界",
          ".. 创建范围，包含开始不包含结束"
        ]
      }
    ]
  },
  {
    id: "ownership",
    title: "所有权系统",
    description: "Rust 最核心的特性：所有权、借用和生命周期",
    content: [
      {
        id: "ownership-concept",
        title: "所有权规则",
        explanation: `所有权是 Rust 最核心的特性，它使 Rust 能够在没有垃圾回收器的情况下保证内存安全。

**所有权的三条规则**：
1. Rust 中的每个值都有一个所有者（owner）
2. 值在任一时刻只能有一个所有者
3. 当所有者离开作用域，这个值将被丢弃

这种机制确保了内存自动释放，同时防止了悬垂指针和双重释放等问题。`,
        code: `fn main() {
    // s 在这里无效，尚未声明
    
    {
        let s = String::from("hello"); // s 从此处开始有效
        println!("{}", s); // 使用 s
    } // 此作用域结束，s 不再有效，内存自动释放
    
    // println!("{}", s); // 错误！s 已无效
    
    // 变量与数据交互：移动（Move）
    let s1 = String::from("hello");
    let s2 = s1; // s1 的值移动到 s2
    
    // println!("{}", s1); // 错误！s1 已无效
    println!("{}", s2); // 正确
    
    // 克隆（Clone）
    let s3 = String::from("world");
    let s4 = s3.clone(); // 深拷贝
    println!("s3 = {}, s4 = {}", s3, s4); // 两者都有效
    
    // 复制（Copy）trait
    let x = 5;
    let y = x; // 基本类型实现了 Copy trait
    println!("x = {}, y = {}", x, y); // 两者都有效
}`,
        output: `hello
hello
s3 = world, s4 = world
x = 5, y = 5`,
        tips: [
          "基本类型（整数、浮点、布尔、字符、元组）实现了 Copy trait",
          "String、Vec 等复杂类型没有实现 Copy trait",
          "移动语义是 Rust 内存安全的基础"
        ]
      },
      {
        id: "borrowing",
        title: "引用与借用",
        explanation: `借用（Borrowing）允许你使用值而不获取其所有权。引用（Reference）就像一个指针，但它保证指向某个特定类型的有效值。

**借用规则**：
1. 在任一给定时间，只能拥有一个可变引用，或者任意数量的不可变引用
2. 引用必须总是有效的（不能悬垂）

这些规则由编译器的借用检查器（borrow checker）在编译时强制执行。`,
        code: `fn main() {
    let s1 = String::from("hello");
    
    // 不可变借用
    let len = calculate_length(&s1);
    println!("'{}' 的长度是 {}", s1, len); // s1 仍然有效
    
    // 可变借用
    let mut s = String::from("hello");
    change(&mut s);
    println!("{}", s);
    
    // 多个不可变引用（允许）
    let s2 = String::from("world");
    let r1 = &s2;
    let r2 = &s2;
    println!("{}, {}", r1, r2);
    
    // 可变引用的限制
    let mut s3 = String::from("hello");
    let r3 = &s3; // 不可变引用
    // let r4 = &mut s3; // 错误！已有不可变引用
    println!("{}", r3);
    
    // 在 r3 不再使用后，可以创建可变引用
    let r4 = &mut s3; // 正确
    println!("{}", r4);
}

fn calculate_length(s: &String) -> usize {
    s.len()
} // s 离开作用域，但不会释放内存，因为它不拥有所有权

fn change(s: &mut String) {
    s.push_str(", world");
}`,
        output: `'hello' 的长度是 5
hello, world
world, world
hello`,
        tips: [
          "& 创建引用，* 解引用",
          "可变引用具有排他性，防止数据竞争",
          "引用的作用域从创建到最后一次使用"
        ],
        warnings: [
          "不能同时拥有可变和不可变引用",
          "不能返回局部变量的引用"
        ]
      },
      {
        id: "slices",
        title: "切片（Slice）",
        explanation: `切片（Slice）允许你引用集合中一段连续的元素序列，而不是整个集合。切片是一种没有所有权的数据类型。

字符串切片（&str）是最常见的切片类型，它是 String 的不可变引用。`,
        code: `fn main() {
    let s = String::from("hello world");
    
    // 字符串切片
    let hello = &s[0..5];
    let world = &s[6..11];
    println!("{} {}", hello, world);
    
    // 语法糖
    let s1 = &s[0..2];   // 等价于 &s[..2]
    let s2 = &s[3..s.len()]; // 等价于 &s[3..]
    let s3 = &s[0..s.len()]; // 等价于 &s[..]
    
    // 字符串字面量就是切片
    let s4: &str = "hello";
    
    // 使用切片编写函数
    let first = first_word(&s);
    println!("第一个单词: {}", first);
    
    // 数组切片
    let arr = [1, 2, 3, 4, 5];
    let slice = &arr[1..3];
    println!("slice = {:?}", slice);
}

fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    
    &s[..]
}`,
        output: `hello world
第一个单词: hello
slice = [2, 3]`,
        tips: [
          "字符串切片 &str 是不可变的",
          "使用切片可以避免 String 的所有权转移",
          "切片可以用于数组、字符串等集合类型"
        ]
      }
    ]
  },
  {
    id: "structs",
    title: "结构体",
    description: "使用结构体创建自定义类型",
    content: [
      {
        id: "struct-basics",
        title: "定义和使用结构体",
        explanation: `结构体（struct）允许你创建自定义的数据类型，将多个相关的值组合在一起。Rust 有三种类型的结构体：

1. **具名结构体**：具有命名的字段
2. **元组结构体**：类似元组，有类型但无字段名
3. **单元结构体**：没有字段，用于实现 trait`,
        code: `fn main() {
    // 定义结构体
    struct User {
        username: String,
        email: String,
        sign_in_count: u64,
        active: bool,
    }
    
    // 创建实例
    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };
    
    // 访问字段
    println!("用户名: {}", user1.username);
    println!("邮箱: {}", user1.email);
    
    // 可变实例
    let mut user2 = User {
        email: String::from("test@example.com"),
        username: String::from("testuser"),
        active: false,
        sign_in_count: 0,
    };
    user2.email = String::from("new@example.com");
    
    // 结构体更新语法
    let user3 = User {
        email: String::from("another@example.com"),
        ..user1 // 使用 user1 的其余字段
    };
    
    // 元组结构体
    struct Point(i32, i32, i32);
    let origin = Point(0, 0, 0);
    println!("x = {}", origin.0);
    
    // 单元结构体
    struct AlwaysEqual;
    let _subject = AlwaysEqual;
}`,
        output: `用户名: someusername123
邮箱: someone@example.com
x = 0`,
        tips: [
          "结构体字段默认不可变，需要 mut 才能修改",
          ".. 语法可以方便地复制其他实例的字段",
          "元组结构体适用于简单的包装类型"
        ]
      },
      {
        id: "struct-methods",
        title: "方法语法",
        explanation: `方法（method）是与结构体（或枚举、trait 对象）相关联的函数。方法使用 impl 块定义，第一个参数总是 self，代表调用该方法的实例。

关联函数（associated function）是不以 self 为参数的函数，通常用于构造函数。`,
        code: `struct Rectangle {
    width: u32,
    height: u32,
}

// 实现块
impl Rectangle {
    // 方法：计算面积
    fn area(&self) -> u32 {
        self.width * self.height
    }
    
    // 方法：判断是否正方形
    fn is_square(&self) -> bool {
        self.width == self.height
    }
    
    // 方法：是否可以容纳另一个矩形
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
    
    // 关联函数（构造函数）
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
    
    // 关联函数
    fn new(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    
    println!("rect1 的面积: {}", rect1.area());
    println!("是否是正方形: {}", rect1.is_square());
    
    let rect2 = Rectangle::new(10, 20);
    let square = Rectangle::square(25);
    
    println!("rect1 能容纳 rect2: {}", rect1.can_hold(&rect2));
    println!("square 的面积: {}", square.area());
}`,
        output: `rect1 的面积: 1500
是否是正方形: false
rect1 能容纳 rect2: true
square 的面积: 625`,
        tips: [
          "&self 是 self: &Self 的简写",
          "方法可以重名，Rust 会自动解引用",
          "一个结构体可以有多个 impl 块"
        ]
      }
    ]
  },
  {
    id: "enums",
    title: "枚举与模式匹配",
    description: "强大的枚举类型和 match 表达式",
    content: [
      {
        id: "enum-basics",
        title: "定义枚举",
        explanation: `枚举（enum）允许你定义一个类型，它可以是多个不同变体（variant）中的一个。Rust 的枚举非常强大，每个变体可以关联不同类型的数据。

Option 和 Result 是 Rust 标准库中最重要的两个枚举。`,
        code: `enum Message {
    Quit,                           // 无数据
    Move { x: i32, y: i32 },       // 匿名结构体
    Write(String),                  // 单个值
    ChangeColor(i32, i32, i32),    // 元组
}

// Option 枚举（标准库定义）
// enum Option<T> {
//     Some(T),
//     None,
// }

// Result 枚举（标准库定义）
// enum Result<T, E> {
//     Ok(T),
//     Err(E),
// }

fn main() {
    // 使用 Option
    let some_number = Some(5);
    let some_string = Some("a string");
    let absent_number: Option<i32> = None;
    
    println!("some_number = {:?}", some_number);
    
    // 使用 Result
    let success: Result<i32, &str> = Ok(42);
    let failure: Result<i32, &str> = Err("出错了");
    
    println!("success = {:?}", success);
    println!("failure = {:?}", failure);
    
    // 创建 Message 实例
    let msg1 = Message::Quit;
    let msg2 = Message::Move { x: 10, y: 20 };
    let msg3 = Message::Write(String::from("hello"));
    
    process_message(msg1);
    process_message(msg2);
    process_message(msg3);
}

fn process_message(msg: Message) {
    match msg {
        Message::Quit => println!("Quit"),
        Message::Move { x, y } => println!("Move to ({}, {})", x, y),
        Message::Write(text) => println!("Write: {}", text),
        Message::ChangeColor(r, g, b) => println!("Change color to ({}, {}, {})", r, g, b),
    }
}`,
        output: `some_number = Some(5)
success = Ok(42)
failure = Err("出错了")
Quit
Move to (10, 20)
Write: hello`,
        tips: [
          "Option 用于可能为空的值，避免空指针问题",
          "Result 用于可能出错的操作，强制错误处理",
          "枚举变体可以包含不同类型的数据"
        ]
      },
      {
        id: "match",
        title: "match 控制流",
        explanation: `match 允许你将一个值与一系列模式进行比较，并根据匹配的模式执行代码。match 是 Rust 中强大的模式匹配工具，它必须是穷尽的（覆盖所有可能的情况）。

模式可以包括：
• 字面值
• 变量名
• 通配符 _
• 范围
• 结构体/枚举解构`,
        code: `enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => {
            println!("Lucky penny!");
            1
        }
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}

fn main() {
    // 基本 match
    let coin = Coin::Penny;
    println!("硬币价值: {}", value_in_cents(coin));
    
    // 绑定值的模式
    let some_value = Some(3);
    match some_value {
        Some(3) => println!("是三！"),
        Some(n) => println!("是数字: {}", n),
        None => println!("没有值"),
    }
    
    // 通配符
    let x = 1;
    match x {
        1 => println!("一"),
        2 => println!("二"),
        _ => println!("其他"),
    }
    
    // if let 简化语法
    let some_u8_value = Some(3);
    if let Some(3) = some_u8_value {
        println!("是三！");
    }
    
    // while let
    let mut stack = Vec::new();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    
    while let Some(top) = stack.pop() {
        println!("弹出: {}", top);
    }
    
    // match 与范围
    let age = 25;
    match age {
        0..=12 => println!("儿童"),
        13..=19 => println!("青少年"),
        20..=59 => println!("成年人"),
        _ => println!("老年人"),
    }
}`,
        output: `Lucky penny!
硬币价值: 1
是三！
一
是三！
弹出: 3
弹出: 2
弹出: 1
成年人`,
        tips: [
          "match 必须是穷尽的，考虑所有可能",
          "if let 是 match 的简化形式，只关心一个模式",
          "_ 是通配符，匹配任何值"
        ]
      }
    ]
  },
  {
    id: "generics",
    title: "泛型",
    description: "编写可复用的代码",
    content: [
      {
        id: "generics-basics",
        title: "泛型基础",
        explanation: `泛型（Generics）允许你编写可以适用于多种类型的代码，而不需要在每种类型上重复实现。Rust 使用尖括号 <> 来声明泛型参数。

泛型可以用于函数、结构体、枚举和方法。`,
        code: `fn main() {
    // 泛型函数
    let number_list = vec![34, 50, 25, 100, 65];
    let result = largest(&number_list);
    println!("最大数字: {}", result);
    
    let char_list = vec!['y', 'm', 'a', 'q'];
    let result = largest(&char_list);
    println!("最大字符: {}", result);
    
    // 泛型结构体
    let integer_point = Point { x: 5, y: 10 };
    let float_point = Point { x: 1.0, y: 4.0 };
    
    println!("integer_point: ({}, {})", integer_point.x, integer_point.y);
    println!("float_point: ({}, {})", float_point.x, float_point.y);
    
    // 混合泛型
    let mixed = MixedPoint { x: 5, y: 1.0 };
    println!("mixed: ({}, {})", mixed.x, mixed.y);
    
    // 泛型枚举
    let some_value = Some(5);
    println!("some_value: {:?}", some_value);
}

// 泛型函数
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    
    for item in list.iter() {
        if item > largest {
            largest = item;
        }
    }
    
    largest
}

// 泛型结构体
struct Point<T> {
    x: T,
    y: T,
}

// 多个泛型参数
struct MixedPoint<T, U> {
    x: T,
    y: U,
}

// 为泛型结构体实现方法
impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

// 只为特定类型实现方法
impl Point<f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}`,
        output: `最大数字: 100
最大字符: y
integer_point: (5, 10)
float_point: (1, 4)
mixed: (5, 1)
some_value: Some(5)`,
        tips: [
          "T 是类型参数的惯用名称（Type）",
          "可以为特定类型单独实现方法",
          "泛型在编译时会单态化（monomorphization）"
        ]
      }
    ]
  },
  {
    id: "traits",
    title: "Trait",
    description: "定义共享行为",
    content: [
      {
        id: "trait-basics",
        title: "定义和实现 Trait",
        explanation: `Trait 告诉 Rust 编译器某个特定类型拥有可能与其他类型共享的功能。Trait 类似于其他语言中的接口（interface），但功能更强大。

你可以通过 trait 以抽象的方式定义共享的行为，然后使用 trait bounds 指定泛型是任何拥有特定行为的类型。`,
        code: `// 定义 trait
pub trait Summary {
    fn summarize(&self) -> String;
    
    // 默认实现
    fn summarize_author(&self) -> String {
        String::from("(阅读更多...)")
    }
}

pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

// 为类型实现 trait
impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
    
    fn summarize_author(&self) -> String {
        format!("@ {}", self.username)
    }
}

fn main() {
    let tweet = Tweet {
        username: String::from("horse_ebooks"),
        content: String::from("of course, as you probably already know, people"),
        reply: false,
        retweet: false,
    };
    
    println!("1 条新推文: {}", tweet.summarize());
    println!("作者: {}", tweet.summarize_author());
    
    let article = NewsArticle {
        headline: String::from("Penguins win the Stanley Cup Championship!"),
        location: String::from("Pittsburgh, PA, USA"),
        author: String::from("Iceburgh"),
        content: String::from("The Pittsburgh Penguins once again are the best hockey team in the NHL."),
    };
    
    println!("新文章: {}", article.summarize());
    
    // 使用 trait 作为参数
    notify(&tweet);
    
    // 使用 trait bounds
    let result = returns_summarizable();
    println!("返回的摘要: {}", result.summarize());
}

// trait 作为参数
fn notify(item: &impl Summary) {
    println!("突发新闻! {}", item.summarize());
}

// trait bounds 语法
fn notify2<T: Summary>(item: &T) {
    println!("突发新闻! {}", item.summarize());
}

// 返回实现了 trait 的类型
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("rust_lang"),
        content: String::from("Rust 1.70 发布了！"),
        reply: false,
        retweet: false,
    }
}`,
        output: `1 条新推文: horse_ebooks: of course, as you probably already know, people
作者: @ horse_ebooks
新文章: Penguins win the Stanley Cup Championship!, by Iceburgh (Pittsburgh, PA, USA)
突发新闻! horse_ebooks: of course, as you probably already know, people
返回的摘要: rust_lang: Rust 1.70 发布了！`,
        tips: [
          "trait 可以定义默认实现",
          "impl Trait 语法用于简单情况",
          "trait bounds 语法用于复杂约束"
        ]
      }
    ]
  },
  {
    id: "error-handling",
    title: "错误处理",
    description: "Rust 的错误处理机制",
    content: [
      {
        id: "error-types",
        title: "错误类型",
        explanation: `Rust 将错误分为两类：

1. **可恢复错误（Recoverable）**：例如文件未找到，可以报告给用户并重试。使用 Result<T, E> 处理。

2. **不可恢复错误（Unrecoverable）**：例如数组越界访问，是 bug，应该立即停止程序。使用 panic! 宏处理。

Rust 没有异常机制，而是使用这些显式的错误处理机制。`,
        code: `use std::fs::File;
use std::io::{self, Read};

fn main() {
    // 不可恢复错误
    // panic!("crash and burn");
    
    // 可恢复错误
    let f = File::open("hello.txt");
    
    let f = match f {
        Ok(file) => file,
        Err(error) => {
            println!("打开文件出错: {:?}", error);
            panic!("文件不存在！");
        }
    };
    
    // 简写方法
    // let f = File::open("hello.txt").unwrap();
    // let f = File::open("hello.txt").expect("无法打开文件");
}

// 传播错误
fn read_username_from_file() -> Result<String, io::Error> {
    let f = File::open("hello.txt");
    
    let mut f = match f {
        Ok(file) => file,
        Err(e) => return Err(e),
    };
    
    let mut s = String::new();
    
    match f.read_to_string(&mut s) {
        Ok(_) => Ok(s),
        Err(e) => Err(e),
    }
}

// ? 运算符简化错误传播
fn read_username_from_file2() -> Result<String, io::Error> {
    let mut f = File::open("hello.txt")?;
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}

// 更简洁的版本
fn read_username_from_file3() -> Result<String, io::Error> {
    let mut s = String::new();
    File::open("hello.txt")?.read_to_string(&mut s)?;
    Ok(s)
}`,
        output: `打开文件出错: Os { code: 2, kind: NotFound, message: "No such file or directory" }
thread 'main' panicked at '文件不存在！', src/main.rs:15:13`,
        tips: [
          "unwrap() 在 Err 时会 panic",
          "expect() 可以自定义错误信息",
          "? 运算符简化错误传播"
        ]
      }
    ]
  },
  {
    id: "collections",
    title: "常用集合",
    description: "Vector、String 和 HashMap",
    content: [
      {
        id: "vector",
        title: "Vector",
        explanation: `Vector（Vec<T>）是 Rust 中最常用的集合类型，它允许你在单个数据结构中存储多个值，这些值在内存中连续排列。Vector 只能存储相同类型的值。`,
        code: `fn main() {
    // 创建空 Vector
    let v: Vec<i32> = Vec::new();
    
    // 使用宏创建 Vector
    let v = vec![1, 2, 3];
    
    // 添加元素
    let mut v = Vec::new();
    v.push(5);
    v.push(6);
    v.push(7);
    v.push(8);
    
    // 读取元素
    let third: &i32 = &v[2];
    println!("第三个元素: {}", third);
    
    match v.get(2) {
        Some(third) => println!("第三个元素: {}", third),
        None => println!("没有第三个元素"),
    }
    
    // 遍历 Vector
    for i in &v {
        println!("{}", i);
    }
    
    // 遍历并修改
    let mut v = vec![100, 32, 57];
    for i in &mut v {
        *i += 50;
    }
    
    // 存储不同类型的值（使用枚举）
    enum SpreadsheetCell {
        Int(i32),
        Float(f64),
        Text(String),
    }
    
    let row = vec![
        SpreadsheetCell::Int(3),
        SpreadsheetCell::Text(String::from("blue")),
        SpreadsheetCell::Float(10.12),
    ];
}`,
        output: `第三个元素: 7
第三个元素: 7
5
6
7
8`,
        tips: [
          "Vec::new() 需要类型注解",
          "vec! 宏可以方便地创建 Vector",
          "get 方法返回 Option，比索引访问更安全"
        ]
      },
      {
        id: "string",
        title: "String",
        explanation: `Rust 中有两种字符串类型：

1. **&str**：字符串切片，不可变的 UTF-8 序列，通常以字面量形式出现
2. **String**：可增长的、可变的、有所有权的 UTF-8 编码字符串类型

String 实际上是 Vec<u8> 的包装，保证内容是有效的 UTF-8。`,
        code: `fn main() {
    // 创建空 String
    let mut s = String::new();
    
    // 从字符串字面量创建
    let data = "initial contents";
    let s = data.to_string();
    let s = "initial contents".to_string();
    let s = String::from("initial contents");
    
    // 更新 String
    let mut s = String::from("foo");
    s.push_str("bar");
    println!("{}", s);
    
    let mut s = String::from("lo");
    s.push('l'); // 添加单个字符
    println!("{}", s);
    
    // 拼接字符串
    let s1 = String::from("Hello, ");
    let s2 = String::from("world!");
    let s3 = s1 + &s2; // 注意 s1 被移动了
    println!("{}", s3);
    
    // 使用 format! 宏
    let s1 = String::from("tic");
    let s2 = String::from("tac");
    let s3 = String::from("toe");
    let s = format!("{}-{}-{}", s1, s2, s3);
    println!("{}", s);
    
    // 索引字符串（Rust 不允许直接索引）
    let s = String::from("hello");
    // let h = s[0]; // 错误！
    
    // 使用切片
    let hello = "Здравствуйте";
    let s = &hello[0..4]; // 取前 4 个字节
    println!("{}", s);
    
    // 遍历字符
    for c in "नमस्ते".chars() {
        println!("{}", c);
    }
    
    // 遍历字节
    for b in "नमस्ते".bytes() {
        println!("{}", b);
    }
}`,
        output: `foobar
lol
Hello, world!
tic-tac-toe
Зд
न
म
स
्
त
े`,
        tips: [
          "String 是 UTF-8 编码的",
          "不能直接索引字符串，因为 Unicode 字符长度不一",
          "+ 运算符会消耗左边的 String"
        ]
      },
      {
        id: "hashmap",
        title: "HashMap",
        explanation: `HashMap<K, V> 存储键值对，通过键来查找值。它使用哈希函数来确定键值对在内存中的存储位置。

HashMap 不是 Rust 预导入（prelude）的一部分，需要显式引入。`,
        code: `use std::collections::HashMap;

fn main() {
    // 创建空 HashMap
    let mut scores = HashMap::new();
    
    // 插入键值对
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);
    
    // 访问值
    let team_name = String::from("Blue");
    let score = scores.get(&team_name);
    
    match score {
        Some(s) => println!("Blue team score: {}", s),
        None => println!("Team not found"),
    }
    
    // 遍历
    for (key, value) in &scores {
        println!("{}: {}", key, value);
    }
    
    // 从 Vector 创建 HashMap
    let teams = vec![String::from("Blue"), String::from("Yellow")];
    let initial_scores = vec![10, 50];
    
    let scores: HashMap<_, _> = teams.into_iter()
        .zip(initial_scores.into_iter())
        .collect();
    
    // 更新 HashMap
    let mut scores = HashMap::new();
    scores.insert(String::from("Blue"), 10);
    
    // 覆盖旧值
    scores.insert(String::from("Blue"), 25);
    println!("{:?}", scores);
    
    // 只在键不存在时插入
    scores.entry(String::from("Yellow")).or_insert(50);
    scores.entry(String::from("Blue")).or_insert(50); // 不会插入
    
    println!("{:?}", scores);
    
    // 基于旧值更新
    let text = "hello world wonderful world";
    let mut map = HashMap::new();
    
    for word in text.split_whitespace() {
        let count = map.entry(word).or_insert(0);
        *count += 1;
    }
    
    println!("{:?}", map);
}`,
        output: `Blue team score: 10
Blue: 10
Yellow: 50
{"Blue": 25}
{"Yellow": 50, "Blue": 25}
{"wonderful": 1, "world": 2, "hello": 1}`,
        tips: [
          "HashMap 不是有序的",
          "entry API 可以方便地处理键不存在的情况",
          "or_insert 返回可变引用，可以修改值"
        ]
      }
    ]
  },
  {
    id: "functional",
    title: "闭包与迭代器",
    description: "使用闭包与迭代器写出更表达式化的 Rust",
    content: [
      {
        id: "closures",
        title: "闭包：捕获环境的匿名函数",
        explanation: `闭包（closure）可以像函数一样被调用，但它还可以捕获外部变量。

Rust 根据捕获方式与调用方式，把闭包归类为三种 trait：
• Fn：以不可变借用捕获
• FnMut：以可变借用捕获
• FnOnce：获取所有权（只能调用一次）`,
        code: `fn main() {
    let x = 10;
    let add_x = |n: i32| n + x; // 不可变借用捕获 x
    println!("{}", add_x(5));

    let mut count = 0;
    let mut inc = || {
        count += 1; // 可变借用捕获 count
        count
    };
    println!("{}", inc());
    println!("{}", inc());

    let s = String::from("owned");
    let consume = move || {
        // move：把 s 的所有权移动进闭包
        println!("{}", s);
    };
    consume();
}`,
        output: `15
1
2
owned`,
        tips: [
          "闭包参数与返回值通常可以省略类型，让编译器推断",
          "move 闭包常用于线程/异步任务，把所有权交给任务"
        ]
      },
      {
        id: "iterators",
        title: "迭代器基础：iter / iter_mut / into_iter",
        explanation: `迭代器是 Rust 中非常核心的抽象：它用“惰性（lazy）”的方式描述数据处理流程。

常见三种迭代方式：
• iter()：产生 &T
• iter_mut()：产生 &mut T
• into_iter()：产生 T（会移动所有权）`,
        code: `fn main() {
    let v = vec![1, 2, 3];

    // iter：借用
    let sum: i32 = v.iter().sum();
    println!("sum = {}", sum);

    // map + collect：转换并收集
    let doubled: Vec<i32> = v.iter().map(|x| x * 2).collect();
    println!("{:?}", doubled);

    // into_iter：移动所有权
    let owned: Vec<String> = vec!["a", "b"]
        .into_iter()
        .map(|s| s.to_string())
        .collect();
    println!("{:?}", owned);
}`,
        output: `sum = 6
[2, 4, 6]
["a", "b"]`,
        tips: [
          "sum/collect 等方法是“消费型（consuming）适配器”，会把迭代器用完",
          "map/filter 等是“惰性适配器”，只有在被消费时才会执行"
        ],
        warnings: [
          "当你需要保留原集合时，优先使用 iter()/iter_mut()，避免 into_iter() 导致的所有权移动"
        ]
      },
      {
        id: "iterator-result",
        title: "与 Result 搭配：批量解析与错误传播",
        explanation: `迭代器与 Result 的组合非常常见：可以把一批操作的成功/失败整体聚合起来。

一个常用技巧是：collect::<Result<Vec<_>, _>>() 会在遇到第一个 Err 时提前返回。`,
        code: `fn parse_all(input: &[&str]) -> Result<Vec<i32>, std::num::ParseIntError> {
    input
        .iter()
        .map(|s| s.parse::<i32>())
        .collect::<Result<Vec<_>, _>>()
}

fn main() {
    let ok = parse_all(&["1", "2", "3"]).unwrap();
    println!("{:?}", ok);

    let err = parse_all(&["1", "nope", "3"]).err().unwrap();
    println!("{}", err);
}`,
        output: `[1, 2, 3]
invalid digit found in string`,
        tips: [
          "当你想收集所有错误而不是“遇错即停”，可以考虑 Vec<Result<..>> 或自定义错误聚合",
          "掌握 collect 的类型标注能显著提升迭代器代码可读性"
        ]
      }
    ]
  },
  {
    id: "testing",
    title: "测试",
    description: "使用 cargo test 编写可维护的测试体系",
    content: [
      {
        id: "unit-tests",
        title: "单元测试：#[test] 与 assert 系列宏",
        explanation: `Rust 的测试内置在语言与 Cargo 里，最常见的是单元测试：
• 写在同一个 crate 内部
• 放在需要测试的模块附近
• 用 #[cfg(test)] 隔离测试代码`,
        code: `pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn add_works() {
        assert_eq!(add(2, 2), 4);
        assert_ne!(add(2, 2), 5);
    }
}`,
        tips: [
          "运行测试：cargo test",
          "只跑某个测试：cargo test add_works（按名字过滤）"
        ]
      },
      {
        id: "panic-and-result-tests",
        title: "测试错误：should_panic 与 Result 返回",
        explanation: `当你要验证“会 panic 的行为”时，可以使用 #[should_panic]。

从 Rust 1.26 起，测试函数也可以返回 Result：用 ? 传播错误更方便。`,
        code: `pub fn divide(a: i32, b: i32) -> i32 {
    if b == 0 {
        panic!("division by zero");
    }
    a / b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[should_panic(expected = "division by zero")]
    fn divide_panics_on_zero() {
        divide(1, 0);
    }

    #[test]
    fn divide_result_style() -> Result<(), String> {
        if divide(6, 2) != 3 {
            return Err("bad math".into());
        }
        Ok(())
    }
}`,
        tips: [
          "expected 能让 should_panic 更精确（避免误判）",
          "把“错误情况”测试清楚，通常比只测 happy path 更重要"
        ]
      },
      {
        id: "integration-tests",
        title: "集成测试：tests/ 目录",
        explanation: `集成测试通常放在项目根目录的 tests/ 下：

• 每个文件是一个独立测试 crate
• 只能通过 public API 测试你的库

这会自然推动你设计更清晰的 API。`,
        language: "rust",
        code: `// src/lib.rs
pub fn greet(name: &str) -> String {
    format!("Hello, {name}!")
}

// tests/greet.rs
use your_crate_name::greet;

#[test]
fn greet_works() {
    assert_eq!(greet("Rust"), "Hello, Rust!");
}`,
        tips: [
          "二进制 crate（只有 main.rs）想做集成测试时，通常需要抽出 lib.rs 提供可测的逻辑",
          "tests/ 下也可以放公共测试工具模块（如 tests/common/mod.rs）"
        ],
        warnings: [
          "示例里的 your_crate_name 需要替换为你真实的 crate 名称（Cargo.toml 的 package.name）"
        ]
      },
      {
        id: "doc-tests",
        title: "文档测试：让示例代码永远可运行",
        explanation: `Rust 支持 doc tests：你在 /// 文档注释里的代码块会被当作测试编译并运行。

这能保证文档示例不会“过时”。`,
        language: "rust",
        code: `/// 把两个数相加。
///
/// # Examples
/// \`\`\`
/// assert_eq!(your_crate_name::add(1, 2), 3);
/// \`\`\`
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}`,
        tips: [
          "运行文档测试：cargo test --doc",
          "文档示例里可以用 # 隐藏辅助代码，让示例更简洁"
        ],
        warnings: [
          "示例里的 your_crate_name 需要替换为真实 crate 名称（或在 workspace 中用正确路径）"
        ]
      }
    ]
  },
  {
    id: "lifetimes",
    title: "生命周期",
    description: "确保引用有效",
    content: [
      {
        id: "lifetime-concept",
        title: "生命周期概念",
        explanation: `生命周期是 Rust 借用检查器用来确保所有借用都有效的机制。每个引用都有一个生命周期，它指定了引用保持有效的作用域。

大多数时候，生命周期是隐式且可以推断的。只有在引用的生命周期可能以多种方式相关联时，才需要手动标注生命周期。`,
        code: `fn main() {
    let r;
    {
        let x = 5;
        r = &x; // 错误！x 的生命周期不够长
    }
    // println!("r: {}", r); // 编译错误
    
    // 正确的例子
    let x = 5;
    let r = &x;
    println!("r: {}", r);
}

// 生命周期标注
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main2() {
    let string1 = String::from("long string is long");
    {
        let string2 = String::from("xyz");
        let result = longest(string1.as_str(), string2.as_str());
        println!("最长字符串: {}", result);
    }
}

// 结构体中的生命周期
struct ImportantExcerpt<'a> {
    part: &'a str,
}

fn main3() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.')
        .next()
        .expect("找不到句号");
    let i = ImportantExcerpt {
        part: first_sentence,
    };
    println!("摘录: {}", i.part);
}`,
        output: `r: 5
最长字符串: long string is long
摘录: Call me Ishmael`,
        tips: [
          "生命周期标注不会改变引用的实际生命周期",
          "生命周期标注只是描述了多个引用生命周期之间的关系",
          "'static 生命周期表示整个程序运行期间都有效"
        ]
      }
    ]
  },
  {
    id: "concurrency",
    title: "并发编程",
    description: " fearless 并发",
    content: [
      {
        id: "threads",
        title: "线程",
        explanation: `Rust 标准库提供了一种称为 1:1 的线程实现，即一个语言级线程对应一个操作系统线程。Rust 还提供了一些特性来帮助你安全地在多个线程间共享数据。

Rust 的并发模型是 "fearless concurrency"（无畏并发），编译器会在编译时捕获并发错误。`,
        code: `use std::thread;
use std::time::Duration;

fn main() {
    // 创建新线程
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("子线程: 数 {}", i);
            thread::sleep(Duration::from_millis(1));
        }
    });
    
    // 主线程
    for i in 1..5 {
        println!("主线程: 数 {}", i);
        thread::sleep(Duration::from_millis(1));
    }
    
    // 等待子线程完成
    handle.join().unwrap();
    
    // 使用 move 闭包
    let v = vec![1, 2, 3];
    
    let handle = thread::spawn(move || {
        println!("向量: {:?}", v);
    });
    
    handle.join().unwrap();
}`,
        output: `主线程: 数 1
子线程: 数 1
主线程: 数 2
子线程: 数 2
主线程: 数 3
子线程: 数 3
主线程: 数 4
子线程: 数 4
子线程: 数 5
子线程: 数 6
子线程: 数 7
子线程: 数 8
子线程: 数 9
向量: [1, 2, 3]`,
        tips: [
          "spawn 创建新线程",
          "join 等待线程完成",
          "move 闭包转移所有权到线程"
        ]
      },
      {
        id: "channels",
        title: "消息传递",
        explanation: `Rust 使用通道（channel）来实现线程间的消息传递。通道有两个部分：发送者（Sender）和接收者（Receiver）。

mpsc 表示 "multiple producer, single consumer"（多个生产者，单个消费者）。`,
        code: `use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    // 创建通道
    let (tx, rx) = mpsc::channel();
    
    // 在新线程中发送消息
    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
        // println!("val is {}", val); // 错误！val 已被移动
    });
    
    // 在主线程接收消息
    let received = rx.recv().unwrap();
    println!("收到: {}", received);
    
    // 发送多个值
    let (tx, rx) = mpsc::channel();
    
    thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];
        
        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });
    
    for received in rx {
        println!("收到: {}", received);
    }
    
    // 克隆发送者创建多个生产者
    let (tx, rx) = mpsc::channel();
    let tx1 = tx.clone();
    
    thread::spawn(move || {
        tx1.send(String::from("来自线程1")).unwrap();
    });
    
    thread::spawn(move || {
        tx.send(String::from("来自线程2")).unwrap();
    });
    
    for received in rx {
        println!("收到: {}", received);
    }
}`,
        output: `收到: hi
收到: hi
收到: from
收到: the
收到: thread
收到: 来自线程1
收到: 来自线程2`,
        tips: [
          "send 会转移所有权",
          "recv 阻塞等待消息",
          "try_recv 非阻塞接收"
        ]
      },
      {
        id: "shared-state",
        title: "共享状态",
        explanation: `除了消息传递，Rust 还支持共享状态并发。通过互斥器（Mutex）和原子引用计数（Arc）来实现线程安全的共享数据。

Mutex（mutual exclusion）确保任一时刻只有一个线程可以访问数据。Arc（Atomic Reference Counting）允许在多个线程间共享所有权。`,
        code: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    // 创建共享的 Mutex
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    
    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }
    
    for handle in handles {
        handle.join().unwrap();
    }
    
    println!("结果: {}", *counter.lock().unwrap());
    
    // Send 和 Sync trait
    // Send 允许在线程间转移所有权
    // Sync 允许多个线程同时访问引用
    
    // 使用 RwLock（读写锁）
    use std::sync::RwLock;
    
    let data = Arc::new(RwLock::new(5));
    
    // 读锁
    {
        let r = data.read().unwrap();
        println!("读取: {}", *r);
    } // 读锁在这里释放
    
    // 写锁
    {
        let mut w = data.write().unwrap();
        *w += 1;
        println!("写入: {}", *w);
    }
}`,
        output: `结果: 10
读取: 5
写入: 6`,
        tips: [
          "Mutex 提供内部可变性",
          "Arc 是线程安全的 Rc",
          "lock 可能 panic，使用 unwrap 处理"
        ]
      }
    ]
  },
  {
    id: "async",
    title: "异步编程（async/await）",
    description: "理解 Future、await 与常见异步运行时",
    content: [
      {
        id: "future-basics",
        title: "Future 与 async fn（无第三方依赖示例）",
        explanation: `async/await 是 Rust 的“语法糖”：async fn 会返回一个实现了 Future 的值。

Rust 标准库不自带“异步运行时（executor）”，但我们可以用一个极简 block_on 来理解 Future 的工作方式。

注意：下面的 block_on 只能演示“立即完成”的 Future，不适合真实 IO/定时器等需要唤醒（wake）的场景。`,
        code: `use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll, RawWaker, RawWakerVTable, Waker};

fn dummy_waker() -> Waker {
    unsafe fn clone(_: *const ()) -> RawWaker {
        RawWaker::new(std::ptr::null(), &VTABLE)
    }
    unsafe fn wake(_: *const ()) {}
    unsafe fn wake_by_ref(_: *const ()) {}
    unsafe fn drop(_: *const ()) {}

    static VTABLE: RawWakerVTable = RawWakerVTable::new(clone, wake, wake_by_ref, drop);

    unsafe { Waker::from_raw(RawWaker::new(std::ptr::null(), &VTABLE)) }
}

fn block_on<F: Future>(mut fut: F) -> F::Output {
    let waker = dummy_waker();
    let mut cx = Context::from_waker(&waker);
    // SAFETY: 我们不会在移动 fut 之后再使用 Pin 指向它
    let mut fut = unsafe { Pin::new_unchecked(&mut fut) };

    loop {
        match fut.as_mut().poll(&mut cx) {
            Poll::Ready(v) => return v,
            Poll::Pending => {
                // 真正的 executor 会在 wake 后再次 poll
                continue;
            }
        }
    }
}

async fn add_one(x: i32) -> i32 {
    x + 1
}

async fn compute() -> i32 {
    let a = add_one(1).await;
    a + 1
}

fn main() {
    let v = block_on(compute());
    println!("{v}");
}`,
        output: `3`,
        tips: [
          "真正的异步运行时会在 IO 就绪/定时器触发后 wake 任务，然后重新 poll",
          "把 async/await 当成“可暂停的状态机”来理解，会更贴近底层实现"
        ],
        warnings: [
          "不要在真实项目里使用这种 dummy executor；请使用成熟运行时（如 Tokio/async-std）"
        ]
      },
      {
        id: "tokio-intro",
        title: "Tokio 入门（依赖运行时）",
        explanation: `在工程实践中，最常见的是使用 Tokio 作为异步运行时。典型用法是：

1. 在 Cargo.toml 添加依赖 tokio（features 通常需要 macros + rt-multi-thread）
2. 用 #[tokio::main] 启动运行时
3. 使用 async fn 与 .await 编写异步逻辑`,
        code: `// Cargo.toml（示例）:
// tokio = { version = "1", features = ["macros", "rt-multi-thread", "time"] }

use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    println!("start");
    sleep(Duration::from_millis(50)).await;
    println!("done");
}`,
        output: `start
done`,
        tips: [
          "Tokio 生态非常成熟：网络、定时器、任务调度、同步原语都很完善",
          "如果代码块在 Playground 里无法直接运行，需要在 Playground 的依赖面板添加 tokio"
        ]
      },
      {
        id: "async-pitfalls",
        title: "常见坑：阻塞、锁与取消",
        explanation: `异步代码最常见的坑是把“阻塞操作”放进 async 任务里：

• 阻塞 IO/耗时 CPU 会卡住线程，降低吞吐
• 持有 Mutex 锁期间 .await 可能造成死锁/饥饿
• 任务取消是常态：需要保证资源正确释放、避免半完成状态`,
        tips: [
          "耗时 CPU 任务建议放到专用线程池（如 Tokio 的 spawn_blocking）",
          "尽量缩小锁的作用域：先拷贝需要的数据，再 await",
          "为网络/IO 操作设置超时，避免任务永久挂起"
        ],
        warnings: [
          "不要在 async 任务里直接调用 std::thread::sleep（会阻塞线程），应使用运行时的 sleep"
        ]
      }
    ]
  },
  {
    id: "smart-pointers",
    title: "智能指针",
    description: "Box、Rc、RefCell 等",
    content: [
      {
        id: "box",
        title: "Box<T>",
        explanation: `Box<T> 是最简单的智能指针，它允许你在堆上存储数据。Box 是一个指向堆的指针。

使用场景：
• 编译时未知大小的类型，但需要在确切大小的上下文中使用
• 大量数据，希望在确保数据不被复制的情况下转移所有权
• 只关心类型实现了特定 trait 而不关心具体类型`,
        code: `fn main() {
    // 在堆上存储数据
    let b = Box::new(5);
    println!("b = {}", b);
    
    // 递归类型：Cons List
    enum List {
        Cons(i32, Box<List>),
        Nil,
    }
    
    use List::{Cons, Nil};
    
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
    
    // 解引用 Box
    let x = 5;
    let y = Box::new(x);
    
    assert_eq!(5, x);
    assert_eq!(5, *y); // 解引用
    
    // 自定义智能指针
    struct MyBox<T>(T);
    
    impl<T> MyBox<T> {
        fn new(x: T) -> MyBox<T> {
            MyBox(x)
        }
    }
    
    use std::ops::Deref;
    
    impl<T> Deref for MyBox<T> {
        type Target = T;
        
        fn deref(&self) -> &T {
            &self.0
        }
    }
    
    let m = MyBox::new(String::from("Rust"));
    hello(&m); // 自动解引用
}

fn hello(name: &str) {
    println!("Hello, {}!", name);
}`,
        output: `b = 5
Hello, Rust!`,
        tips: [
          "Box 在离开作用域时自动释放堆内存",
          "Deref trait 允许智能指针像引用一样解引用",
          "Drop trait 自定义清理逻辑"
        ]
      },
      {
        id: "rc-refcell",
        title: "Rc<T> 和 RefCell<T>",
        explanation: `Rc<T>（Reference Counting）允许多个所有者共享数据。RefCell<T> 提供运行时借用检查，允许在不可变引用内部修改数据。

**Rc<T>**：
• 用于单线程场景
• 通过 clone 增加引用计数

**RefCell<T>**：
• 运行时借用检查（编译时不检查）
• 违反规则会 panic
• 用于单线程内部可变性`,
        code: `use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    // Rc：共享所有权
    let data = Rc::new(String::from("共享数据"));
    println!("初始引用计数: {}", Rc::strong_count(&data));
    
    {
        let data2 = Rc::clone(&data);
        println!("克隆后引用计数: {}", Rc::strong_count(&data));
        println!("data2: {}", data2);
    }
    
    println!("作用域结束后: {}", Rc::strong_count(&data));
    
    // RefCell：内部可变性
    let cell = RefCell::new(5);
    
    {
        let mut v = cell.borrow_mut();
        *v += 1;
    }
    
    println!("cell: {:?}", cell.borrow());
    
    // Rc<RefCell<T>> 组合
    let shared_vec = Rc::new(RefCell::new(vec![1, 2, 3]));
    
    let shared1 = Rc::clone(&shared_vec);
    let shared2 = Rc::clone(&shared_vec);
    
    shared1.borrow_mut().push(4);
    shared2.borrow_mut().push(5);
    
    println!("最终向量: {:?}", shared_vec.borrow());
    
    // 循环引用问题
    use std::rc::Weak;
    
    struct Node {
        value: i32,
        parent: RefCell<Weak<Node>>,
        children: RefCell<Vec<Rc<Node>>>,
    }
    
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });
    
    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());
    
    let branch = Rc::new(Node {
        value: 5,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });
    
    *leaf.parent.borrow_mut() = Rc::downgrade(&branch);
    
    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade().map(|n| n.value));
}`,
        output: `初始引用计数: 1
克隆后引用计数: 2
data2: 共享数据
作用域结束后: 1
cell: 6
最终向量: [1, 2, 3, 4, 5]
leaf parent = None
leaf parent = Some(5)`,
        tips: [
          "Rc::clone 只增加引用计数，不复制数据",
          "RefCell 运行时检查借用规则",
          "Weak 引用避免循环引用"
        ]
      }
    ]
  },
  {
    id: "macros",
    title: "宏系统",
    description: "声明宏和过程宏",
    content: [
      {
        id: "declarative-macros",
        title: "声明宏",
        explanation: `Rust 提供了强大的宏系统，允许元编程。宏在编译时展开，可以生成代码。

声明宏（Declarative Macros）使用 macro_rules! 定义，基于模式匹配。`,
        code: `// 定义宏
macro_rules! say_hello {
    () => {
        println!("Hello!");
    };
}

macro_rules! create_vec {
    ($($x:expr),*) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}

macro_rules! print_result {
    ($e:expr) => {
        println!("{} = {:?}", stringify!($e), $e);
    };
}

fn main() {
    say_hello!();
    
    let v = create_vec![1, 2, 3];
    println!("{:?}", v);
    
    print_result!(1 + 2);
    print_result!(vec![1, 2, 3]);
    
    // 内置宏
    println!("格式化: {}", format!("{} {}", "Hello", "World"));
    
    let v = vec![1, 2, 3];
    println!("向量: {:?}", v);
    
    // panic! 宏
    // panic!("发生致命错误！");
    
    // assert! 宏
    assert!(true);
    assert_eq!(2 + 2, 4);
    assert_ne!(2 + 2, 5);
    
    // dbg! 宏
    let x = 5;
    dbg!(x);
    
    // todo! 和 unimplemented!
    // todo!("稍后实现");
}`,
        output: `Hello!
[1, 2, 3]
1 + 2 = 3
vec![1, 2, 3] = [1, 2, 3]
格式化: Hello World
向量: [1, 2, 3]
[src/main.rs:45] x = 5`,
        tips: [
          "宏以 ! 结尾",
          "stringify! 将表达式转为字符串",
          "宏在编译时展开"
        ]
      }
    ]
  },
  {
    id: "unsafe",
    title: "不安全 Rust",
    description: "unsafe 关键字和原始指针",
    content: [
      {
        id: "unsafe-rust",
        title: "unsafe 代码",
        explanation: `Rust 的 unsafe 关键字允许你执行以下五种操作：

1. 解引用原始指针
2. 调用 unsafe 函数或方法
3. 访问或修改可变静态变量
4. 实现 unsafe trait
5. 访问 union 的字段

unsafe 不意味着代码一定危险，而是编译器无法保证内存安全，需要程序员自己负责。`,
        code: `fn main() {
    // 原始指针
    let mut num = 5;
    
    let r1 = &num as *const i32;
    let r2 = &mut num as *mut i32;
    
    unsafe {
        println!("r1 is: {}", *r1);
        println!("r2 is: {}", *r2);
    }
    
    // 调用 unsafe 函数
    unsafe fn dangerous() {
        println!("危险操作！");
    }
    
    unsafe {
        dangerous();
    }
    
    // 创建 safe 的抽象
    let mut v = vec![1, 2, 3, 4, 5, 6];
    
    let r = &mut v[..];
    
    let (a, b) = r.split_at_mut(3);
    
    assert_eq!(a, &mut [1, 2, 3]);
    assert_eq!(b, &mut [4, 5, 6]);
    
    // 使用 extern 调用 C 代码
    extern "C" {
        fn abs(input: i32) -> i32;
    }
    
    unsafe {
        println!("C abs(-3) = {}", abs(-3));
    }
    
    // 静态变量
    static HELLO_WORLD: &str = "Hello, world!";
    
    static mut COUNTER: u32 = 0;
    
    fn add_to_count(inc: u32) {
        unsafe {
            COUNTER += inc;
        }
    }
    
    add_to_count(3);
    
    unsafe {
        println!("COUNTER: {}", COUNTER);
    }
    
    // unsafe trait
    unsafe trait Foo {
        // 方法
    }
    
    unsafe impl Foo for i32 {
        // 实现
    }
}

// 使用 unsafe 实现 split_at_mut
use std::slice;

fn split_at_mut(values: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    let len = values.len();
    let ptr = values.as_mut_ptr();
    
    assert!(mid <= len);
    
    unsafe {
        (
            slice::from_raw_parts_mut(ptr, mid),
            slice::from_raw_parts_mut(ptr.add(mid), len - mid),
        )
    }
}`,
        output: `r1 is: 5
r2 is: 5
危险操作！
C abs(-3) = 3
COUNTER: 3`,
        tips: [
          "尽可能将 unsafe 代码封装在 safe 的 API 中",
          "unsafe 块越小越好",
          "使用 unsafe 需要格外小心"
        ],
        warnings: [
          "unsafe 代码需要手动保证内存安全",
          "原始指针可以为 null",
          "数据竞争在 unsafe 中可能发生"
        ]
      }
    ]
  }
];

export const getSectionById = (id: string): TutorialSection | undefined => {
  return rustTutorialData.find(section => section.id === id);
};

export const getContentById = (sectionId: string, contentId: string): TutorialContent | undefined => {
  const section = getSectionById(sectionId);
  return section?.content.find(c => c.id === contentId);
};
