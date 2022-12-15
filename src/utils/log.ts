import chalkPipe from "chalk-pipe"

export const logTask = (text: string) => console.log(chalkPipe("magentaBright")(text))

export const logSuccess = (task: string, res: string) => console.log(chalkPipe("greenBright")(res), chalkPipe("cyanBright")(`${task}`))

export const logError = (msg: string) => console.log(chalkPipe("bgRedBright")("Error:\t"), msg)

export const logResults = (results: string | Array<string>) => console.log(
	Array.isArray(results) ? results.join("\n") : results
)