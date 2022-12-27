import { runCmd } from "../utils/cmd"
import { logError } from "../utils/log"
import { detectProj } from "../utils/proj"

const cmds = {
    nodejs: {
        pnpm: {
            dev: ["pnpm", ["dev"]],
            build: ["pnpm", ["build"]],
            test: ["pnpm", ["test"]]
        },
        npm: {
            dev: ["npm", ["run", "dev"]],
            build: ["npm", ["run", "build"]],
            test: ["npm", ["run", "test"]]
        },
        yarn: {
            dev: ["yarn", ["dev"]],
            build: ["yarn", ["build"]],
            test: ["yarn", ["test"]]
        }
    },
}

// 运行统一的命令
export const run = (c: string) => {
    const [type, mgr] = detectProj()
    if (!Object.keys(cmds).includes(type)) {
        logError("No preset commands for the current project!")
        return
    }

    const cmdc = cmds[type]
    if (!Object.keys(cmdc).includes(mgr)) {
        logError("No preset commands for the package manager of the current project!")
        return
    }

    const [cmd, args] = cmdc[mgr][c] as [string, string[]]
    runCmd(cmd, args)
}
