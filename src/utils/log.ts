// TODO 需要被移除
import chalkPipe from "chalk-pipe"

export const logTask = (text: string) => console.log(chalkPipe("magentaBright")(text))

export const logSuccess = (task: string, res: string) => console.log(chalkPipe("greenBright")(res), chalkPipe("cyanBright")(`${task}`))

export const logError = (err: any) => console.log(chalkPipe("bgRedBright")("Error\t"), err)

export const logResults = (results: string | Array<string>) => console.log(
	Array.isArray(results) ? results.join("\n") : results
)