import fs from "fs"
import path from "path"
import type { ICmd } from "../run"
import { logError } from "./log"
import { detectProj } from "./proj"

import temp from "./temp.config.json"

interface IDHCProjectConfig {
    env: string
    manager: string
    auto_detect: boolean
}

interface IDHCConfig {
    name?: string
    project?: IDHCProjectConfig
    cmds?: ICmd
}

// const SUPPORTED_DETECT_PROJ = [
//     "nodejs+pnpm",
//     "nodejs+yarn",
//     "nodejs+npm",
//     "go+go",
//     "rust+cargo",
// ]

export const initConfig = () => {
    const dir = fs.readdirSync(path.resolve())

    if (dir.includes("dhc.config.json")) {
        logError("File dhc.config.json is already existed!")
        return
    }

    const dhc_config_path = path.join(path.resolve(), "dhc.config.json")
    const [env, manager] = detectProj()

    if (!env) {
        fs.writeFileSync(dhc_config_path, JSON.stringify(temp))
        return
    }

    // TODO 对于不同的发现语言，读取默认配置同步
    fs.writeFileSync(
        dhc_config_path,
        JSON.stringify({
            ...temp,
            project: {
                ...temp.project,
                env,
                manager,
            },
        })
    )
}

export const readConfig = (): IDHCConfig => {
    const dir = fs.readdirSync(path.resolve())

    if (!dir.includes("dhc.config.json")) {
        return {}
    }

    const cfg = fs
        .readFileSync(path.join(path.resolve(), "dhc.config.json"))
        .toString()

    return JSON.parse(cfg)
}
