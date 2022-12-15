import inquirer from "inquirer"
import { logTask } from "../utils/log"
import { runCmd } from "../utils/cmd"

export const createNewProject = async () => {
    const { type } = await inquirer.prompt([
        {
            type: "list",
            message: "Choose the project type",
            name: "type",
            choices: ["web"],
        },
    ])

    switch (type) {
        case "web": {
            inquirer
                .prompt([
                    {
                        type: "list",
                        message: "Choose the framework",
                        name: "framework",
                        choices: ["Vite"],
                    },
                    {
                        type: "list",
                        message: "Choose the package manager",
                        name: "manager",
                        choices: ["npm", "yarn", "pnpm"],
                    },
                ])
                .then(({ framework, manager }) => {
                    switch (framework) {
                        case "Vite": {
                            logTask(`Generating new ${framework} project...`)
                            runCmd(manager, ["create", framework])
                            break
                        }
                    }
                })
            break
        }
    }
}
