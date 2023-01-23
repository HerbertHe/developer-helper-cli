import { logResults, logSuccess, logTask } from "../utils/log"
import { exec } from "child_process"

// TODO 使用命令行进行本地环境检查
const Versions = {
	node: [
		["node", "-v"],
		["npm", "-v"],
		["yarn", "-v"],
		["pnpm", "-v"]
	],
	python: [
		["python", "--version"],
		["conda", "-V"]
	],
	go: [
		["go", "version"]
	],
	rust: [
		["rustc", "--version"],
		["cargo", "--version"]
	],
	git: [
		["git", "--version"]
	],
	docker: [
		["docker", "-v"]
	],
	julia: [
		["julia", "-v"]
	]
	// vscode: [
	// 	["code", "-v"]
	// ],
	// java: [
	// 	["java", "-version"],
	// 	["javac", "-version"]
	// ]
	// c: [
	// 	["gcc", "--version"]
	// ]
}

export const checkLocalEnv = async () => {
	logTask("Checking Local Env...")
	for (let item in Versions) {
		await Versions[item].forEach(async (com: Array<string>) => {
			const version = await new Promise<string>(async (resolved) => await exec(com.join(" "), (error, stdout) => {
				if (!!error) return
				resolved(stdout)
			}))

			logSuccess(`\t${item}\t${com[0]} @ ${version.replace(/\n/g, "\t")}`, `Found`)
		});
	}
}