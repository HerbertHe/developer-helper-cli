import { Command } from "commander"
const program = new Command()
import { version, description } from "../package.json"
import { updateCommit } from "./commit"
import { checkLocalEnv } from "./local"
import { runStaticServer } from "./serve"
import { generateDocs } from "./docs"
import { run } from "./run"
import { initDHCConfig, showDHCConfig } from "./config"
import { logError, logResults, logSuccess } from "./utils/log"
import { generateAvailablePort, checkIfPortAvailable } from "./port"

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

program
    .command("serve")
    .option("-p, --port <port>", "set port")
    .option("-d, --dir <dir>", "set dir")
    .description("create new static service")
    .action((option) => {
        runStaticServer(option.port, option.dir)
    })

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
    .option("-i, --init", "initialize dhc config")
    .action((option) => {
        if (option.init) {
            initDHCConfig()
        } else {
            showDHCConfig()
        }
    })

program
    .command("port")
    .option("-c, --check <port>", "check port available")
    .option("-a, --available", "return a available port")
    .action(async (option) => {
        if (option.available === true) {
            const p = await generateAvailablePort()
            logSuccess(p.toString(), "Port")
            return
        }

        if (!!option.check) {
            if (
                /^d+$/.test(option.check) ||
                option.check < 1 ||
                option.check > 65535
            ) {
                logError("Invalid port!")
                return
            } else {
                checkIfPortAvailable(parseInt(option.check))
            }
        }
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
