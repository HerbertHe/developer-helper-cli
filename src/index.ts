import { Command } from "commander"
const program = new Command()
import { version, description } from "../package.json"
import { updateCommit } from "./commit"
import { checkLocalEnv } from "./local"
import { createNewProject } from "./create"
import { runStaticServer } from "./serve"
import { generateDocs } from "./docs"
import { run } from "./run"
import { initDHCConfig, showDHCConfig } from "./config"

program.name("dhc").description(description).version(version)

// 本地开发环境检查
program
    .command("local")
    .description("check local developing environment")
    .action(() => {
        checkLocalEnv()
    })

// Commit 规范化工具
program
    .command("commit")
    .description("format commit for git")
    .action(() => {
        updateCommit()
    })

// 新建项目工程
// program
//     .command("create")
//     .description("create new project")
//     .action(() => {
//         createNewProject()
//     })

// program
//     .command("serve [p]")
//     .description("create new static service")
//     .action((p: string) => {
//         runStaticServer(p)
//     })

// program
//     .command("docs")
//     .description("create new docs project powered by vitepress")
//     .action(() => {
//         generateDocs()
//     })

// // 统一开发的 dev 和 build 命令
program
    .command("dev [file]")
    .description("run dev")
    .action((file) => {
        run("dev", {
            file: file,
        })
    })

program
    .command("build")
    .description("run build")
    .option("-x, --cross", "cross platform build")
    .option("-o, --output [output]", "output file name")
    .action((options) => {
        run("build", {
            x: options.cross,
            o: typeof options.output === "boolean" ? "" : options.output,
        })
    })

program
    .command("test")
    .description("run test")
    .action(() => {
        run("test")
    })

program
    .command("config")
    .description("show dhc config")
    .action(() => {
        showDHCConfig()
    })

program
    .command("config init")
    .description("initialize dhc config")
    .action(() => {
        initDHCConfig()
    })

// program.command("add").description("run add").action(() => {
//     run("add")
// })

// program
//     .command("install")
//     .description("run install")
//     .action(() => {
//         run("install")
//     })

program.parse()
