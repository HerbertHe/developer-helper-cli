import { spawn } from "child_process"

export const runCmd= (command: string, options?: string[]) => {
    const task = spawn(command, options)
    task.stdout.pipe(process.stdout)
}