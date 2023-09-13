import { execSync } from "child_process"
import { runCmd } from "../../utils/cmd"
import { logCmdTask } from "../../utils/log"

const GoEnvRegExp = /([A-Z0-9\_]+)\=\"([^"]+)\"/gm

interface IGoEnv {
    [key: string]: string
}

const get_go_env = (s: string): IGoEnv => {
    const envs = [...s.matchAll(GoEnvRegExp)]
    if (envs.length === 0) return {}

    let r = {}

    envs.forEach((e) => {
        r[e[1]] = e[2]
    })

    return r
}

const X_RULES = [
    ["darwin", "arm64", ""],
    ["darwin", "amd64", ""],
    ["windows", "amd64", "exe"],
    ["linux", "amd64", ""],
    ["linux", "arm64", ""],
]

export const go_build = (x?: boolean, o: string = "output") => {
    //  TODO 支持指定平台编译
    const task = execSync("go env").toString()
    const { GOARCH, GOOS } = get_go_env(task)

    if (!x) {
        logCmdTask(`go build -o ${o}-${GOOS}-${GOARCH}`)
        runCmd("go", ["build", "-o", `${o}-${GOOS}-${GOARCH}`])
        return
    }

    X_RULES.forEach((r) => {
        logCmdTask(
            `go build -o ${o}-${r[0]}-${r[1]}${!!r[2] ? `.${r[2]}` : ""}`
        )
        runCmd(
            "go",
            ["build", "-o", `${o}-${r[0]}-${r[1]}${!!r[2] ? `.${r[2]}` : ""}`],
            {
                env: {
                    ...process.env,
                    GOOS: r[0],
                    GOARCH: r[1],
                },
            }
        )
    })
}
