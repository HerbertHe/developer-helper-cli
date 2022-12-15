import { exec } from "child_process"
import inquirer from "inquirer"
import { logTask } from "../utils/log"

export const createNewProject = async () => {
    const { type } = await inquirer.prompt([
        {
            type: "list",
            message: "Choose the project type",
            name: "type",
            choices: ["web"]
        }
    ])

    switch(type) {
        case "web": {
            inquirer.prompt([
                {
                    type: "list",
                    message: "Choose the framework",
                    name: "framework",
                    choices: ["Vite"]
                },
                {
                    type: "list",
                    message: "Choose the package manager",
                    name: "manager",
                    choices: ["npm", "yarn", "pnpm"]
                }
            ]).then(({ framework, manager }) => {
                switch(framework) {
                    case "Vite": {
                        logTask(`Generating new ${framework} project...`)
                        // TODO 跳转执行命令输出到控制台
                        exec(`${manager} create vite`)
                        break
                    }
                }
            })
            break
        }
    }
}