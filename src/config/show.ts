import fs from "fs"
import path from "path"
import { logError } from "../utils/log"

export const showDHCConfig = () => {
    const dir = fs.readdirSync(path.resolve())

    if (!dir.includes("dhc.config.json")) {
        logError(
            "No `dhc.config.json` file found, maybe you want to run `dhc config init` to initialize for the currenct project first!"
        )
        return
    }

    console.log(
        JSON.parse(
            fs
                .readFileSync(path.join(path.resolve(), "dhc.config.json"))
                .toString()
        )
    )
}
