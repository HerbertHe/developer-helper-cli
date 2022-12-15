import { Command } from "commander"
const program = new Command()
import { version, description } from "../package.json"
import { updateCommit } from "./commit"
import { checkLocalEnv } from "./local"
import { createNewProject } from "./create"

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
program
    .command("create")
    .description("create new project")
    .action(() => {
        createNewProject()
    })

// 统一开发的 dev 和 build 命令
program.command("dev").description("run dev")

program.command("build").description("run build")

program.command("add").description("run add")

program.command("install").description("run install")
program.parse()
