import { SpawnOptionsWithoutStdio, spawn } from "child_process"

export const runCmd = (
    command: string,
    args?: string[],
    options?: SpawnOptionsWithoutStdio
) => {
    const task = spawn(command, args, options)
    task.stdout.pipe(process.stdout)
    task.stderr.pipe(process.stderr)
}
