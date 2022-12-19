import { spawn } from "child_process"

export const runCmd= (command: string, args?: string[] ,options?: any) => {
    const task = spawn(command, args, options)
    task.stdout.pipe(process.stdout)
}