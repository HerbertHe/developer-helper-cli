import inquirer from "inquirer"
import { logTask, logResults, logError } from "../utils/log"
import { runCmd } from "../utils/cmd"

const commitTypes = {
    "โจ feat: New feature": "feat :sparkles: ",
    "๐ fix: Fix bugs": "fix :bug: ",
    "๐ docs: Update docs": "docs :pencil: ",
    "โก๏ธ perf: Improve performance": "perf :zap: ",
    "โ test: Testing codes": "test :white_check_mark: ",
    "๐ง chore: Chore": "chore :wrench: ",
    "โป๏ธ refactor: Refactor": "refactor :recycle: ",
    "โช revert: Revert commit": "revert :rewind: ",
    "๐ release: Release new version": "release :bookmark: ",
    "๐ deploy: Deploy project": "deploy :rocket: ",
    "๐ท ci: CI/CD": "ci :construction_worker: ",
}

// TODO ๅจๆฐ็ commit ๅทฅๅทๅไปฃ nbc
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

    logTask("\nCommit message as followedโฌ๏ธ")
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
        runCmd("git", ["commit", "-m", commit])
    } else {
        logError("Canceled by user!")
    }
}
