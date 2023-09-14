import chalkPipe from "chalk-pipe"

export const logCmdTask = (msg: string) =>
    console.log(
        chalkPipe("bgMagentaBright")(" RUN \t"),
        chalkPipe("magentaBright")(msg)
    )

export const logTask = (text: string) =>
    console.log(chalkPipe("magentaBright")(text))

export const logSuccess = (task: string, res: string) =>
    console.log(
        chalkPipe("greenBright")(res),
        chalkPipe("cyanBright")(`${task}`)
    )

export const logError = (err: any) =>
    console.log(
        chalkPipe("bgRedBright")(" Error \t"),
        chalkPipe("redBright")(err)
    )

export const logResults = (results: string | Array<string>) =>
    console.log(Array.isArray(results) ? results.join("\n") : results)
