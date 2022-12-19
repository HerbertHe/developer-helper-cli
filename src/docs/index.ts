import { runCmd } from "../utils/cmd"
import { logError, logSuccess, logTask } from "../utils/log"
import inquirer from "inquirer"
import path from "path"
import fs from "fs"

// TODO 全新的 docs 生成工具取代 nbc
export const generateDocs = async () => {
    const { name } = await inquirer.prompt([
        {
            type: "input",
            message: "Input your docs project name",
            name: "name",
            validate(input: string) {
                if (!input) {
                    return "project name is required!"
                }
                return true
            },
        },
    ])

    const docsPath = path.join(path.resolve(), name)
    if (fs.existsSync(docsPath)) {
        logError(`project is already existed at ${docsPath}!`)
        return
    }

    // TODO 更新微任务
    Promise.resolve(() => {
        logTask("Creating projects...")
        runCmd("mkdir", [name])
    })
        .then(() => {
            logTask("Initializeing projects...")
            runCmd("yarn", ["init", "-y"], {
                cwd: docsPath,
            })
        })
        .then(() => {
            logTask("Add dev dependencies...")
            runCmd("yarn", ["add", "--dev", "vitepress", "vue"], {
                cwd: docsPath,
            })
        })
        .then(() => {
            logTask("Initializeing first document...")
            runCmd("mkdir", ["docs"], {
                cwd: docsPath,
            })
        })
        .then(() => {
            runCmd("echo", ["'# Hello VitePress' > docs/index.md"], {
                cwd: docsPath,
            })
        })
        .then(() => {
            logTask("Updating package.json")
            const pack = JSON.parse(
                fs.readFileSync(path.join(docsPath, "package.json"), "utf-8")
            )
            const scripts = {
                "docs:dev": "vitepress dev docs",
                "docs:build": "vitepress build docs",
                "docs:preview": "vitepress preview docs",
            }

            pack.scripts = { ...pack.scripts, ...scripts }

            fs.writeFileSync(
                path.join(docsPath, "package.json"),
                JSON.stringify(pack),
                "utf-8"
            )
        })
        .then(() => {
            logSuccess(
                "Serve the documentation site in the local server by running `yarn docs:dev`",
                "Success"
            )
        })
}
