import { runCmd } from "../utils/cmd"
import { logCmdTask, logError } from "../utils/log"
import { detectProj } from "../utils/proj"
import { readConfig } from "../utils/config"
import { go_build } from "./go/build"

type TCmdArray = [string, string[]]

interface IPkgCommand {
    [key: string]: TCmdArray | TCmdArray[]
}

interface ISubCommand {
    [key: string]: IPkgCommand
}

export interface ICmd {
    [key: string]: ISubCommand
}

const BUILD_IN_CMDS: ICmd = {
    nodejs: {
        pnpm: {
            dev: ["pnpm", ["dev"]],
            build: ["pnpm", ["build"]],
            test: ["pnpm", ["test"]],
        },
        npm: {
            dev: ["npm", ["run", "dev"]],
            build: ["npm", ["run", "build"]],
            test: ["npm", ["run", "test"]],
        },
        yarn: {
            dev: ["yarn", ["dev"]],
            build: ["yarn", ["build"]],
            test: ["yarn", ["test"]],
        },
    },
    go: {
        go: {
            dev: ["go", ["run"]],
            build: ["go", ["build"]],
        },
    },
}

// Support custom alias
const cmds = (): ICmd => {
    const cfg = readConfig()
    const { cmds: custom_cmds } = cfg

    if (!custom_cmds) return BUILD_IN_CMDS

    return { ...BUILD_IN_CMDS, ...custom_cmds }
}

interface IRunArgs {
    x?: boolean
    o?: string

    file?: string
}

// 运行统一的命令
export const run = (
    c: string,
    run_args: IRunArgs = { x: false, o: "output", file: "" }
) => {
    // TODO 对发现操作进行适当屏蔽，抽象化解决，支持发现不支持命令
    // TODO 支持用户自定义环境操作
    let projEnv = ""
    let projMgr = ""

    const { project } = readConfig()

    if (!!project && project.auto_detect === false) {
        const { env, manager } = project
        if (!!env && !!manager) {
            projEnv = env
            projMgr = manager
        } else {
            logError(
                `The config option "project.auto_detect" is false, you need to set "project.env" and "project.manager" by yourself!`
            )
            return
        }
    } else {
        const [type, mgr] = detectProj()
        projEnv = type
        projMgr = mgr
    }

    if (!Object.keys(cmds()).includes(projEnv)) {
        logError("No support commands for the current project!")
        return
    }

    const cmdc = cmds()[projEnv]
    if (!Object.keys(cmdc).includes(projMgr)) {
        logError("No support commands for the current project!")
        return
    }

    // TODO 进行边界情况处理，例如跨平台go语言的编译
    if (c === "build") {
        // 构建情况处理
        if (projEnv === "go") {
            go_build(run_args.x, run_args.o)
            return
        }
    }

    const cmd = cmdc[projMgr][c]

    if (Array.isArray(cmd[0])) {
        cmd.forEach((cd) => {
            const [cm, args] = <TCmdArray>cd
            logCmdTask(`${cm} ${args.join(" ")}`)
            runCmd(cm, args)
        })
        return
    }

    const [cm, args] = cmd as TCmdArray

    // TODO 需要有一种通用的方式抽象化参数
    // TODO 支持 dev 命令指定执行文件的情况
    if (c === "dev") {
        if (!!run_args.file) {
            runCmd(cm, [...args, run_args.file])
            return
        }
    }

    logCmdTask(`${cm} ${args.join(" ")}`)
    runCmd(cm, args)
}
