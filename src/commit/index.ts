// 用户交互询问
import { exec } from "child_process"
import inquirer from "inquirer"
import { stdout } from "process"
import { logTask, logResults, logSuccess, logError } from "../utils/log"

const commitTypes = {
    "✨ feat: New feature": "feat :sparkles: ",
    "🐛 fix: Fix bugs": "fix :bug: ",
    "📝 docs: Update docs": "docs :pencil: ",
    "⚡️ perf: Improve performance": "perf :zap: ",
    "✅ test: Testing codes": "test :white_check_mark: ",
    "🔧 chore: Chore": "chore :wrench: ",
    "♻️ refactor: Refactor": "refactor :recycle: ",
    "⏪ revert: Revert commit": "revert :rewind: ",
    "🔖 release: Release new version": "release :bookmark: ",
    "🚀 deploy: Deploy project": "deploy :rocket: ",
    "👷 ci: CI/CD": "ci :construction_worker: ",
}

// TODO 全新的 commit 工具取代 nbc
export const updateCommit = async () => {
    const { commitType, commitSubject, commitBody, commitBreak, commitIssues } =
        await inquirer.prompt([
            {
                type: "list",
                message: "Type for commit?",
                name: "commitType",
                choices: Object.keys(commitTypes),
            },
            {
                type: "input",
                message: "Subject for commit?",
                name: "commitSubject",
                validate: (input) => {
                    if (!input) {
                        return "Subject can not be empty!"
                    }
                    return true
                },
            },
            {
                type: "input",
                message: "Body for commit?",
                name: "commitBody",
            },
            {
                type: "confirm",
                message: "If BREAKING CHANGES exists?",
                name: "commitBreak",
                default: false,
            },
            {
                type: "input",
                message: "To close issues? (eg. #1 #2)",
                name: "commitIssues",
            },
        ])

    const commit = `${
        commitTypes[commitType]
    }: ${commitSubject}\n\n${commitBody}\n\n${
        !commitBreak ? "" : "BREAKING CHANGES"
    } ${commitIssues}\n`

    logTask("\nCommit message as followed⬇️")
    logResults(commit)

    const { verify } = await inquirer.prompt([
        {
            type: "confirm",
            name: "verify",
            message: "Verify to commit?",
            default: true,
        },
    ])

    if (verify) {
        exec(`git commit -m "${commit}"`, (error, stdout) => {
            if (!error) {
                logError(JSON.stringify(error))
                return
            }

            console.log(stdout)
            logSuccess("Commit", "Now you can run 'git push' to push commits!")
        })
    } else {
        logError("Canceled by user!")
    }
}
